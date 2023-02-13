package lk.easy.car_rental.config;

import lk.easy.car_rental.service.CarService;
import lk.easy.car_rental.service.CustomerService;
import lk.easy.car_rental.service.DriverService;
import org.modelmapper.ModelMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;
import org.springframework.web.multipart.commons.CommonsMultipartResolver;

/**
 * @author : Sandun Induranga
 * @since : 0.1.0
 **/

@Configuration
@Import(JPAConfig.class)
@ComponentScan(basePackageClasses = {CustomerService.class, CarService.class, DriverService.class})
public class WebRootConfig {

    @Bean
    public ModelMapper modelMapper() {
        return new ModelMapper();
    }

    @Bean
    public CommonsMultipartResolver multipartResolver() {
        CommonsMultipartResolver multipartResolver = new CommonsMultipartResolver();
        multipartResolver.setMaxUploadSize(5000000);
        return multipartResolver;
    }

}
