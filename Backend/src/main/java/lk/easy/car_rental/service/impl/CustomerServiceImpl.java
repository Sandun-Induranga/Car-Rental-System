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

    ModelMapper mapper;

    @Override
    public void saveCustomer(CustomerDTO customerDTO) throws RuntimeException {

        Customer customer = new Customer(customerDTO.getNic(), customerDTO.getName(), customerDTO.getLicense(), customerDTO.getAddress(), customerDTO.getContact(), customerDTO.getEmail(), new User(customerDTO.getUser().getUsername(), customerDTO.getUser().getPassword(), customerDTO.getUser().getRole()), "", "");

        if (customerRepo.existsById(customerDTO.getNic())) throw new RuntimeException("Customer Already Exits..!");

        System.out.println(customerDTO);

        customerRepo.save(customer);
    }

    @Override
    public List<CustomerDTO> getAllCustomer() throws RuntimeException {

        return mapper.map(customerRepo.findAll(), new TypeToken<ArrayList<CustomerDTO>>() {
        }.getType());

    }

    @Override
    public List<CustomerDTO> saveImages(String nic, CustomerImageDTO imageDTO) throws RuntimeException {
        try {
            byte[] nicFileBytes = imageDTO.getNicImage().getBytes();
            byte[] licenseFileBytes = imageDTO.getLicenseImage().getBytes();

            String serverPath = new File(this.getClass().getProtectionDomain().getCodeSource().getLocation().toURI()).getParentFile().getParentFile().getParentFile().getParentFile().getAbsolutePath();
            Path nicLocation = Paths.get(serverPath + "/bucket/customer/nic/nic_" + nic + ".jpeg");
            Path licenseLocation = Paths.get(serverPath + "/bucket/customer/license/license_" + nic + ".jpeg");

            Files.write(nicLocation, nicFileBytes);
            Files.write(licenseLocation, licenseFileBytes);

            imageDTO.getNicImage().transferTo(nicLocation);
            imageDTO.getLicenseImage().transferTo(licenseLocation);

            Customer customer = customerRepo.getCustomerByNic(nic);

            customer.setNicImage(nicLocation.toString());
            customer.setLicenseImage(licenseLocation.toString());

            customerRepo.save(customer);

        } catch (IOException e) {
            throw new RuntimeException(e);
        } catch (URISyntaxException e) {
            throw new RuntimeException(e);
        }
    }

}
