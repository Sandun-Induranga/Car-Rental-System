package lk.easy.car_rental.repo;

import lk.easy.car_rental.entity.Car;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * @author : Sandun Induranga
 * @since : 0.1.0
 **/
public interface CarRepo extends JpaRepository<Car, String> {
}
