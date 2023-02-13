package lk.easy.car_rental.repo;

import lk.easy.car_rental.entity.Driver;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * @author : Sandun Induranga
 * @since : 0.1.0
 **/
public interface DriverRepo extends JpaRepository<Driver, String> {
}
