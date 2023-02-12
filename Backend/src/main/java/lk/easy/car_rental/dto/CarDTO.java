package lk.easy.car_rental.dto;

import java.math.BigDecimal;

/**
 * @author : Sandun Induranga
 * @since : 0.1.0
 **/

public class CarDTO {
    String regNum;
    String type;
    String color;
    String brand;
    String Availability;
    String transmissionType;
    int passengers;
    FreeMileage freeMileage;
    BigDecimal extraKMPrice;
    BigDecimal lostDamageCost;
    String meterValue;
    CarPhoto photos;
}
