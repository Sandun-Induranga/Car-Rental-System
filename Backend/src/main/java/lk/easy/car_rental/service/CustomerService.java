package lk.easy.car_rental.service;

import lk.easy.car_rental.dto.CustomerDTO;
import lk.easy.car_rental.dto.CustomerImageDTO;

import java.util.List;

/**
 * @author : Sandun Induranga
 * @since : 0.1.0
 **/
public interface CustomerService {

    public void saveCustomer(CustomerDTO customerDTO) throws RuntimeException;

    public List<CustomerDTO> getAllCustomer() throws RuntimeException;

    public void saveImages(String nic, CustomerImageDTO imageDTO) throws RuntimeException;

    public void updateCustomer(CustomerDTO customerDTO) throws RuntimeException;

    public void deleteCustomer(String nic) throws RuntimeException;

    public Long countCustomers() throws RuntimeException;

}
