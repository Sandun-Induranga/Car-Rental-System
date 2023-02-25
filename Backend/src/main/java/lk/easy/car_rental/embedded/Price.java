package lk.easy.car_rental.embedded;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.Embeddable;
import java.math.BigDecimal;

/**
 * @author : Sandun Induranga
 * @since : 0.1.0
 **/

@Embeddable
@AllArgsConstructor
@NoArgsConstructor
@Data
@ToString
public class Price {
    private BigDecimal dailyPriceRate;
    private BigDecimal monthlyPriceRate;
}
