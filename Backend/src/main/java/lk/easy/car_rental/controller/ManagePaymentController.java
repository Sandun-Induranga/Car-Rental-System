package lk.easy.car_rental.controller;

import lk.easy.car_rental.dto.PaymentDTO;
import lk.easy.car_rental.service.PaymentService;
import lk.easy.car_rental.util.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
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

    @Autowired
    PaymentService paymentService;

    @PostMapping
    public ResponseUtil savePayment(PaymentDTO paymentDTO) {

        paymentService.savePayment(paymentDTO);
        return new ResponseUtil("OK", "Successfully Saved..!", "");

    }

}
