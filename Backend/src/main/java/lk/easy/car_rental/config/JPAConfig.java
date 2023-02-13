package lk.easy.car_rental.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.transaction.annotation.EnableTransactionManagement;

/**
 * @author : Sandun Induranga
 * @since : 0.1.0
 **/

@Configuration
@EnableTransactionManagement
@EnableJpaRepositories(basePackageClasses = {})
@PropertySource("classpath:application.properties")
public class JPAConfig {
}
