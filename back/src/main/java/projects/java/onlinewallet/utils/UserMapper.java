package projects.java.onlinewallet.utils;

import org.springframework.stereotype.Component;
import projects.java.onlinewallet.dto.UserDTO;
import projects.java.onlinewallet.models.UserEntity;

import java.util.List;

@Component
public class UserMapper {

    public UserDTO entityToDto(UserEntity user) {
        return UserDTO.builder()
                .id(user.getId())
                .email(user.getEmail())
                .password(user.getPassword())
                .budget(user.getBudget())
                .build();
    }

    public UserEntity dtoToEntity(UserDTO dto) {
        return UserEntity.builder()
                .id(dto.getId())
                .email(dto.getEmail())
                .password(dto.getPassword())
                .budget(dto.getBudget())
                .build();
    }

    public List<UserDTO> entityListToDtoList(List<UserEntity> userList) {
        return userList.stream().map(this::entityToDto).toList();
    }
}
