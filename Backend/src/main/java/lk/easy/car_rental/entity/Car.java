package lk.easy.car_rental.entity;

import lk.easy.car_rental.dto.CarPhoto;
import lk.easy.car_rental.dto.FreeMileage;
import lk.easy.car_rental.dto.Price;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.math.BigDecimal;

/**
 * @author : Sandun Induranga
 * @since : 0.1.0
 **/

@AllArgsConstructor
@NoArgsConstructor
@Data
@ToString
public class Car {
    private String regNum;
    private String type;
    private String color;
    private String brand;
    private String Availability;
    private String transmissionType;
    private String fuelType;
    private int passengers;
    private Price price;
    private FreeMileage freeMileage;
    private BigDecimal extraKMPrice;
    private BigDecimal lostDamageCost;
    private String meterValue;
    private CarPhoto photos;
}
