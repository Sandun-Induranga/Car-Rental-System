package lk.easy.car_rental.controller;

import lk.easy.car_rental.util.ResponseUtil;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author : Sandun Induranga
 * @since : 0.1.0
 **/

@RestController
@RequestMapping("/payment")
@CrossOrigin
public class ManagePaymentController {

    @PostMapping
    public ResponseUtil savePayment() {
        System.out.println("Invoked");
        return null;
    }

}
