package lk.easy.car_rental.dto;

import lk.easy.car_rental.embed.CarPhoto;
import lk.easy.car_rental.embed.FreeMileage;
import lk.easy.car_rental.embed.Price;
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
public class CarSpDTO {
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
