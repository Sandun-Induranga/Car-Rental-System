package lk.easy.car_rental.advicer;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;

/**
 * @author : Sandun Induranga
 * @since : 0.1.0
 **/

public class AppWideExceptionHandler {

    @ExceptionHandler({RuntimeException.class})
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public void handleMyExceptions(RuntimeException e) {
        System.out.println(e.getMessage());
    }

}
