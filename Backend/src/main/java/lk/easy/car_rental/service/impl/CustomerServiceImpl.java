package lk.easy.car_rental.service.impl;

import lk.easy.car_rental.dto.CustomerDTO;
import lk.easy.car_rental.dto.CustomerImageDTO;
import lk.easy.car_rental.entity.Customer;
import lk.easy.car_rental.repo.CustomerRepo;
import lk.easy.car_rental.repo.UserRepo;
import lk.easy.car_rental.service.CustomerService;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
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
        customerDTO.getUser().setRole("Customer");
        customerRepo.save(mapper.map(customerDTO, Customer.class));

    }

    @Override
    public List<CustomerDTO> getAllCustomer() throws RuntimeException {

        return mapper.map(customerRepo.findAll(), new TypeToken<ArrayList<CustomerDTO>>() {
        }.getType());

    }

    @Override
    public void saveImages(String nic, CustomerImageDTO imageDTO) throws RuntimeException {

        Customer customer = customerRepo.findById(nic).get();

        try {
            if (imageDTO.getLicenseImage() != null && imageDTO.getNicImage() != null) {

                byte[] nicFileBytes = imageDTO.getNicImage().getBytes();
                byte[] licenseFileBytes = imageDTO.getLicenseImage().getBytes();

                String projectPath = "/media/sandu/0559F5C021740317/GDSE/Project_Zone/IdeaProjects/Car_Rental_System/Frontend/assets";
                Path nicLocation = Paths.get(projectPath + "/image/bucket/customer/nic/nic_" + nic + ".jpeg");
                Path licenseLocation = Paths.get(projectPath + "/image/bucket/customer/license/license_" + nic + ".jpeg");

                Files.write(nicLocation, nicFileBytes);
                Files.write(licenseLocation, licenseFileBytes);

                imageDTO.getNicImage().transferTo(nicLocation);
                imageDTO.getLicenseImage().transferTo(licenseLocation);
            }

        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        customer.setNicImage("/assets/image/bucket/customer/nic/nic_" + nic + ".jpeg");
        customer.setLicenseImage("/assets/image/bucket/customer/license/license_" + nic + ".jpeg");

        customer.getUser().setRole("Customer");
        customerRepo.save(customer);

    }

    @Override
    public void updateCustomer(CustomerDTO customerDTO) throws RuntimeException {

        if (!customerRepo.existsById(customerDTO.getNic())) throw new RuntimeException("Invalid Customer..!");
        Customer customer = mapper.map(customerDTO, Customer.class);
        Customer customer1 = customerRepo.findById(customerDTO.getNic()).get();
        customer.setLicenseImage(customer1.getLicenseImage());
        customer.setNicImage(customer1.getNicImage());
        customer.getUser().setRole("Customer");
        customerRepo.save(customer);

    }

    @Override
    public void deleteCustomer(String nic) throws RuntimeException {

        if (!customerRepo.existsById(nic)) throw new RuntimeException("Invalid Customer..!");
        customerRepo.deleteById(nic);

    }

    @Override
    public Long countCustomers() throws RuntimeException {

        return customerRepo.countCustomerByNic();

    }

}
