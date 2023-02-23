package lk.easy.car_rental.service;

import lk.easy.car_rental.dto.CarDTO;
import lk.easy.car_rental.dto.CarPhotoDTO;
import lk.easy.car_rental.dto.CarSpDTO;

import java.util.List;

/**
 * @author : Sandun Induranga
 * @since : 0.1.0
 **/
public interface CarService {

    public void saveCar(CarDTO carDTO) throws RuntimeException;

    public List<CarDTO> getAllCars() throws RuntimeException;

    public void saveCarImages(CarPhotoDTO carPhotoDTO) throws RuntimeException;

    public void addToMaintains(String regNum) throws RuntimeException;

    public CarSpDTO getCar(String regNum) throws RuntimeException;

    public Long countAvailableCars() throws RuntimeException;

}
