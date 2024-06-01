package com.theduckhospital.api.dto.response;

import com.theduckhospital.api.constant.NurseType;
import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;
import java.util.Date;

@Data
@Builder
public class CheckTokenResponse {
    private boolean valid;
    private String role;
    private NurseType nurseType;
    private String fullName;
    private BigDecimal balance;
    private String phoneNumber;
    private Date createdAt;
    private Integer numberOfProfile;
    private String avatar;
}
