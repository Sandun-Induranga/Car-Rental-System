package lk.easy.car_rental.service.impl;

import lk.easy.car_rental.dto.CustomerDTO;
import lk.easy.car_rental.dto.RentDTO;
import lk.easy.car_rental.dto.RentDetailDTO;
import lk.easy.car_rental.entity.Car;
import lk.easy.car_rental.entity.Driver;
import lk.easy.car_rental.entity.Rent;
import lk.easy.car_rental.entity.RentDetail;
import lk.easy.car_rental.repo.*;
import lk.easy.car_rental.service.RentService;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Random;

/**
 * @author : Sandun Induranga
 * @since : 0.1.0
 **/

@Service
@Transactional
public class RentServiceImpl implements RentService {

    @Autowired
    RentRepo rentRepo;

    @Autowired
    CustomerRepo customerRepo;

    @Autowired
    DriverRepo driverRepo;

    @Autowired
    RentDetailRepo rentDetailRepo;

    @Autowired
    CarRepo carRepo;

    @Autowired
    ModelMapper mapper;

    @Override
    public void requestRent(RentDTO rentDTO) throws RuntimeException {

        mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
        Rent rent = mapper.map(rentDTO, Rent.class);


        if (rentDTO.getDriverRequest().equals("YES")) {

            List<Driver> drivers = driverRepo.getAvailableDrivers();
            int i;

            for (RentDetail rentDetail : rent.getRentDetails()) {
                i = new Random().nextInt(drivers.size());
                rentDetail.setNic(drivers.get(i).getNic());
                Car car = carRepo.findById(rentDetail.getRegNum()).get();
                car.setAvailability("NO");
                carRepo.save(car);
                drivers.get(i).setAvailabilityStatus("NO");
                driverRepo.save(drivers.get(i));
            }

        }

        rentRepo.save(rent);

    }

    @Override
    public String generateNewRentId() throws RuntimeException {

        String lastRentId = rentRepo.getLastRentId();
        return lastRentId != null ? String.format("RID-%03d", (Integer.parseInt(lastRentId.replace("RID-", "")) + 1)) : "RID-001";

    }

    @Override
    public CustomerDTO getCustomerByUsername(String username) throws RuntimeException {

        return mapper.map(customerRepo.getCustomerByUsername(username), CustomerDTO.class);

    }

    @Override
    public List<RentDTO> getAllRents() throws RuntimeException {

        return mapper.map(rentRepo.findAll(), new TypeToken<ArrayList<RentDTO>>() {
        }.getType());

    }

    @Override
    public void acceptRentRequest(String rentId) throws RuntimeException {

        Rent rent = rentRepo.findById(rentId).get();

        rent.setStatus("Accepted");
        rent.setDescription("Rent Accepted On" + LocalDate.now() + LocalTime.now());

        rentRepo.save(rent);

    }

    @Override
    public RentDTO getRentByRentId(String rentId) throws RuntimeException {

        return mapper.map(rentRepo.findById(rentId), RentDTO.class);

    }

    @Override
    public List<RentDetailDTO> getDriverSchedule(String nic) throws RuntimeException {

        return mapper.map(rentDetailRepo.getRentDetailByNic(nic), new TypeToken<ArrayList<RentDetailDTO>>() {
        }.getType());

    }

    @Override
    public List<RentDTO> getRentByNic(String nic) throws RuntimeException {

        return mapper.map(rentRepo.getRentsByNic(nic), new TypeToken<ArrayList<RentDTO>>() {
        }.getType());

    }

}
