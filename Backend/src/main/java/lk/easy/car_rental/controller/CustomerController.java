package lk.easy.car_rental.controller;

import lk.easy.car_rental.dto.CustomerDTO;
import lk.easy.car_rental.dto.CustomerImageDTO;
import lk.easy.car_rental.service.CustomerService;
import lk.easy.car_rental.util.ResponseUtil;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

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
    public ResponseUtil saveCustomer(/*@RequestParam String username, @RequestParam String password,*/ @RequestBody CustomerDTO customerDTO) {

//        customerDTO.setUser(new UserDTO(username, password, "Customer"));
        customerService.saveCustomer(customerDTO);
        return new ResponseUtil("OK", "Successfully Saved..!", "");

    }

    @PutMapping
    public ResponseUtil saveImages(@RequestParam String nic, @ModelAttribute CustomerImageDTO imageDTO) {

        customerService.saveImages(nic, imageDTO);
        return new ResponseUtil("OK", "Successfully Saved..!", "");

    }

    @GetMapping
    public ResponseUtil getAll() {

        return new ResponseUtil("OK", "Successfully Saved..!", customerService.getAllCustomer());

    }

}
