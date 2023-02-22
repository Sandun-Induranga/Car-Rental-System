package lk.easy.car_rental.controller;

import lk.easy.car_rental.dto.CustomerDTO;
import lk.easy.car_rental.dto.CustomerImageDTO;
import lk.easy.car_rental.service.CustomerService;
import lk.easy.car_rental.util.ResponseUtil;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

/**
 * @author : Sandun Induranga
 * @since : 0.1.0
 **/

@RestController
@RequestMapping("/customer")
@CrossOrigin
@Transactional
public class CustomerController {

    @Autowired
    CustomerService customerService;

    @PostMapping
    public ResponseUtil saveCustomer(@RequestBody CustomerDTO customerDTO) {

        customerService.saveCustomer(customerDTO);
        return new ResponseUtil("OK", "Successfully Saved..!", "");

    }

    @GetMapping
    public ResponseUtil getAll() {

        return new ResponseUtil("OK", "Successfully Saved..!", customerService.getAllCustomer());

    }

    @PostMapping(params = {"image"})
    public ResponseUtil saveImages(@ModelAttribute CustomerImageDTO customerImageDTO) {

        customerService.saveImages(customerImageDTO.getNic(), customerImageDTO);
        return new ResponseUtil("OK", "Successfully Saved..!", "");

    }

    @PutMapping
    public ResponseUtil updateCustomer(@RequestBody CustomerDTO customerDTO) {

        customerService.updateCustomer(customerDTO);
        return new ResponseUtil("OK", "Successfully Updated..!", "");

    }

    @DeleteMapping
    public ResponseUtil deleteCustomer(@RequestParam String nic) {

        customerService.deleteCustomer(nic);
        return new ResponseUtil("OK", "Successfully Deleted..!", "");

    }


}
