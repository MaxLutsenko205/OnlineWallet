package projects.java.onlinewallet.services;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import projects.java.onlinewallet.dto.TradeDTO;
import projects.java.onlinewallet.models.Category;
import projects.java.onlinewallet.models.Trade;
import projects.java.onlinewallet.models.TradeType;
import projects.java.onlinewallet.models.UserEntity;
import projects.java.onlinewallet.repositories.CategoryRepository;
import projects.java.onlinewallet.repositories.TradeRepository;
import projects.java.onlinewallet.repositories.UserRepository;
import projects.java.onlinewallet.utils.TradeMapper;


@Service
@RequiredArgsConstructor
public class TradeService {

    private final TradeRepository tradeRepository;
    private final UserRepository userRepository;
    private final CategoryRepository categoryRepository;
    private final TradeMapper tradeMapper;

    @Transactional
    public Trade createTrade(TradeDTO dto, String email) {
        // получение пользователя
        UserEntity user = getUserByEmail(email);

        // обновление бюджета
        Integer sum = dto.getSum();
        switch (dto.getType()){
            case TradeType.INCOME -> {
                user.setBudget(user.getBudget()+sum);
            }
            case TradeType.EXPENSE -> {
                user.setBudget(user.getBudget()-sum);
            }
            default -> {
                throw new IllegalArgumentException("Неверный тип транзакции: " + dto.getType());
            }
        }

        // сохранение транзакции и обновление пользователя
        Trade newTrade = tradeMapper.dtoToEntity(dto);
        newTrade.setUser(user);
        Trade savedTrade = tradeRepository.save(newTrade);

        userRepository.save(user);

        return savedTrade;
    }

    public Page<Trade> getAllTradesByUser(String email, int page, int size) {
        UserEntity user = getUserByEmail(email);
        Pageable pageable = PageRequest.of(page, size);
        return tradeRepository.findAllByUser(user, pageable);
    }

    public Trade getTradeById(Long id, String email) {
        return getTradeForUser(id, email);
    }


    public Trade updateTrade(Long id, TradeDTO dto, String email) {
        Trade trade = getTradeForUser(id, email);
        Category category = getCategoryById(dto.getCategoryId());

        // обновляется только комментарий и категория транзакции
//        trade.setSum(dto.getSum());
        trade.setComment(dto.getComment());
//        trade.setType(dto.getType());
        trade.setCategory(category);

        return tradeRepository.save(trade);
    }

    @Transactional
    public void deleteTrade(Long id, String email) {
        // получение транзакции с бд
        Trade trade = getTradeForUser(id, email);

        // получение пользователя
        UserEntity user = getUserByEmail(email);

        // обновление бюджета пользователя
        Integer sum = trade.getSum();
        switch (trade.getType()){
            case TradeType.INCOME -> {
                user.setBudget(user.getBudget()-sum);
            }
            case TradeType.EXPENSE -> {
                user.setBudget(user.getBudget()+sum);
            }
            default -> {
                throw new IllegalArgumentException("Неверный тип транзакции: " + trade.getType());
            }
        }

        // удаление транзакции
        tradeRepository.delete(trade);
    }

    // --- Helpers ---

    private Trade getTradeForUser(Long id, String email) {
        UserEntity user = getUserByEmail(email);
        return tradeRepository.findByIdAndUser(id, user)
                .orElseThrow(() -> new RuntimeException(String.format("Транзакция id: %d не найдена для пользователя с email: %s", id, email)));
    }

    private UserEntity getUserByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException(String.format("Пользователь с email: \"%s\" не найден", email)));
    }

    private Category getCategoryById(Long id) {
        return categoryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException(String.format("Категория с id: %d не найдена", id)));
    }
}


