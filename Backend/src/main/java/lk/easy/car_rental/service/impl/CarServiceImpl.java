package lk.easy.car_rental.service.impl;

import lk.easy.car_rental.dto.CarDTO;
import lk.easy.car_rental.dto.CarPhotoDTO;
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

            car.getPhotos().setFront(new WriteImageUtil().writeImage(carDTO.getPhotos().getFront(), Paths.get(WriteImageUtil.projectPath + "/image/bucket/car/front_" + carDTO.getRegNum() + ".jpeg")));
            car.getPhotos().setBack(new WriteImageUtil().writeImage(carDTO.getPhotos().getBack(), Paths.get(WriteImageUtil.projectPath + "/image/bucket/car/back_" + carDTO.getRegNum() + ".jpeg")));
            car.getPhotos().setSide(new WriteImageUtil().writeImage(carDTO.getPhotos().getSide(), Paths.get(WriteImageUtil.projectPath + "/image/bucket/car/side_" + carDTO.getRegNum() + ".jpeg")));
            car.getPhotos().setInterior(new WriteImageUtil().writeImage(carDTO.getPhotos().getInterior(), Paths.get(WriteImageUtil.projectPath + "/image/bucket/car/interior_" + carDTO.getRegNum() + ".jpeg")));

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

    @Override
    public void saveCarImages(CarPhotoDTO carPhotoDTO) throws RuntimeException {

//        Car car = carRepo.findById(carPhotoDTO.getNic()).get();

//        try {
//
////            car.getPhotos().setFront(new WriteImageUtil().writeImage(carPhotoDTO.getFront(), Paths.get( WriteImageUtil.projectPath+"/bucket/car/front_" + car.getRegNum() + ".jpeg")));
////            car.getPhotos().setBack(new WriteImageUtil().writeImage(carPhotoDTO.getBack(), Paths.get( WriteImageUtil.projectPath+"/bucket/car/back_" + car.getRegNum() + ".jpeg")));
////            car.getPhotos().setSide(new WriteImageUtil().writeImage(carPhotoDTO.getSide(), Paths.get(WriteImageUtil.projectPath+"/bucket/car/side_" + car.getRegNum() + ".jpeg")));
////            car.getPhotos().setInterior(new WriteImageUtil().writeImage(carPhotoDTO.getInterior(), Paths.get( WriteImageUtil.projectPath+"/bucket/car/interior_" + car.getRegNum() + ".jpeg")));
////
////            carRepo.save(car);
//
//        } catch (IOException e) {
//            throw new RuntimeException(e);
//        } catch (URISyntaxException e) {
//            throw new RuntimeException(e);
//        }

    }

    @Override
    public void addToMaintains(String regNum) throws RuntimeException {

        Car car = carRepo.findCarByRegNum(regNum);
        car.setAvailability(car.getAvailability().equals("YES") ? "NO" : "YES");

        carRepo.save(car);

    }

    @Override
    public CarSpDTO getCar(String regNum) throws RuntimeException {

        return mapper.map(carRepo.findById(regNum), CarSpDTO.class);

    }

    @Override
    public Long countAvailableCars() throws RuntimeException {

        return carRepo.countAvailableCars();

    }

    @Override
    public Long countReservedCars() throws RuntimeException {

        return carRepo.countReservedCars();

    }

    @Override
    public void updateCar(CarDTO carDTO) throws RuntimeException {
        if (!carRepo.existsById(carDTO.getRegNum())) throw new RuntimeException("Car Doesn't Exist..!");

        Car car = mapper.map(carDTO, Car.class);
        try {

            if (car.getPhotos() != null) {
                car.getPhotos().setFront(new WriteImageUtil().writeImage(carDTO.getPhotos().getFront(), Paths.get(WriteImageUtil.projectPath + "/image/bucket/car/front_" + carDTO.getRegNum() + ".jpeg")));
                car.getPhotos().setBack(new WriteImageUtil().writeImage(carDTO.getPhotos().getBack(), Paths.get(WriteImageUtil.projectPath + "/image/bucket/car/back_" + carDTO.getRegNum() + ".jpeg")));
                car.getPhotos().setSide(new WriteImageUtil().writeImage(carDTO.getPhotos().getSide(), Paths.get(WriteImageUtil.projectPath + "/image/bucket/car/side_" + carDTO.getRegNum() + ".jpeg")));
                car.getPhotos().setInterior(new WriteImageUtil().writeImage(carDTO.getPhotos().getInterior(), Paths.get(WriteImageUtil.projectPath + "/image/bucket/car/interior_" + carDTO.getRegNum() + ".jpeg")));
            }

            carRepo.save(car);

        } catch (IOException e) {
            throw new RuntimeException(e);
        } catch (URISyntaxException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public void deleteCar(String regNum) throws RuntimeException {

        if (!carRepo.existsById(regNum)) throw new RuntimeException("Car Doesn't Exist..!");
        carRepo.deleteById(regNum);

    }

    @Override
    public List<CarSpDTO> filterCarsByRegNum(String text, String search, String fuel) throws RuntimeException {

        return mapper.map(carRepo.findByRegNumLike("%" + text + "%"), new TypeToken<ArrayList<CarSpDTO>>() {
        }.getType());

    }

}
