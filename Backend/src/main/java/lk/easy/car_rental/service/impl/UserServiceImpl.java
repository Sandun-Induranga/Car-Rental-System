package lk.easy.car_rental.service.impl;

import lk.easy.car_rental.dto.UserDTO;
import lk.easy.car_rental.entity.User;
import lk.easy.car_rental.repo.UserRepo;
import lk.easy.car_rental.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * @author : Sandun Induranga
 * @since : 0.1.0
 **/

@Service
@Transactional
public class UserServiceImpl implements UserService {

    @Autowired
    UserRepo userRepo;

    @Override
    public UserDTO getUser(String username) throws RuntimeException {

        User user = userRepo.findById(username).get();

        System.out.println(user);

        return null;

    }

}
