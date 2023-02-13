package lk.easy.car_rental.service.impl;

import lk.easy.car_rental.dto.CustomerDTO;
import lk.easy.car_rental.entity.Customer;
import lk.easy.car_rental.repo.CustomerRepo;
import lk.easy.car_rental.service.CustomerService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
        if (customerRepo.existsById(customerDTO.getNic())){
            throw new RuntimeException("Customer Already Exits..!");
        }
        customerRepo.save(mapper.map(customerDTO, Customer.class));
    }
}
