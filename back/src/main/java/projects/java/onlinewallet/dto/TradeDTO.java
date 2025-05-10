package projects.java.onlinewallet.dto;

import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import projects.java.onlinewallet.models.TradeType;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TradeDTO {

    @NotNull(message = "Сумма - обязательное поле")
    @Min(value = 0, message = "Сумма не может быть отрицательной")
    private Integer sum;

    @Size(max = 255, message = "Комментарий не должен превышать 255 символов")
    private String comment;

    private LocalDateTime creationDate;

    @Enumerated(value = EnumType.STRING)
    @NotNull(message = "Тип - обязательное поле")
    private TradeType type;

    @NotNull(message = "Категория - обязательное поле")
    private Long categoryId;
}
