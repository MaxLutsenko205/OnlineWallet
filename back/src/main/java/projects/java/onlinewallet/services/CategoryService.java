package projects.java.onlinewallet.services;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import projects.java.onlinewallet.dto.CategoryDTO;
import projects.java.onlinewallet.models.Category;
import projects.java.onlinewallet.models.UserEntity;
import projects.java.onlinewallet.repositories.CategoryRepository;
import projects.java.onlinewallet.repositories.UserRepository;
import projects.java.onlinewallet.utils.CategoryMapper;

@Service
@RequiredArgsConstructor
public class CategoryService {

    private final CategoryRepository categoryRepository;
    private final UserRepository userRepository;
    private final CategoryMapper categoryMapper;

    public Category createCategory(CategoryDTO dto, String email) {
        UserEntity user = getUserByEmail(email);
        Category newCategory = categoryMapper.dtoToEntity(dto);
        newCategory.setUser(user);
        return categoryRepository.save(newCategory);
    }

    public Category getCategoryBuId(Long id, String email) {
        return getCategoryForUser(id, email);
    }

    public Page<Category> getAllCategoriesByUserEmail(String email, int page, int size) {
        UserEntity user = getUserByEmail(email);
        Pageable pageable = PageRequest.of(page, size);
        return categoryRepository.findAllByUser(user, pageable);
    }

    public Category updateCategory(Long id, CategoryDTO dto, String email) {
        Category category = getCategoryForUser(id, email);

        category.setName(dto.getName());
        category.setTextHex(dto.getTextHex());
        category.setBgHex(dto.getBgHex());
        category.setIcon(dto.getIcon());

        return categoryRepository.save(category);
    }

    public void deleteCategory(Long id, String email) {
        Category category = getCategoryForUser(id, email);
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

