package lk.easy.car_rental.service.impl;

import lk.easy.car_rental.dto.DriverDTO;
import lk.easy.car_rental.service.DriverService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * @author : Sandun Induranga
 * @since : 0.1.0
 **/

@Service
@Transactional
public class DriverServiceImpl implements DriverService {
    @Override
    public void saveDriver(DriverDTO driverDTO) throws RuntimeException {



    }
}
