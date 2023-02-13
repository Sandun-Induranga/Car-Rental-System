package lk.easy.car_rental.controller;

import lk.easy.car_rental.dto.CustomerDTO;
import lk.easy.car_rental.dto.UserDTO;
import lk.easy.car_rental.entity.User;
import lk.easy.car_rental.service.CustomerService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.File;
import java.io.IOException;
import java.net.URISyntaxException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

/**
 * @author : Sandun Induranga
 * @since : 0.1.0
 **/

@RestController
@RequestMapping("/customer")
@CrossOrigin
public class CustomerController {

    @Autowired
    CustomerService customerService;

    @Autowired
    ModelMapper modelMapper;

    @PostMapping
    public void saveCustomer(@RequestParam String username, @RequestParam String password, @ModelAttribute CustomerDTO customerDTO) {

        customerDTO.setUser(new UserDTO(username, password,"Customer"));
        customerService.saveCustomer(customerDTO);

    }

}
