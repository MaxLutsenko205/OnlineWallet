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
import projects.java.onlinewallet.dto.TradeDTO;
import projects.java.onlinewallet.models.Trade;
import projects.java.onlinewallet.services.TradeService;
import java.util.List;

@Slf4j
@RestController
@RequestMapping("api/v1/trades")
@RequiredArgsConstructor
@Tag(name = "Транзакции", description = "Операции с транзакциями пользователя")
public class TradeController {

    private final TradeService tradeService;

    @Operation(summary = "Создать пользовательскую транзакции")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Транзакция создана"),
            @ApiResponse(responseCode = "400", description = "Некорректный запрос")
    })
    @PostMapping
    public ResponseEntity<Trade> createTrade(@RequestBody @Valid TradeDTO dto,
                                             @AuthenticationPrincipal UserDetails userDetails){
        String email = userDetails.getUsername();
        log.info("Создание транзакции пользователем: {}", email);
        Trade trade = tradeService.createTrade(dto, email);
        return ResponseEntity.status(HttpStatus.CREATED).body(trade);
    }

    @Operation(summary = "Получить пользовательскую транзакцию по ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Транзакция найдена"),
            @ApiResponse(responseCode = "404", description = "Транзакция не найдена")
    })
    @GetMapping("/{id}")
    public ResponseEntity<Trade> getTrade(@PathVariable Long id,
                                          @AuthenticationPrincipal UserDetails userDetails) {
        String email = userDetails.getUsername();
        log.info("Получение категории id={} для пользователя {}", id, email);
        Trade trade = tradeService.getTradeById(id, email);
        return ResponseEntity.ok(trade);
    }

@Operation(summary = "Получить все транзакции текущего пользователя")
@ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Транзакции получены")
})
@GetMapping
public ResponseEntity<List<Trade>> getAllTrades(@AuthenticationPrincipal UserDetails userDetails) {
    String email = userDetails.getUsername();
    log.info("Получение всех транзакций пользователя {}", email);
    List<Trade> trades = tradeService.getAllTradesByUser(email);
    return ResponseEntity.ok(trades);
}

    @Operation(summary = "Обновить транзакцию по ID (обновляются только комментарий и категория)")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Транзакция обновлена"),
            @ApiResponse(responseCode = "404", description = "Транзакция не найдена")
    })
    @PutMapping("/{id}")
    public ResponseEntity<Trade> updateTrade(@PathVariable Long id,
                                             @RequestBody @Valid TradeDTO dto,
                                             @AuthenticationPrincipal UserDetails userDetails) {
        String email = userDetails.getUsername();
        log.info("Обновление транзакции id={} пользователем {}", id, email);
        Trade trade = tradeService.updateTrade(id, dto, email);
        return ResponseEntity.ok(trade);
    }

    @Operation(summary = "Удалить пользовательскую транзакцию по ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "204", description = "Транзакция удалена"),
            @ApiResponse(responseCode = "404", description = "Транзакция не найдена")
    })
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTrade(@PathVariable Long id,
                                            @AuthenticationPrincipal UserDetails userDetails) {
        String email = userDetails.getUsername();
        log.info("Удаление транзакции id={} пользователем {}", id, email);
        tradeService.deleteTrade(id, email);
        return ResponseEntity.noContent().build();
    }


}
