package lk.easy.car_rental.service.impl;

import lk.easy.car_rental.dto.CustomerDTO;
import lk.easy.car_rental.dto.RentDTO;
import lk.easy.car_rental.dto.RentDetailDTO;
import lk.easy.car_rental.entity.Driver;
import lk.easy.car_rental.entity.Rent;
import lk.easy.car_rental.entity.RentDetail;
import lk.easy.car_rental.repo.CustomerRepo;
import lk.easy.car_rental.repo.DriverRepo;
import lk.easy.car_rental.repo.RentRepo;
import lk.easy.car_rental.service.RentService;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
        System.out.println(rentDTO);
        mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
        Rent rent = mapper.map(rentDTO, Rent.class);

        if (rentDTO.getDriverRequest().equals("YES")) {

            List<Driver> drivers = driverRepo.getAvailableDrivers();
            int randomNumber = new Random().nextInt(drivers.size());

            for (RentDetail rentDetail : rent.getRentDetails()) {
                rentDetail.setNic(drivers.get(randomNumber).getNic());
            }

        }

        rentRepo.save(rent);

    }

    @Override
    public String generateNewRentId() throws RuntimeException {

        String lastRentId = rentRepo.getLastRentId();
        System.out.println(lastRentId != null ? String.format("RID-%03d", (Integer.parseInt(lastRentId.replace("RID-", "")) + 1)) : "RID-001");
        return lastRentId != null ? String.format("RID-%03d", (Integer.parseInt(lastRentId.replace("RID-", "")) + 1)) : "RID-001";

    }

    @Override
    public CustomerDTO getCustomerByUsername(String username) throws RuntimeException {
        System.out.println(customerRepo.getCustomerByUsername(username));

        return mapper.map(customerRepo.getCustomerByUsername(username), CustomerDTO.class);

    }

}
