package lk.easy.car_rental.config;

import lk.easy.car_rental.advisor.AppWideExceptionHandler;
import lk.easy.car_rental.controller.CarController;
import lk.easy.car_rental.controller.CustomerController;
import lk.easy.car_rental.controller.ManageLoginController;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.multipart.commons.CommonsMultipartResolver;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * @author : Sandun Induranga
 * @since : 0.1.0
 **/

@Configuration
@EnableWebMvc
@ComponentScan(basePackageClasses = {CustomerController.class, CarController.class, ManageLoginController.class, AppWideExceptionHandler.class})
public class WebAppConfig implements WebMvcConfigurer {

    @Bean
    public CommonsMultipartResolver multipartResolver() {
        CommonsMultipartResolver multipartResolver = new CommonsMultipartResolver();
        multipartResolver.setMaxUploadSize(5000000);
        return multipartResolver;
    }

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/**/**").addResourceLocations("http://localhost:8080");
    }

}
