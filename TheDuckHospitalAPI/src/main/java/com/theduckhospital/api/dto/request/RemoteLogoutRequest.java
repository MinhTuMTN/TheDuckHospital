package com.theduckhospital.api.dto.request;

import lombok.Data;

@Data
public class RemoteLogoutRequest {
    private String logoutTokenId;
}
