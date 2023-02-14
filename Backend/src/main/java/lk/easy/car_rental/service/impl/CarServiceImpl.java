package lk.easy.car_rental.service.impl;

import lk.easy.car_rental.dto.CarDTO;
import lk.easy.car_rental.entity.Car;
import lk.easy.car_rental.repo.CarRepo;
import lk.easy.car_rental.service.CarService;
import lk.easy.car_rental.util.ResponseUtil;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.File;
import java.io.IOException;
import java.net.URISyntaxException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

/**
 * @author : Sandun Induranga
 * @since : 0.1.0
 **/

@Service
@Transactional
public class CarServiceImpl implements CarService {

    @Autowired
    ModelMapper mapper;

    @Autowired
    CarRepo carRepo;

    @Override
    public void saveCar(CarDTO carDTO) throws RuntimeException {

        if (carRepo.existsById(carDTO.getRegNum())) throw new  RuntimeException("Car Already Exist..!");

        Car car = mapper.map(carDTO, Car.class);
        try {
            byte[] front = carDTO.getPhotos().getFront().getBytes();
            byte[] back = car.getPhotos().getBack().getBytes();
            byte[] side = car.getPhotos().getSide().getBytes();
            byte[] interior = car.getPhotos().getInterior().getBytes();

            String serverPath = new File(this.getClass().getProtectionDomain().getCodeSource().getLocation().toURI()).getParentFile().getParentFile().getParentFile().getParentFile().getAbsolutePath();
            Path frontLocation = Paths.get(serverPath + "/bucket/car/front_"+carDTO.getRegNum()+".jpeg");
            Path backLocation = Paths.get(serverPath + "/bucket/car/back_"+carDTO.getRegNum()+".jpeg");
            Path sideLocation = Paths.get(serverPath + "/bucket/car/side_"+carDTO.getRegNum()+".jpeg");
            Path interiorLocation = Paths.get(serverPath + "/bucket/car/interior_"+carDTO.getRegNum()+".jpeg");

            Files.write(frontLocation, front);
            Files.write(backLocation, back);
            Files.write(sideLocation, side);
            Files.write(interiorLocation, interior);

            carDTO.getPhotos().getFront().transferTo(frontLocation);
            carDTO.getPhotos().getBack().transferTo(backLocation);
            carDTO.getPhotos().getSide().transferTo(sideLocation);
            carDTO.getPhotos().getInterior().transferTo(interiorLocation);

            car.getPhotos().setFront(frontLocation.toString());
            car.getPhotos().setBack(backLocation.toString());
            car.getPhotos().setSide(sideLocation.toString());
            car.getPhotos().setInterior(interiorLocation.toString());

            carRepo.save(car);

        } catch (IOException e) {
            throw new RuntimeException(e);
        } catch (URISyntaxException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public List<CarDTO> getAllCars() throws RuntimeException {



    }

}
