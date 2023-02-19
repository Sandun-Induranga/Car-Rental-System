package lk.easy.car_rental.controller;

import lk.easy.car_rental.dto.PaymentDTO;
import lk.easy.car_rental.service.PaymentService;
import lk.easy.car_rental.util.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

/**
 * @author : Sandun Induranga
 * @since : 0.1.0
 **/

@RestController
@RequestMapping("/payment")
@CrossOrigin
public class ManagePaymentController {

    @Autowired
    PaymentService paymentService;

    @PostMapping
    public ResponseUtil savePayment(@ModelAttribute PaymentDTO paymentDTO) {

//        paymentService.savePayment(paymentDTO);
        System.out.println(paymentDTO);
        System.out.println("Invoked");
        return new ResponseUtil("OK", "Successfully Saved..!", "");

    }

}
