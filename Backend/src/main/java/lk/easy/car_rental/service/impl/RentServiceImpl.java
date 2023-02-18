package lk.easy.car_rental.service.impl;

import lk.easy.car_rental.dto.CustomerDTO;
import lk.easy.car_rental.dto.RentDTO;
import lk.easy.car_rental.entity.Rent;
import lk.easy.car_rental.repo.CustomerRepo;
import lk.easy.car_rental.repo.DriverRepo;
import lk.easy.car_rental.repo.RentRepo;
import lk.easy.car_rental.service.RentService;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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

        if (rentDTO.getDriverRequest().equals("YES")) {

        }
        rentRepo.save(mapper.map(rentDTO, Rent.class));

    }

    @Override
    public String generateNewRentId() throws RuntimeException {

        Rent rent = rentRepo.getLastRentId();
        System.out.println(rent != null ? String.format("RID-%03d", (Integer.parseInt(rent.getRentId().replace("RID-", "")) + 1)) : "RID-001");
        return rent != null ? String.format("RID-%03d", (Integer.parseInt(rent.getRentId().replace("RID-", "")) + 1)) : "RID-001";

    }

    @Override
    public CustomerDTO getCustomerByUsername(String username) throws RuntimeException {
        System.out.println(customerRepo.getCustomerByUsername(username));

        return mapper.map(customerRepo.getCustomerByUsername(username), CustomerDTO.class);

    }

}
