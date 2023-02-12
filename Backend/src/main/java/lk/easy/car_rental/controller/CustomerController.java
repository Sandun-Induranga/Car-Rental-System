package lk.easy.car_rental.controller;

import lk.easy.car_rental.dto.CustomerDTO;
import lk.easy.car_rental.entity.Customer;
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
    ModelMapper modelMapper;

    @PostMapping
    public void getAll(@ModelAttribute CustomerDTO customerDTO){

        Customer map = modelMapper.map(customerDTO, Customer.class);

        System.out.println(map);

//        try {
//            byte[] nicFileBytes = customerDTO.getNicImage().getBytes();
//            byte[] licenseFileBytes = customerDTO.getLicenseImage().getBytes();
//
//            String serverPath = new File(this.getClass().getProtectionDomain().getCodeSource().getLocation().toURI()).getParentFile().getParentFile().getParentFile().getAbsolutePath();
//            Path nicLocation = Paths.get(serverPath + "/nic_image.jpeg");
//            Path licenseLocation = Paths.get(serverPath + "/license_image.jpeg");
//
//            Files.write(nicLocation, nicFileBytes);
//            Files.write(licenseLocation, licenseFileBytes);
//
//            customerDTO.getNicImage().transferTo(nicLocation);
//            customerDTO.getLicenseImage().transferTo(licenseLocation);
//
//        } catch (IOException e) {
//            throw new RuntimeException(e);
//        } catch (URISyntaxException e) {
//            throw new RuntimeException(e);
//        }
    }

}
