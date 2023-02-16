package lk.easy.car_rental.config;

import lk.easy.car_rental.advicer.AppWideExceptionHandler;
import lk.easy.car_rental.controller.CarController;
import lk.easy.car_rental.controller.CustomerController;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.multipart.MultipartResolver;
import org.springframework.web.multipart.support.StandardServletMultipartResolver;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * @author : Sandun Induranga
 * @since : 0.1.0
 **/

@Configuration
@EnableWebMvc
@ComponentScan(basePackageClasses = {CustomerController.class, CarController.class, AppWideExceptionHandler.class})
public class WebAppConfig implements WebMvcConfigurer {

    @Bean
    public MultipartResolver multipartResolver() {

        return new StandardServletMultipartResolver();
    }

//    @Override
//    public void addResourceHandlers(ResourceHandlerRegistry registry) {
//        registry.addResourceHandler("/car/**").addResourceLocations("/bucket/");
//    }

}
