package lk.easy.car_rental.service;

import lk.easy.car_rental.dto.CarDTO;

/**
 * @author : Sandun Induranga
 * @since : 0.1.0
 **/
public interface CarService {

    public void saveCar(CarDTO carDTO) throws RuntimeException;

}
