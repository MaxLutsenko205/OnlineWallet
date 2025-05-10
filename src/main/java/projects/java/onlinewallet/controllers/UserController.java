package projects.java.onlinewallet.controllers;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import projects.java.onlinewallet.dto.UserDTO;
import projects.java.onlinewallet.models.UserEntity;
import projects.java.onlinewallet.services.UserService;

@Slf4j
@RestController
@RequestMapping("api/v1/users")
@RequiredArgsConstructor
@Tag(name = "Пользователи", description = "Операции с текущим пользователями")
public class UserController {

    private final UserService userService;

    @Operation(summary = "Получить текущего пользователя")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Пользователь найден"),
            @ApiResponse(responseCode = "404", description = "Пользователь не найден")
    })
    @GetMapping("/my")
    public ResponseEntity<UserEntity> getCurrentUser(@AuthenticationPrincipal UserDetails userDetails) {
        String email = userDetails.getUsername();
        log.info("Получение текущего пользователя (запрос от {})", email);
        return ResponseEntity.ok(userService.getUserByEmail(email));
    }

    @Operation(summary = "Обновить текущего пользователя")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Пользователь обновлён"),
            @ApiResponse(responseCode = "404", description = "Пользователь не найден")
    })
    @PutMapping("/my")
    public ResponseEntity<UserEntity> updateUser(@RequestBody @Valid UserDTO dto,
                                                 @AuthenticationPrincipal UserDetails userDetails) {
        String email = userDetails.getUsername();
        log.info("Обновление пользователя email={}", email);
        return ResponseEntity.ok(userService.updateUserByEmail(email, dto));
    }

    @Operation(summary = "Удалить текущего пользователя")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "204", description = "Пользователь удалён"),
            @ApiResponse(responseCode = "404", description = "Пользователь не найден")
    })
    @DeleteMapping("/my")
    public ResponseEntity<Void> deleteUser(@AuthenticationPrincipal UserDetails userDetails) {
        String email = userDetails.getUsername();
        log.info("Удаление пользователя email={}", email);
        userService.deleteUser(email);
        return ResponseEntity.noContent().build();
    }
}
