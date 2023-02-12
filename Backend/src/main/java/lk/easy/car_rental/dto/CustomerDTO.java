package lk.easy.car_rental.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.springframework.web.multipart.MultipartFile;

/**
 * @author : Sandun Induranga
 * @since : 0.1.0
 **/

@AllArgsConstructor
@NoArgsConstructor
@Data
@ToString
public class CustomerDTO {
    String nic;
    String name;
    String license;
    String address;
    String contact;
    String email;
    String username;
    String password;
    MultipartFile nicImage;
    MultipartFile licenseImage;
}