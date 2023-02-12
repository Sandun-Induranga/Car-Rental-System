package lk.easy.car_rental.controller;

import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.net.URISyntaxException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

/**
 * @author : Sandun Induranga
 * @since : 0.1.0
 **/

@RestController
@RequestMapping("/customer")
@CrossOrigin
public class CustomerController {

    @PostMapping
    public void getAll(@RequestParam("nicImage") MultipartFile nicFile, @RequestParam("licenseImage") MultipartFile licenseFile){

        try {
            byte[] nicFileBytes = nicFile.getBytes();
            byte[] licenseFileBytes = licenseFile.getBytes();

            String serverPath = new File(this.getClass().getProtectionDomain().getCodeSource().getLocation().toURI()).getParentFile().getParentFile().getParentFile().getAbsolutePath();
            Path nicLocation = Paths.get(serverPath + "/nic_image.jpeg");
            Path licenseLocation = Paths.get(serverPath + "/license_image.jpeg");

            Files.write(nicLocation, nicFileBytes);
            Files.write(licenseLocation, licenseFileBytes);

            nicFile.transferTo(nicLocation);
            licenseFile.transferTo(licenseLocation);

        } catch (IOException e) {
            throw new RuntimeException(e);
        } catch (URISyntaxException e) {
            throw new RuntimeException(e);
        }
    }

}
