package lk.easy.car_rental.service.impl;

import lk.easy.car_rental.dto.CarSpDTO;
import lk.easy.car_rental.dto.CustomerDTO;
import lk.easy.car_rental.dto.CustomerImageDTO;
import lk.easy.car_rental.dto.UserDTO;
import lk.easy.car_rental.entity.Customer;
import lk.easy.car_rental.entity.User;
import lk.easy.car_rental.repo.CustomerRepo;
import lk.easy.car_rental.service.CustomerService;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.File;
import java.io.IOException;
import java.net.URISyntaxException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

/**
 * @author : Sandun Induranga
 * @since : 0.1.0
 **/

@Service
@Transactional
public class CustomerServiceImpl implements CustomerService {

    @Autowired
    CustomerRepo customerRepo;

    @Autowired
    ModelMapper mapper;

    @Override
    public void saveCustomer(CustomerDTO customerDTO) throws RuntimeException {

        if (customerRepo.existsById(customerDTO.getNic())) throw new RuntimeException("Customer Already Exits..!");

        customerRepo.save(mapper.map(customerDTO, Customer.class));
    }

    @Override
    public List<CustomerDTO> getAllCustomer() throws RuntimeException {

        return mapper.map(customerRepo.findAll(), new TypeToken<ArrayList<CustomerDTO>>() {
        }.getType());

    }

    @Override
    public void saveImages(String nic, CustomerImageDTO imageDTO) throws RuntimeException {
        try {
            byte[] nicFileBytes = imageDTO.getNicImage().getBytes();
            byte[] licenseFileBytes = imageDTO.getLicenseImage().getBytes();

            String projectPath = "/media/sandu/0559F5C021740317/GDSE/Project_Zone/IdeaProjects/Car_Rental_System/Frontend/assets";
            Path nicLocation = Paths.get(projectPath + "/image/bucket/customer/nic/nic_" + nic + ".jpeg");
            Path licenseLocation = Paths.get(projectPath + "/image/bucket/customer/license/license_" + nic + ".jpeg");

            Files.write(nicLocation, nicFileBytes);
            Files.write(licenseLocation, licenseFileBytes);

            imageDTO.getNicImage().transferTo(nicLocation);
            imageDTO.getLicenseImage().transferTo(licenseLocation);

            Customer customer = customerRepo.findById(nic).get();

            customer.setNicImage("/assets/image/bucket/customer/nic/nic_" + nic + ".jpeg");
            customer.setLicenseImage("/assets/image/bucket/customer/license/license_" + nic + ".jpeg");

            customerRepo.save(customer);

        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public void updateCustomer(CustomerDTO customerDTO) throws RuntimeException {

        if (!customerRepo.existsById(customerDTO.getNic())) throw new RuntimeException("Invalid Customer..!");

        customerRepo.save(mapper.map(customerDTO, Customer.class));

    }

}
