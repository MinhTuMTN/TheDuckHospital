package com.theduckhospital.api.services.impl;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.theduckhospital.api.services.ICloudinaryServices;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class CloudinaryServicesImpl implements ICloudinaryServices {
    @Value("${cloudinary.url}")
    private String cloudinaryURL;

    private final Environment environment;

    public CloudinaryServicesImpl(Environment environment) {
        this.environment = environment;
    }

    @Override
    public String uploadFile(MultipartFile file) {
        Cloudinary cloudinary = new Cloudinary(environment.getProperty("cloudinary.url"));
        cloudinary.config.secure = true;

        try {
            return cloudinary.uploader().upload(
                    file.getBytes(),
                    ObjectUtils.asMap(
                            "use_filename", false,
                            "unique_filename", true
                    )
            ).get("url").toString();
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}
