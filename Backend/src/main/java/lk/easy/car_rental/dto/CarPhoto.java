package lk.easy.car_rental.dto;

import org.springframework.web.multipart.MultipartFile;

/**
 * @author : Sandun Induranga
 * @since : 0.1.0
 **/
public class CarPhoto {
    MultipartFile front;
    MultipartFile back;
    MultipartFile side;
    MultipartFile interior;
}
