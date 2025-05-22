package projects.java.onlinewallet.controllers;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.swagger.v3.core.util.Json;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import projects.java.onlinewallet.dto.CategoryDTO;
import projects.java.onlinewallet.models.Category;
import projects.java.onlinewallet.services.CategoryService;
import java.util.List;

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
    @PostMapping()
    public ResponseEntity<Category> createCategory(@Parameter(
                                                           required = true,
                                                           schema = @Schema(implementation = CategoryDTO.class)
                                                   )
                                                   @RequestPart("category") @Valid String dtoString,
                                                   @AuthenticationPrincipal UserDetails userDetails) throws JsonProcessingException {
        String email = userDetails.getUsername();
        log.info("Создание категории пользователем: {}", email);

        // преобразование строки в объект класса dto
        ObjectMapper mapper = new ObjectMapper();
        CategoryDTO dto = mapper.readValue(dtoString, CategoryDTO.class);

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
        Category category = categoryService.getCategoryById(id, email);
        return ResponseEntity.ok(category);
    }

   @Operation(summary = "Получить все категории текущего пользователя")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Категории получены")
    })
    @GetMapping
    public ResponseEntity<List<Category>> getAllCategories(@AuthenticationPrincipal UserDetails userDetails) {
        String email = userDetails.getUsername();
        log.info("Получение всех категорий пользователя {}", email);
        List<Category> categories = categoryService.getAllCategoriesByUserEmail(email);
        return ResponseEntity.ok(categories);
    }

    @Operation(summary = "Обновить категорию по ID")
@ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Категория обновлена"),
        @ApiResponse(responseCode = "404", description = "Категория не найдена")
})
@PutMapping(value = "/{id}")
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

