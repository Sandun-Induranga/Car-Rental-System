package lk.easy.car_rental.repo;

import lk.easy.car_rental.entity.Payment;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * @author : Sandun Induranga
 * @since : 0.1.0
 **/

public interface PaymentRepo extends JpaRepository<Payment, Integer> {

    Payment findAllByRentId_Nic(String nic) throws RuntimeException;

}
