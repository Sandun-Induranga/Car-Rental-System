package lk.easy.car_rental.service.impl;

import lk.easy.car_rental.dto.CarDTO;
import lk.easy.car_rental.service.CarService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * @author : Sandun Induranga
 * @since : 0.1.0
 **/

@Service
@Transactional
public class CarServiceImpl implements CarService {

    @Override
    public void saveCar(CarDTO carDTO) throws RuntimeException {
        System.out.println(carDTO);
    }

}
