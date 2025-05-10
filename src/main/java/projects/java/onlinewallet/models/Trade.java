package projects.java.onlinewallet.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Trade {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull(message = "Сумма - обязательное поле")
    @Min(value = 0, message = "Сумма не может быть отрицательной")
    private Integer sum;

    @Size(max = 255, message = "Комментарий не должен превышать 255 символов")
    private String comment;

    @Column(updatable = false)
    private LocalDateTime creationDate;

    @Enumerated(value = EnumType.STRING)
    @NotNull(message = "Тип - обязательное поле")
    private TradeType type;

    @JsonIgnore
    @JoinColumn(name = "category_id")
    @ManyToOne()
    @NotNull(message = "Категория - обязательное поле")
    private Category category;

    @ManyToOne()
    @JoinColumn(name = "user_id")
    @NotNull(message = "Пользователь - обязательное поле")
    private UserEntity user;

    @PrePersist
    protected void onCreate(){
        creationDate = LocalDateTime.now();
    }
}

