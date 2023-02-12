package lk.easy.car_rental.config;

import lk.easy.car_rental.advicer.AppWideExceptionHandler;
import lk.easy.car_rental.controller.CarController;
import lk.easy.car_rental.controller.CustomerController;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.multipart.commons.CommonsMultipartResolver;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

/**
 * @author : Sandun Induranga
 * @since : 0.1.0
 **/

@Configuration
@EnableWebMvc
@ComponentScan(basePackageClasses = {CustomerController.class, CarController.class, AppWideExceptionHandler.class})
public class WebAppConfig {


    @Bean
    public CommonsMultipartResolver multipartResolver() {
        CommonsMultipartResolver multipartResolver = new CommonsMultipartResolver();
        multipartResolver.setMaxUploadSize(5000000);
        return multipartResolver;
    }

}
