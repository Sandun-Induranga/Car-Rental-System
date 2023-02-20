package lk.easy.car_rental.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalTime;

/**
 * @author : Sandun Induranga
 * @since : 0.1.0
 **/

@AllArgsConstructor
@NoArgsConstructor
@Data
@ToString
public class PaymentDTO {

    Integer paymentId;
    RentDTO rentId;
    String type;
    String description;
    LocalDate date;
    LocalTime time;
    BigDecimal total;
    BigDecimal cash;
    BigDecimal balance;

}
