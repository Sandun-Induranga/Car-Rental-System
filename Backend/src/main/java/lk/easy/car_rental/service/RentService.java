package lk.easy.car_rental.service;

import lk.easy.car_rental.dto.CustomerDTO;
import lk.easy.car_rental.dto.RentDTO;

import java.util.List;

/**
 * @author : Sandun Induranga
 * @since : 0.1.0
 **/
public interface RentService {

    public void requestRent(RentDTO rentDTO) throws RuntimeException;

    public String generateNewRentId() throws RuntimeException;

    public CustomerDTO getCustomerByUsername(String username) throws RuntimeException;

    public List<RentDTO> getAllRents() throws RuntimeException;

    public void acceptRentRequest(RentDTO rentDTO) throws RuntimeException;
    public RentDTO getRentByRentId(String rentId) throws RuntimeException;

}
