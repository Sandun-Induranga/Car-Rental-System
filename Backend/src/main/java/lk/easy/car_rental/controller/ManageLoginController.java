package lk.easy.car_rental.controller;

import lk.easy.car_rental.service.UserService;
import lk.easy.car_rental.util.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

/**
 * @author : Sandun Induranga
 * @since : 0.1.0
 **/


@RestController
@RequestMapping("login")
@CrossOrigin
public class ManageLoginController {

    @Autowired
    UserService userService;

    @PostMapping
    public ResponseUtil getUser(@RequestParam String username) {

        userService.getUser(username);
        return new ResponseUtil("OK", "Successfully Loaded..!", "");
    }

}
