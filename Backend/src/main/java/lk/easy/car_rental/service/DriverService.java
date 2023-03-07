package lk.easy.car_rental.service;

import lk.easy.car_rental.dto.DriverDTO;

import java.util.List;

/**
 * @author : Sandun Induranga
 * @since : 0.1.0
 **/

public interface DriverService {

    public void saveDriver(DriverDTO driverDTO) throws RuntimeException;

    public void updateDriver(DriverDTO driverDTO) throws RuntimeException;

    public DriverDTO getDriver() throws RuntimeException;

    public List<DriverDTO> getAllDrivers() throws RuntimeException;

    public void deleteDriver(String nic) throws RuntimeException;

    public Long countAvailableDrivers() throws RuntimeException;

    public Long countReservedDrivers() throws RuntimeException;

}
