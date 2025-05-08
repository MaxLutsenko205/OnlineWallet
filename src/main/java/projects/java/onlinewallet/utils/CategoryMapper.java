package projects.java.onlinewallet.utils;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import projects.java.onlinewallet.dto.CategoryDTO;
import projects.java.onlinewallet.models.Category;
import projects.java.onlinewallet.models.UserEntity;
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
                .icon(category.getIcon())
                .build();
    }

    public Category dtoToEntity(CategoryDTO dto) {

//        UserEntity user = userRepository.findById(dto.getUserId())
//                .orElseThrow(() -> new EntityNotFoundException(String.format("Пользователь с id: %d не найден", dto.getUserId())));

//        try {
//            user = userRepository.getReferenceById(dto.getUserId());
//        } catch (EntityNotFoundException e){
//            e.getStackTrace();
//        }

        return Category.builder()
                .name(dto.getName())
                .textHex(dto.getTextHex())
                .bgHex(dto.getBgHex())
                .icon(dto.getIcon())
                .build();
    }

    public List<CategoryDTO> entityListToDtoList(List<Category> categoryList) {
        return categoryList.stream().map(this::entityToDto).toList();
    }
}
