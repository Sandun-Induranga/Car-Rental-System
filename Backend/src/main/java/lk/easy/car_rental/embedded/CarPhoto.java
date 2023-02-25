package lk.easy.car_rental.embedded;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.Embeddable;

/**
 * @author : Sandun Induranga
 * @since : 0.1.0
 **/

@Embeddable
@AllArgsConstructor
@NoArgsConstructor
@Data
@ToString
public class CarPhoto {
    private String front;
    private String back;
    private String side;
    private String interior;
}
