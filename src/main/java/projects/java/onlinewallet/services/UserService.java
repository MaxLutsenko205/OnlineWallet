package projects.java.onlinewallet.services;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import projects.java.onlinewallet.dto.AuthRequest;
import projects.java.onlinewallet.dto.AuthResponse;
import projects.java.onlinewallet.dto.UserDTO;
import projects.java.onlinewallet.models.UserEntity;
import projects.java.onlinewallet.repositories.UserRepository;
import projects.java.onlinewallet.security.JwtService;
import projects.java.onlinewallet.utils.UserMapper;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final UserMapper userMapper;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public UserDTO createUser(UserDTO userDTO) {

        // хэширование пароля
        userDTO.setPassword(passwordEncoder.encode(userDTO.getPassword()));

        UserEntity user = userMapper.dtoToEntity(userDTO);
        user = userRepository.save(user);
        return userMapper.entityToDto(user);
    }

    public Page<UserDTO> getAllUsers(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return userRepository.findAll(pageable).map(userMapper::entityToDto);
    }

    public UserDTO getUserById(Long id) {
        return userMapper.entityToDto(userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException(String.format("Пользователь с ID: %d не найден в базе", id))));
    }

    public UserDTO updateUser(Long id, UserDTO userDTO) {
        UserEntity user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException(String.format("Пользователь с ID: %d не найден в базе", id)));

        user.setEmail(userDTO.getEmail());
        user.setPassword(passwordEncoder.encode(userDTO.getPassword()));
        user.setBudget(userDTO.getBudget());

        return userMapper.entityToDto(userRepository.save(user));
    }

    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }

    public AuthResponse loginUser(AuthRequest request){
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
        );

        var user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException(String.format("Пользователь с email: %s не найден", request.getEmail())));
        String jwt = jwtService.generateToken(user);
        return new AuthResponse(jwt);
    }

    public AuthResponse registerUser(AuthRequest request){
        UserDTO dto = UserDTO.builder()
                .email(request.getEmail())
                .password(request.getPassword())
                .build();
        UserEntity createdUser = userMapper.dtoToEntity(createUser(dto));
        String jwt = jwtService.generateToken(createdUser);
        return new AuthResponse(jwt);
    }
}

