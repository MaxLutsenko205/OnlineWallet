package projects.java.onlinewallet.services;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import projects.java.onlinewallet.dto.CategoryDTO;
import projects.java.onlinewallet.models.Category;
import projects.java.onlinewallet.models.Trade;
import projects.java.onlinewallet.models.TradeType;
import projects.java.onlinewallet.models.UserEntity;
import projects.java.onlinewallet.repositories.CategoryRepository;
import projects.java.onlinewallet.repositories.TradeRepository;
import projects.java.onlinewallet.repositories.UserRepository;
import projects.java.onlinewallet.utils.CategoryMapper;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CategoryService {

    private final CategoryRepository categoryRepository;
    private final UserRepository userRepository;
    private final CategoryMapper categoryMapper;
    private final ImageService imageService;
    private final TradeRepository tradeRepository;

    public Category createCategory(CategoryDTO dto, String email) {
        UserEntity user = getUserByEmail(email);
        Category newCategory = categoryMapper.dtoToEntity(dto);
        newCategory.setUser(user);
        // newCategory.setIcon(imageService.upload(image));
        return categoryRepository.save(newCategory);
    }

    public Category getCategoryById(Long id, String email) {
        return getCategoryForUser(id, email);
    }

   public List<Category> getAllCategoriesByUserEmail(String email) {
        UserEntity user = getUserByEmail(email); 
        return categoryRepository.findAllByUser(user);  
    }

    public Category updateCategory(Long id, CategoryDTO dto, String email) {
        Category category = getCategoryForUser(id, email);

        category.setName(dto.getName());
        category.setTextHex(dto.getTextHex());
        category.setBgHex(dto.getBgHex());
        // удаление старой картинки и загрузка новой
        // imageService.delete(category.getIcon());
        // category.setIcon(imageService.upload(image));

        return categoryRepository.save(category);
    }

    @Transactional
    public void deleteCategory(Long id, String email) {
        UserEntity user = getUserByEmail(email);
        Integer budget = user.getBudget();
        Category category = getCategoryForUser(id, email);
        List<Trade> trades = category.getTrades();

        // удаление транзакций категории с обновлением бюджета пользователя
        for(Trade trade:trades){
            Integer sum = trade.getSum();
            switch (trade.getType()){
                case TradeType.INCOME -> {
                    budget-=sum;
                }
                case TradeType.EXPENSE -> {
                    budget+=sum;
                }
                default -> {
                    throw new IllegalArgumentException("Неверный тип транзакции: " + trade.getType());
                }
            }
            tradeRepository.delete(trade);
        }
        user.setBudget(budget);
        userRepository.save(user);

        // удаление картинки соответствующей категории
        // imageService.delete(category.getIcon());
        // удаление категории
        categoryRepository.delete(category);
    }

    // --- Helpers ---

    private Category getCategoryForUser(Long id, String email) {
        UserEntity user = getUserByEmail(email);
        return categoryRepository.findByIdAndUser(id, user)
                .orElseThrow(() -> new RuntimeException(String.format("Категория id: %d не найдена для пользователя с email: %s", id, email)));
    }

    private UserEntity getUserByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException(String.format("Пользователь с email: \"%s\" не найден", email)));
    }
}

