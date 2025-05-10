package projects.java.onlinewallet.utils;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import projects.java.onlinewallet.dto.CategoryDTO;
import projects.java.onlinewallet.models.Category;
import projects.java.onlinewallet.repositories.UserRepository;

import java.util.List;

@Component
@RequiredArgsConstructor
public class CategoryMapper {

    private final UserRepository userRepository;

    public CategoryDTO entityToDto(Category category) {
        return CategoryDTO.builder()
                .name(category.getName())
                .textHex(category.getTextHex())
                .bgHex(category.getBgHex())
                .build();
    }

    public Category dtoToEntity(CategoryDTO dto) {

        return Category.builder()
                .name(dto.getName())
                .textHex(dto.getTextHex())
                .bgHex(dto.getBgHex())
                .build();
    }

    public List<CategoryDTO> entityListToDtoList(List<Category> categoryList) {
        return categoryList.stream().map(this::entityToDto).toList();
    }
}
