package lk.easy.car_rental.repo;

import lk.easy.car_rental.entity.Driver;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

/**
 * @author : Sandun Induranga
 * @since : 0.1.0
 **/
public interface DriverRepo extends JpaRepository<Driver, String> {

    @Query(value = "SELECT * FROM Driver WHERE available", nativeQuery = true)
    List<Driver> getAvailableDrivers() throws RuntimeException;

}
