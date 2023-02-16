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
@RequestMapping("login")
@CrossOrigin
public class ManageLoginController {

    @PostMapping
    public ResponseUtil getUser() {
        return new ResponseUtil("OK", "Successfully Loaded..!", "");
    }

}
