package projects.java.onlinewallet.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import projects.java.onlinewallet.models.Trade;
import projects.java.onlinewallet.models.UserEntity;

import java.util.Optional;

public interface TradeRepository extends JpaRepository<Trade, Long> {
    Page<Trade> findAllByUser(UserEntity user, Pageable pageable);
    Optional<Trade> findByIdAndUser(Long id, UserEntity user);
}
