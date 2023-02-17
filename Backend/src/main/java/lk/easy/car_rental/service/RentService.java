package lk.easy.car_rental.service;

import lk.easy.car_rental.dto.RentDTO;

/**
 * @author : Sandun Induranga
 * @since : 0.1.0
 **/
public interface RentService {

    public void requestRent(RentDTO rentDTO) throws RuntimeException;

    public String generateNewRentId() throws RuntimeException;

}
