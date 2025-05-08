package projects.java.onlinewallet.controllers;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import projects.java.onlinewallet.dto.CategoryDTO;
import projects.java.onlinewallet.models.Category;
import projects.java.onlinewallet.services.CategoryService;

@Slf4j
@RestController
@RequestMapping("/api/v1/categories")
@RequiredArgsConstructor
@Tag(name = "Категории", description = "Операции с категориями пользователя")
public class CategoryController {

    private final CategoryService categoryService;

    @Operation(summary = "Создать пользовательскую категорию")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Категория создана"),
            @ApiResponse(responseCode = "400", description = "Некорректный запрос")
    })
    @PostMapping
    public ResponseEntity<Category> createCategory(@RequestBody @Valid CategoryDTO dto,
                                                   @AuthenticationPrincipal UserDetails userDetails) {
        String email = userDetails.getUsername();
        log.info("Создание категории пользователем: {}", email);
        Category created = categoryService.createCategory(dto, email);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @Operation(summary = "Получить пользовательскую категорию по ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Категория найдена"),
            @ApiResponse(responseCode = "404", description = "Категория не найдена")
    })
    @GetMapping("/{id}")
    public ResponseEntity<Category> getCategory(@PathVariable Long id,
                                                   @AuthenticationPrincipal UserDetails userDetails) {
        String email = userDetails.getUsername();
        log.info("Получение категории id={} для пользователя {}", id, email);
        Category category = categoryService.getCategoryBuId(id, email);
        return ResponseEntity.ok(category);
    }

    @Operation(summary = "Получить все категории текущего пользователя (с пагинацией)")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Категории получены")
    })
    @GetMapping
    public ResponseEntity<Page<Category>> getAllCategories(@RequestParam(defaultValue = "0") int page,
                                                              @RequestParam(defaultValue = "10") int size,
                                                              @AuthenticationPrincipal UserDetails userDetails) {
        String email = userDetails.getUsername();
        log.info("Получение всех категорий пользователя {} (page={}, size={})", email, page, size);
        Page<Category> categories = categoryService.getAllCategoriesByUserEmail(email, page, size);
        return ResponseEntity.ok(categories);
    }

    @Operation(summary = "Обновить категорию по ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Категория обновлена"),
            @ApiResponse(responseCode = "404", description = "Категория не найдена")
    })
    @PutMapping("/{id}")
    public ResponseEntity<Category> updateCategory(@PathVariable Long id,
                                                      @RequestBody @Valid CategoryDTO dto,
                                                      @AuthenticationPrincipal UserDetails userDetails) {
        String email = userDetails.getUsername();
        log.info("Обновление категории id={} пользователем {}", id, email);
        Category updated = categoryService.updateCategory(id, dto, email);
        return ResponseEntity.ok(updated);
    }

    @Operation(summary = "Удалить пользовательскую категорию по ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "204", description = "Категория удалена"),
            @ApiResponse(responseCode = "404", description = "Категория не найдена")
    })
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCategory(@PathVariable Long id,
                                               @AuthenticationPrincipal UserDetails userDetails) {
        String email = userDetails.getUsername();
        log.info("Удаление категории id={} пользователем {}", id, email);
        categoryService.deleteCategory(id, email);
        return ResponseEntity.noContent().build();
    }
}

