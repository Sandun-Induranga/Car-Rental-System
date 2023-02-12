package lk.easy.car_rental.controller;

import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

/**
 * @author : Sandun Induranga
 * @since : 0.1.0
 **/

@RestController
@RequestMapping("/car")
@CrossOrigin
public class CarController {

    @GetMapping
    public void getAll() {

    }

}
