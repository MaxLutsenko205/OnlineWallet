package projects.java.onlinewallet.utils;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import projects.java.onlinewallet.dto.TradeDTO;
import projects.java.onlinewallet.models.Category;
import projects.java.onlinewallet.models.Trade;
import projects.java.onlinewallet.repositories.CategoryRepository;
import projects.java.onlinewallet.repositories.UserRepository;

import java.util.List;

@Component
@RequiredArgsConstructor
public class TradeMapper {

    private final UserRepository userRepository;
    private final CategoryRepository categoryRepository;

    public TradeDTO entityToDto(Trade trade) {
        return TradeDTO.builder()
                .sum(trade.getSum())
                .comment(trade.getComment())
                .creationDate(trade.getCreationDate())
                .type(trade.getType())
                .categoryId(trade.getCategory().getId())
                .build();
    }

    public Trade dtoToEntity(TradeDTO dto) {

        Category category = categoryRepository.findById(dto.getCategoryId())
                .orElseThrow(() -> new RuntimeException(String.format("Категория с id: %d не найдена", dto.getCategoryId())));

        return Trade.builder()
                .sum(dto.getSum())
                .comment(dto.getComment())
                .creationDate(dto.getCreationDate())
                .type(dto.getType())
                .category(category)
                .build();
    }

    public List<TradeDTO> entityListToDtoList(List<Trade> tradeList) {
        return tradeList.stream().map(this::entityToDto).toList();
    }
}
