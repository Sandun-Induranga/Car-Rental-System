package lk.easy.car_rental.util;

import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.URISyntaxException;
import java.nio.file.Files;
import java.nio.file.Path;

/**
 * @author : Sandun Induranga
 * @since : 0.1.0
 **/
public class WriteImageUtil {
    public static String projectPath = "/media/sandu/0559F5C021740317/GDSE/Project_Zone/IdeaProjects/Car_Rental_System/Frontend/assets";

    public String writeImage(MultipartFile file, Path location) throws IOException, URISyntaxException {

        Files.write(location, file.getBytes());
        file.transferTo(location);

        return location.toString().replace("/media/sandu/0559F5C021740317/GDSE/Project_Zone/IdeaProjects/Car_Rental_System/Frontend/assets", "");

    }

}
