package lk.easy.car_rental.service.impl;

import lk.easy.car_rental.dto.RentDTO;
import lk.easy.car_rental.entity.Rent;
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
    ModelMapper mapper;

    @Override
    public void requestRent(RentDTO rentDTO) throws RuntimeException {

        mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
        Rent rent = mapper.map(rentDTO, Rent.class);
        System.out.println(rent);

    }

    @Override
    public String generateNewRentId() throws RuntimeException {

        Rent rent = rentRepo.getLastRentId();
        return rent != null ? String.format("RID-%03d", (Integer.parseInt(rent.getRentId().replace("RID-", "")) + 1)) : "RID-001";

    }

}
