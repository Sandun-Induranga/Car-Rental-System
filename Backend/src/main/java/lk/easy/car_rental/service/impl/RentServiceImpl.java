package lk.easy.car_rental.service.impl;

import lk.easy.car_rental.dto.RentDTO;
import lk.easy.car_rental.entity.Rent;
import lk.easy.car_rental.service.RentService;
import org.modelmapper.ModelMapper;
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
    ModelMapper mapper;

    @Override
    public void requestRent(RentDTO rentDTO) throws RuntimeException {

        Rent rent = mapper.map(rentDTO, Rent.class);
        System.out.println(rent);

    }

}
