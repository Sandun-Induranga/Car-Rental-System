package lk.easy.car_rental.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

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
public class RentDetail {

    @Id
    private String rentId;
    @Id
    private String regNum;
    private String nic;
    private BigDecimal driverCost;
    private BigDecimal carCost;

}
