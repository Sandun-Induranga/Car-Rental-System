package lk.easy.car_rental.service.impl;

import lk.easy.car_rental.dto.UserDTO;
import lk.easy.car_rental.entity.User;
import lk.easy.car_rental.repo.UserRepo;
import lk.easy.car_rental.service.UserService;
import lk.easy.car_rental.util.CurrentUserUtil;
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
public class UserServiceImpl implements UserService {

    @Autowired
    UserRepo userRepo;

    @Autowired
    ModelMapper mapper;

    @Override
    public UserDTO getUser(String username, String password) throws RuntimeException {

        User user = userRepo.findById(username).get();
        if (!user.getPassword().equals(password))
            throw new RuntimeException("Wrong Login Details. Please Try Again..!");

        UserDTO userDTO = mapper.map(user, UserDTO.class);
        CurrentUserUtil.currentUser = userDTO;
        return userDTO;

    }

}
