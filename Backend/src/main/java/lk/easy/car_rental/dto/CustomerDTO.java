package lk.easy.car_rental.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

/**
 * @author : Sandun Induranga
 * @since : 0.1.0
 **/

@AllArgsConstructor
@NoArgsConstructor
@Data
@ToString
public class CustomerDTO {
    private String nic;
    private String name;
    private String license;
    private String address;
    private String contact;
    private String email;
    private UserDTO user;
    private String nicImage;
    private String licenseImage;
}
