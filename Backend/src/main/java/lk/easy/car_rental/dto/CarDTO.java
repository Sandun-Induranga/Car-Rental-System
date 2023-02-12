package lk.easy.car_rental.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.springframework.web.multipart.MultipartFile;

import java.math.BigDecimal;

/**
 * @author : Sandun Induranga
 * @since : 0.1.0
 **/

@AllArgsConstructor
@NoArgsConstructor
@Data
@ToString
public class CarDTO {
    private String regNum;
    private String type;
    private String color;
    private String brand;
    private String Availability;
    private String transmissionType;
    private String fuelType;
    private int passengers;
    private Price price;
//    private BigDecimal dailyPriceRate;
//    private BigDecimal monthlyPriceRate;
    private FreeMileage freeMileage;
//    private BigDecimal dailyRate;
//    private BigDecimal monthlyRate;
    private BigDecimal extraKMPrice;
    private BigDecimal lostDamageCost;
    private String meterValue;
    private CarPhoto photos;
//    private MultipartFile front;
//    private MultipartFile back;
//    private MultipartFile side;
//    private MultipartFile interior;
}
