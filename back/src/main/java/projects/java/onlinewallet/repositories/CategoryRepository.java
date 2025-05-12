package projects.java.onlinewallet.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import projects.java.onlinewallet.models.Category;
import projects.java.onlinewallet.models.UserEntity;

import java.util.List;
import java.util.Optional;
public interface CategoryRepository extends JpaRepository<Category, Long> {
    Optional<Category> findByIdAndUser(Long id, UserEntity user);
    List<Category> findAllByUser(UserEntity user);  
}
