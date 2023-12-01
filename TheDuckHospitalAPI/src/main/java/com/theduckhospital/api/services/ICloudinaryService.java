package com.theduckhospital.api.services;

import org.springframework.web.multipart.MultipartFile;

public interface ICloudinaryService {
    String uploadFile(MultipartFile file);
}
