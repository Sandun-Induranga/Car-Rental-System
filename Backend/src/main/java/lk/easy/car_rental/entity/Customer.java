package lk.easy.car_rental.entity;

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
public class Customer {
    String nic;
    String name;
    String license;
    String address;
    String contact;
    String email;
    String username;
    String password;
    String nicImage;
    String licenseImage;
}