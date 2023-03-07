package lk.easy.car_rental.repo;

import lk.easy.car_rental.entity.Rent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

/**
 * @author : Sandun Induranga
 * @since : 0.1.0
 **/

public interface RentRepo extends JpaRepository<Rent, String> {

    @Query(value = "SELECT rentId FROM Rent ORDER BY rentId  DESC LIMIT 1", nativeQuery = true)
    String getLastRentId();

    List<Rent> getRentsByNic_Nic(String nic) throws RuntimeException;

    @Query(value = "SELECT COUNT(rentId) FROM Rent WHERE status!='Closed'", nativeQuery = true)
    Long countBookings() throws RuntimeException;

}
