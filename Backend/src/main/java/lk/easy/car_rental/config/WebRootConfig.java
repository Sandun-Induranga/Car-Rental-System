package lk.easy.car_rental.config;

import lk.easy.car_rental.service.CarService;
import lk.easy.car_rental.service.CustomerService;
import lk.easy.car_rental.service.DriverService;
import lk.easy.car_rental.service.RentService;
import org.modelmapper.ModelMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;
import org.springframework.web.multipart.MultipartResolver;
import org.springframework.web.multipart.commons.CommonsMultipartResolver;
import org.springframework.web.multipart.support.StandardServletMultipartResolver;

/**
 * @author : Sandun Induranga
 * @since : 0.1.0
 **/

@Configuration
@Import(JPAConfig.class)
@ComponentScan(basePackageClasses = {CustomerService.class, CarService.class, DriverService.class, RentService.class})
public class WebRootConfig {

    @Bean
    public ModelMapper modelMapper() {
        return new ModelMapper();
    }


}
