package lk.easy.car_rental.service.impl;

import lk.easy.car_rental.dto.CarDTO;
import lk.easy.car_rental.dto.CarSpDTO;
import lk.easy.car_rental.entity.Car;
import lk.easy.car_rental.repo.CarRepo;
import lk.easy.car_rental.service.CarService;
import lk.easy.car_rental.util.WriteImageUtil;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.File;
import java.io.IOException;
import java.net.URISyntaxException;
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

        if (carRepo.existsById(carDTO.getRegNum())) throw new RuntimeException("Car Already Exist..!");

        Car car = mapper.map(carDTO, Car.class);
        try {

            String serverPath = new File(this.getClass().getProtectionDomain().getCodeSource().getLocation().toURI()).getParentFile().getParentFile().getParentFile().getParentFile().getAbsolutePath();

            car.getPhotos().setFront(new WriteImageUtil().writeImage(carDTO.getPhotos().getFront(), Paths.get(serverPath + "/bucket/car/front_" + carDTO.getRegNum() + ".jpeg")));
            car.getPhotos().setBack(new WriteImageUtil().writeImage(carDTO.getPhotos().getBack(), Paths.get(serverPath + "/bucket/car/back_" + carDTO.getRegNum() + ".jpeg")));
            car.getPhotos().setSide(new WriteImageUtil().writeImage(carDTO.getPhotos().getSide(), Paths.get(serverPath + "/bucket/car/side_" + carDTO.getRegNum() + ".jpeg")));
            car.getPhotos().setInterior(new WriteImageUtil().writeImage(carDTO.getPhotos().getInterior(), Paths.get(serverPath + "/bucket/car/interior_" + carDTO.getRegNum() + ".jpeg")));

            carRepo.save(car);

        } catch (IOException e) {
            throw new RuntimeException(e);
        } catch (URISyntaxException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public List<CarDTO> getAllCars() throws RuntimeException {

        return mapper.map(carRepo.findAll(), new TypeToken<ArrayList<CarSpDTO>>() {
        }.getType());

    }

}
