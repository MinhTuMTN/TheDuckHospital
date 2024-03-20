package com.theduckhospital.api.controller;


import com.google.gson.JsonObject;
import okhttp3.*;
import okhttp3.RequestBody;
import org.apache.commons.codec.binary.Hex;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.io.IOException;
import java.util.Date;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class HelloController {
    @GetMapping
    public String hello(@RequestParam(name = "amount", defaultValue = "10000") String amount) throws IOException {
        return createPayment(amount);
    }

    @PostMapping("/callback")
    public ResponseEntity<?> callBackMomo(
            @org.springframework.web.bind.annotation.RequestBody String params
    ) {
        System.out.println("Callback from Momo: " + params);
        return ResponseEntity.status(204).body(null);
    }

    // Hàm tạo hash
    private static String hashSignature(String data, String key) throws Exception {
        Mac sha256_HMAC = Mac.getInstance("HmacSHA256");
        SecretKeySpec secret_key = new SecretKeySpec(key.getBytes(), "HmacSHA256");
        sha256_HMAC.init(secret_key);

        return Hex.encodeHexString(sha256_HMAC.doFinal(data.getBytes()));
    }


    public String createPayment(String amount) throws IOException {
        OkHttpClient client = new OkHttpClient();

        String payGateUrl = "https://test-payment.momo.vn";
        // Giả định các giá trị lấy từ environment
        String accessKey = "klm05TvNBzhg7h7j"; // Dữ liệu mẫu, trong thực tế là lấy từ biến môi trường
        String partnerCode = "MOMOBKUN20180529"; // Dữ liệu mẫu
        String secretKey = "at67qH6mk8w5Y1nAyMoYKMWACiEi2bsa"; // Dữ liệu mẫu

        // Lấy thời gian hiện tại và tạo các id cần thiết
        long date = new Date().getTime();
        String requestId = date + "id";
        String orderId = date + ":0123456778";

        String requestType = "captureWallet";
        String notifyUrl = "https://tb7drp6q-8080.asse.devtunnels.ms/api/callback";
        String returnUrl = "https://the-duck-hospital.web.app/payment-success?transactionId=94def967-8330-4cac-9d46-e8f7f7b12439";
        String orderInfo = "Thanh toán phieu kham benh TheDuckHospital qua ví MoMo";
        String extraData = "ew0KImVtYWlsIjogImh1b25neGRAZ21haWwuY29tIg0KfQ==";

        // Tạo chuỗi signature
        String signatureRaw = "accessKey=" + accessKey + "&amount=" + amount + "&extraData=" + extraData
                + "&ipnUrl=" + notifyUrl + "&orderId=" + orderId + "&orderInfo=" + orderInfo
                + "&partnerCode=" + partnerCode + "&redirectUrl=" + returnUrl + "&requestId=" + requestId
                + "&requestType=" + requestType;

        String signature = ""; // Giả định rằng bạn đã tạo một method để hash signature.
        try {
            signature = hashSignature(signatureRaw, secretKey);
        } catch (Exception e) {
            e.printStackTrace();
        }

        JsonObject json = new JsonObject();
        json.addProperty("partnerCode", partnerCode);
        json.addProperty("partnerName", "Test");
        json.addProperty("storeId", partnerCode);
        json.addProperty("requestId", requestId);
        json.addProperty("amount", amount);
        json.addProperty("orderId", orderId);
        json.addProperty("orderInfo", orderInfo);
        json.addProperty("redirectUrl", returnUrl);
        json.addProperty("ipnUrl", notifyUrl);
        json.addProperty("lang", "vi");
        json.addProperty("extraData", extraData);
        json.addProperty("requestType", requestType);
        json.addProperty("signature", signature);

        // Tạo request body
        String jsonData = json.toString();
        MediaType mediaType = MediaType.parse("application/json; charset=utf-8");
        RequestBody body = RequestBody.create(mediaType, jsonData);
        Request request = new Request.Builder()
                .url("https://test-payment.momo.vn/v2/gateway/api/create")
                .post(body)
                .build();

        // Gửi request
        try (Response response = client.newCall(request).execute()) {
            // Xử lý phản hồi từ server
            if (!response.isSuccessful()) {
                System.out.println("Lỗi khi gửi request: " + response);
                return  null;
            }

            // Gọi này trả về một chuỗi, có thể cần xử lý theo cách bạn muốn, ví dụ như chuyển đổi JSON.
            assert response.body() != null;
            return  response.body().string();
        }
    }
}
