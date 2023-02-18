package lk.easy.car_rental.service.impl;

import lk.easy.car_rental.dto.CustomerDTO;
import lk.easy.car_rental.dto.RentDTO;
import lk.easy.car_rental.entity.Driver;
import lk.easy.car_rental.entity.Rent;
import lk.easy.car_rental.entity.RentDetail;
import lk.easy.car_rental.repo.CustomerRepo;
import lk.easy.car_rental.repo.DriverRepo;
import lk.easy.car_rental.repo.RentRepo;
import lk.easy.car_rental.service.RentService;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
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
    ModelMapper mapper;

    @Override
    public void requestRent(RentDTO rentDTO) throws RuntimeException {

        mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
        Rent rent = mapper.map(rentDTO, Rent.class);

        if (rentDTO.getDriverRequest().equals("YES")) {

            List<Driver> drivers = driverRepo.getAvailableDrivers();

            for (RentDetail rentDetail : rent.getRentDetails()) {
                rentDetail.setNic(drivers.get(new Random().nextInt(drivers.size())).getNic());
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

}
