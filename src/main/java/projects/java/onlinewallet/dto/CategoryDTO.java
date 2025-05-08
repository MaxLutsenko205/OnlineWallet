package projects.java.onlinewallet.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CategoryDTO {

//    private Long id;

    @NotBlank(message = "Имя категории - обязательное поле")
    private String name;

    private String textHex;

    private String bgHex;

    private String icon;

//    private Long userId;
}
