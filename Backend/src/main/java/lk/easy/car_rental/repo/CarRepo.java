package lk.easy.car_rental.repo;

import lk.easy.car_rental.dto.CarSpDTO;
import lk.easy.car_rental.entity.Car;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

/**
 * @author : Sandun Induranga
 * @since : 0.1.0
 **/

public interface CarRepo extends JpaRepository<Car, String> {

    Car findCarByRegNum(String regNum) throws RuntimeException;

    @Query(value = "SELECT COUNT(regNum) FROM Car WHERE Availability='YES'", nativeQuery = true)
    Long countAvailableCars() throws RuntimeException;

    @Query(value = "SELECT COUNT(regNum) FROM Car WHERE Availability='NO'", nativeQuery = true)
    Long countReservedCars() throws RuntimeException;

    List<CarSpDTO> findCarsByRegNumLike(String regNum) throws RuntimeException;

}
