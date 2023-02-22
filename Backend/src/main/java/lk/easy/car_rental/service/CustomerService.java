package lk.easy.car_rental.service;

import lk.easy.car_rental.dto.CustomerDTO;

import java.util.List;

/**
 * @author : Sandun Induranga
 * @since : 0.1.0
 **/
public interface CustomerService {

    public void saveCustomer(CustomerDTO customerDTO) throws RuntimeException;

    public List<CustomerDTO> getAllCustomer() throws RuntimeException;
    public List<CustomerDTO> saveImages() throws RuntimeException;

}
