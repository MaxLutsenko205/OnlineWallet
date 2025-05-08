package projects.java.onlinewallet.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Category {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Имя категории - обязательное поле")
    private String name;

    private String textHex;

    private String bgHex;

    private String icon;

    @JsonIgnore
    @OneToMany(mappedBy = "category", cascade = CascadeType.REMOVE, orphanRemoval = true)
    private List<Trade> trades;

    @JsonIgnore
    @ManyToOne()
    @JoinColumn(name = "user_id")
    @NotNull(message = "Пользователь - обязательное поле")
    private UserEntity user;
}

