package lk.easy.car_rental.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.core.env.Environment;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.jdbc.datasource.DriverManagerDataSource;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.orm.jpa.JpaVendorAdapter;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.orm.jpa.vendor.Database;
import org.springframework.orm.jpa.vendor.HibernateJpaVendorAdapter;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.annotation.EnableTransactionManagement;

import javax.persistence.EntityManagerFactory;
import javax.sql.DataSource;

/**
 * @author : Sandun Induranga
 * @since : 0.1.0
 **/

@Configuration
@EnableTransactionManagement
@EnableJpaRepositories(basePackageClasses = {})
@PropertySource("classpath:application.properties")
public class JPAConfig {
    @Autowired
    Environment environment;

    @Bean
    public LocalContainerEntityManagerFactoryBean entityManagerFactory(DataSource dataSource, JpaVendorAdapter vendorAdapter) {

        LocalContainerEntityManagerFactoryBean factoryBean = new LocalContainerEntityManagerFactoryBean();
        factoryBean.setPackagesToScan(environment.getProperty("spring.entity"));
        factoryBean.setDataSource(dataSource);
        factoryBean.setJpaVendorAdapter(vendorAdapter);

        return factoryBean;

    }

    @Bean
    public DataSource dataSource() {

        DriverManagerDataSource dataSource = new DriverManagerDataSource();
        dataSource.setDriverClassName(environment.getProperty("spring.driver"));
        dataSource.setUrl(environment.getProperty("spring.url"));
        dataSource.setUsername(environment.getProperty("spring.username"));
        dataSource.setPassword(environment.getProperty("spring.password"));
        return dataSource;

    }

    @Bean
    public JpaVendorAdapter jpaVendorAdapter() {

        HibernateJpaVendorAdapter vendorAdapter = new HibernateJpaVendorAdapter();
        vendorAdapter.setDatabase(Database.MYSQL);
        vendorAdapter.setGenerateDdl(true);
        vendorAdapter.setDatabasePlatform(environment.getProperty("spring.dial"));
        vendorAdapter.setShowSql(true);
        return vendorAdapter;

    }

    @Bean
    public PlatformTransactionManager transactionManager(EntityManagerFactory managerFactory) {

        return new JpaTransactionManager(managerFactory);

    }
}
