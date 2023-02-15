package lk.easy.car_rental.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

/**
 * @author : Sandun Induranga
 * @since : 0.1.0
 **/

@AllArgsConstructor
@NoArgsConstructor
@Data
@ToString
public class RentDTO {

    String rentId;
    LocalDate pickUpDate;
    LocalTime pickupTime;
    LocalDate returnDate;
    LocalTime returnTime;
    String driverRequest;
    String status;
    BigDecimal cost;
    String description;
    List<RentDetailDTO> rentDetails;

}
