package lk.easy.car_rental.repo;

import lk.easy.car_rental.entity.RentDetail;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * @author : Sandun Induranga
 * @since : 0.1.0
 **/

public interface RentDetailRepo extends JpaRepository<RentDetail, String> {
}
