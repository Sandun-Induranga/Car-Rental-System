package lk.easy.car_rental.service;

import lk.easy.car_rental.dto.DriverDTO;

/**
 * @author : Sandun Induranga
 * @since : 0.1.0
 **/

public interface DriverService {

    public void saveDriver(DriverDTO driverDTO) throws RuntimeException;

}
