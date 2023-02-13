package lk.easy.car_rental.entity;

import lk.easy.car_rental.embed.CarPhoto;
import lk.easy.car_rental.embed.FreeMileage;
import lk.easy.car_rental.embed.Price;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.Embedded;
import javax.persistence.Entity;
import javax.persistence.Id;
import java.math.BigDecimal;

/**
 * @author : Sandun Induranga
 * @since : 0.1.0
 **/

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@ToString
public class Car {
    @Id
    private String regNum;
    private String type;
    private String color;
    private String brand;
    private String Availability;
    private String transmissionType;
    private String fuelType;
    private int passengers;
    @Embedded
    private Price price;
    @Embedded
    private FreeMileage freeMileage;
    private BigDecimal extraKMPrice;
    private BigDecimal lostDamageCost;
    private String meterValue;
    @Embedded
    private CarPhoto photos;
}
