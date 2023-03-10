package lk.easy.car_rental.service.impl;

import lk.easy.car_rental.dto.DriverDTO;
import lk.easy.car_rental.dto.DriverSpDTO;
import lk.easy.car_rental.entity.Driver;
import lk.easy.car_rental.repo.DriverRepo;
import lk.easy.car_rental.service.DriverService;
import lk.easy.car_rental.util.CurrentUserUtil;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.File;
import java.io.IOException;
import java.net.URISyntaxException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

/**
 * @author : Sandun Induranga
 * @since : 0.1.0
 **/

@Service
@Transactional
public class DriverServiceImpl implements DriverService {

    @Autowired
    DriverRepo driverRepo;

    @Autowired
    ModelMapper mapper;

    @Override
    public void saveDriver(DriverDTO driverDTO) throws RuntimeException {

        Driver driver = mapper.map(driverDTO, Driver.class);

        if (driverRepo.existsById(driverDTO.getNic())) throw new RuntimeException("Customer Already Exits..!");
        try {
            if (driverDTO.getLicenseImage().getBytes() != null) {

                byte[] licenseFileBytes = driverDTO.getLicenseImage().getBytes();

                String projectPath = "/media/sandu/0559F5C021740317/GDSE/Project_Zone/IdeaProjects/Car_Rental_System/Frontend/assets";
                Path licenseLocation = Paths.get(projectPath + "/image/bucket/driver/license_" + driver.getNic() + ".jpeg");

                Files.write(licenseLocation, licenseFileBytes);

                driverDTO.getLicenseImage().transferTo(licenseLocation);

                driver.setLicenseImage("/image/bucket/driver/license_" + driver.getNic() + ".jpeg");

            }

        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        driver.setAvailabilityStatus("YES");
        driver.getUser().setRole("Driver");

        driverRepo.save(driver);

    }

    @Override
    public void updateDriver(DriverDTO driverDTO) throws RuntimeException {
        Driver driver = mapper.map(driverDTO, Driver.class);

        if (!driverRepo.existsById(driverDTO.getNic())) throw new RuntimeException("Invalid Driver..!");

        Driver driver1 = driverRepo.findById(driverDTO.getNic()).get();

        driver.setLicenseImage(driver1.getLicenseImage());

//        try {
//
//            byte[] licenseFileBytes = driverDTO.getLicenseImage().getBytes();
//            if (licenseFileBytes.length != 0) {
//
//                String projectPath = "/media/sandu/0559F5C021740317/GDSE/Project_Zone/IdeaProjects/Car_Rental_System/Frontend/assets";
//                Path licenseLocation = Paths.get(projectPath + "/image/bucket/driver/license_" + driver.getNic() + ".jpeg");
//
//                Files.write(licenseLocation, licenseFileBytes);
//
//                driverDTO.getLicenseImage().transferTo(licenseLocation);
//
//                driver.setLicenseImage("/image/bucket/driver/license_" + driver.getNic() + ".jpeg");
//
//                driver.setAvailabilityStatus("YES");
//
//                driverRepo.save(driver);
//
//            }
//
//        } catch (IOException e) {
//            throw new RuntimeException(e);
//        }
        driver.setAvailabilityStatus("YES");
        driver.getUser().setRole("Driver");
        driverRepo.save(driver);

    }

    @Override
    public DriverDTO getDriver() throws RuntimeException {

        return mapper.map(driverRepo.getDriverByUsername(CurrentUserUtil.currentUser.getUsername()), DriverDTO.class);

    }

    @Override
    public List<DriverDTO> getAllDrivers() throws RuntimeException {

        return mapper.map(driverRepo.findAll(), new TypeToken<ArrayList<DriverSpDTO>>() {
        }.getType());

    }

    @Override
    public void deleteDriver(String nic) throws RuntimeException {

        if (!driverRepo.existsById(nic)) throw new RuntimeException("Invalid Driver..!");
        driverRepo.deleteById(nic);

    }

    @Override
    public Long countAvailableDrivers() throws RuntimeException {

        return driverRepo.countAvailableDrivers();

    }

    @Override
    public Long countReservedDrivers() throws RuntimeException {

        return driverRepo.countReservedDrivers();

    }

}
