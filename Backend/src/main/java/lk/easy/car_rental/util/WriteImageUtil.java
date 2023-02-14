package lk.easy.car_rental.util;

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
public class WriteImageUtil {

    public String writeImage(MultipartFile file, Path location) throws IOException, URISyntaxException {

        Files.write(location,file.getBytes());
        file.transferTo(location);

        return location.toString();

    }

}
