package projects.java.onlinewallet.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import projects.java.onlinewallet.models.Trade;
import projects.java.onlinewallet.models.UserEntity;

import java.util.Optional;
import java.util.List;

public interface TradeRepository extends JpaRepository<Trade, Long> {
    List<Trade> findAllByUser(UserEntity user);
    Optional<Trade> findByIdAndUser(Long id, UserEntity user);
}
