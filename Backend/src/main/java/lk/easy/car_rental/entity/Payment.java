package lk.easy.car_rental.entity;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalTime;

/**
 * @author : Sandun Induranga
 * @since : 0.1.0
 **/

public class Payment {

    String paymentId;
    Rent rentId;
    String type;
    String description;
    LocalDate date;
    LocalTime time;
    BigDecimal total;
    BigDecimal cash;
    BigDecimal balance;

}
