package lk.easy.car_rental.service;

import lk.easy.car_rental.dto.CustomerDTO;

/**
 * @author : Sandun Induranga
 * @since : 0.1.0
 **/
public interface CustomerService {

    public void saveCustomer(CustomerDTO customerDTO) throws RuntimeException;

}