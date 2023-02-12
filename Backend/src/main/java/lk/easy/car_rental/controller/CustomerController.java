package lk.easy.car_rental.controller;

import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.net.URISyntaxException;
import java.nio.file.Files;
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
    public void getAll(@RequestParam("file") MultipartFile file, ModelMap modelMap){

        modelMap.addAttribute("file", file);

        try {
            byte[] byteArray = file.getBytes();
            String serverPath = new File(this.getClass().getProtectionDomain().getCodeSource().getLocation().toURI()).getParentFile().getParentFile().getParentFile().getAbsolutePath();

            Path location = Paths.get(serverPath + "/image.jpeg");
            Files.write(location, byteArray);
            file.transferTo(location);
            System.out.println(serverPath);

        } catch (IOException e) {
            throw new RuntimeException(e);
        } catch (URISyntaxException e) {
            throw new RuntimeException(e);
        }
    }

}
