package projects.java.onlinewallet.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import projects.java.onlinewallet.models.Category;
import projects.java.onlinewallet.models.UserEntity;

import java.util.Optional;

public interface CategoryRepository extends JpaRepository<Category, Long> {
    Optional<Category> findByIdAndUser(Long id, UserEntity user);
    Page<Category> findAllByUser(UserEntity user, Pageable pageable);
}
