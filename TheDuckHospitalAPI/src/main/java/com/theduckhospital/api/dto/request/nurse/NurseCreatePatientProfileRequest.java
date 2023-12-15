package com.theduckhospital.api.dto.request.nurse;

import com.theduckhospital.api.constant.Gender;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.util.Date;

@Data
public class NurseCreatePatientProfileRequest {
    @NotBlank(message = "fullName is required")
    private String fullName;
    @NotNull(message = "dateOfBirth is required")
    private Date dateOfBirth;
    private String phoneNumber;
    private String identityNumber;
    private int nationId;
    private Gender gender;
    private String streetName;
    private String wardId;
}
