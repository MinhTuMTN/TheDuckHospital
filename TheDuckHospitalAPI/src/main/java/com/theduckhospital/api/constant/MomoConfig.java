package com.theduckhospital.api.constant;

import org.apache.commons.codec.binary.Hex;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;

public class MomoConfig {
    public static String partnerCode = "MOMO";
    public static String secretKey = "K951B6PE1waDMi640xX08PD3vg6EkVlz";
    public static String accessKey = "F8BBA842ECF85";
    public static int fee = 15000;
    public static int medicalTestFee = 1500;
    public static String hashSignature(String data, String key) throws Exception {
        Mac sha256_HMAC = Mac.getInstance("HmacSHA256");
        SecretKeySpec secret_key = new SecretKeySpec(key.getBytes(), "HmacSHA256");
        sha256_HMAC.init(secret_key);

        return Hex.encodeHexString(sha256_HMAC.doFinal(data.getBytes()));
    }
}
