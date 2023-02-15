package lk.easy.car_rental.dto;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

/**
 * @author : Sandun Induranga
 * @since : 0.1.0
 **/
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
