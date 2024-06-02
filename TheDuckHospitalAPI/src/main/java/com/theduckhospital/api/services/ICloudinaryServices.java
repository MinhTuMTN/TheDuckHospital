package com.theduckhospital.api.services;

import org.springframework.web.multipart.MultipartFile;

public interface ICloudinaryServices {
    String uploadFile(MultipartFile file);
    String uploadFile(Object file);
}
