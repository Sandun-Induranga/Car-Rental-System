package lk.easy.car_rental.repo;

import lk.easy.car_rental.entity.Payment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.math.BigDecimal;
import java.util.List;

/**
 * @author : Sandun Induranga
 * @since : 0.1.0
 **/

public interface PaymentRepo extends JpaRepository<Payment, Integer> {

    List<Payment> findAllByRentId_Nic_Nic(String nic) throws RuntimeException;


    @Query(value = "SELECT `date`, SUM(total) FROM Payment GROUP BY `date`",nativeQuery = true)
    List getDailyIncome() throws RuntimeException;

    @Query(value = "SELECT MONTH(`date`), SUM(total) FROM Payment GROUP BY MONTH(`date`)", nativeQuery = true)
    List getMonthlyIncome() throws RuntimeException;

    @Query(value = "SELECT SUM(total) FROM Payment WHERE MONTH(`date`)=MONTH(DATE(now()))", nativeQuery = true)
    BigDecimal getCurrentMonthlyIncome() throws RuntimeException;

    @Query(value = "SELECT SUM(total) FROM Payment WHERE MONTH(`date`)= DATE(now()) ", nativeQuery = true)
    BigDecimal getCurrentDayIncome() throws RuntimeException;

}
