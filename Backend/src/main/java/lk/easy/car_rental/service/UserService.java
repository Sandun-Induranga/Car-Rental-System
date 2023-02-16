package lk.easy.car_rental.service;

import lk.easy.car_rental.dto.UserDTO;

/**
 * @author : Sandun Induranga
 * @since : 0.1.0
 **/

public interface UserService {

    public UserDTO getUser(String username) throws RuntimeException;

}
