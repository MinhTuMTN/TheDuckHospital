package com.theduckhospital.api.services.impl;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.theduckhospital.api.constant.MomoConfig;
import com.theduckhospital.api.constant.PaymentMethod;
import com.theduckhospital.api.constant.VNPayConfig;
import com.theduckhospital.api.dto.response.PaymentResponse;
import com.theduckhospital.api.error.StatusCodeException;
import com.theduckhospital.api.services.IPaymentServices;
import okhttp3.*;
import org.apache.commons.codec.binary.Hex;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Service;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.text.SimpleDateFormat;
import java.util.*;

@Service
public class PaymentServicesImpl implements IPaymentServices {
    private final Environment environment;

    public PaymentServicesImpl(Environment environment) {
        this.environment = environment;
    }
    @Override
    public PaymentResponse vnPayCreatePaymentUrl(double amount, UUID transactionId)  throws UnsupportedEncodingException {
        String vnp_Version = "2.1.0";
        String vnp_Command = "pay";
        String orderType = "other";
        String vnp_TxnRef = VNPayConfig.getRandomNumber(8);
        String vnp_IpAddr = "127.0.0.1";

        String vnp_TmnCode = VNPayConfig.vnp_TmnCode;

        Map<String, String> vnp_Params = new HashMap<>();
        vnp_Params.put("vnp_Version", vnp_Version);
        vnp_Params.put("vnp_Command", vnp_Command);
        vnp_Params.put("vnp_TmnCode", vnp_TmnCode);
        vnp_Params.put("vnp_Amount", String.valueOf((int) amount * 100));
        vnp_Params.put("vnp_CurrCode", "VND");

        vnp_Params.put("vnp_TxnRef", vnp_TxnRef);
        vnp_Params.put("vnp_OrderInfo", "Thanh toan don hang:" + transactionId.toString());
        vnp_Params.put("vnp_OrderType", orderType);

        vnp_Params.put("vnp_Locale", "vn");
        vnp_Params.put("vnp_ReturnUrl", VNPayConfig.vnp_ReturnUrl);
        vnp_Params.put("vnp_IpAddr", vnp_IpAddr);

        Calendar cld = Calendar.getInstance(TimeZone.getTimeZone("Etc/GMT+7"));
        SimpleDateFormat formatter = new SimpleDateFormat("yyyyMMddHHmmss");
        String vnp_CreateDate = formatter.format(cld.getTime());
        vnp_Params.put("vnp_CreateDate", vnp_CreateDate);

        cld.add(Calendar.MINUTE, 15);
        String vnp_ExpireDate = formatter.format(cld.getTime());
        vnp_Params.put("vnp_ExpireDate", vnp_ExpireDate);

        List<String> fieldNames = new ArrayList<>(vnp_Params.keySet());
        Collections.sort(fieldNames);
        StringBuilder hashData = new StringBuilder();
        StringBuilder query = new StringBuilder();
        Iterator<String> itr = fieldNames.iterator();
        while (itr.hasNext()) {
            String fieldName = itr.next();
            String fieldValue = vnp_Params.get(fieldName);
            if ((fieldValue != null) && (!fieldValue.isEmpty())) {
                //Build hash data
                hashData.append(fieldName);
                hashData.append('=');
                hashData.append(URLEncoder.encode(fieldValue, StandardCharsets.US_ASCII));
                //Build query
                query.append(URLEncoder.encode(fieldName, StandardCharsets.US_ASCII));
                query.append('=');
                query.append(URLEncoder.encode(fieldValue, StandardCharsets.US_ASCII));
                if (itr.hasNext()) {
                    query.append('&');
                    hashData.append('&');
                }
            }
        }
        String queryUrl = query.toString();
        String vnp_SecureHash = VNPayConfig.hmacSHA512(VNPayConfig.secretKey, hashData.toString());
        queryUrl += "&vnp_SecureHash=" + vnp_SecureHash;

        return PaymentResponse.builder()
                .paymentMethod(PaymentMethod.VNPAY)
                .paymentUrl(VNPayConfig.vnp_PayUrl + "?" + queryUrl)
                .deepLink(null)
                .build();
    }

    @Override
    public PaymentResponse momoCreatePaymentUrl(double amountInput, UUID transactionId, boolean mobile) throws IOException {
        OkHttpClient client = new OkHttpClient();

        long date = new Date().getTime();
        String requestId = date + "id";
        String orderId = date + ":" + transactionId.toString();
        String amount = String.valueOf((int) amountInput);

        String requestType = "captureWallet";
        String notifyUrl = "https://tb7drp6q-8080.asse.devtunnels.ms/api/booking/callback/momo";
        String returnUrl = "https://the-duck-hospital.web.app/payment-success?transactionId=" + transactionId;
        if (mobile)
            returnUrl = "theduck://app/payment/" + transactionId;
        String orderInfo = "Thanh toán phieu kham benh The Duck Hospital";
        String extraData = "ew0KImVtYWlsIjogImh1b25neGRAZ21haWwuY29tIg0KfQ==";

        String signatureRaw = "accessKey=" + MomoConfig.accessKey + "&amount=" + amount + "&extraData=" + extraData
                + "&ipnUrl=" + notifyUrl + "&orderId=" + orderId + "&orderInfo=" + orderInfo
                + "&partnerCode=" + MomoConfig.partnerCode + "&redirectUrl=" + returnUrl + "&requestId=" + requestId
                + "&requestType=" + requestType;

        String signature = "";
        try {
            signature = MomoConfig.hashSignature(signatureRaw, MomoConfig.secretKey);
        } catch (Exception e) {
            throw new StatusCodeException("Internal server error", 500);
        }

        JsonObject json = new JsonObject();
        json.addProperty("partnerCode", MomoConfig.partnerCode);
        json.addProperty("partnerName", "Test");
        json.addProperty("storeId", MomoConfig.partnerCode);
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

        String jsonData = json.toString();
        MediaType mediaType = MediaType.parse("application/json; charset=utf-8");
        RequestBody body = RequestBody.create(jsonData, mediaType);
        Request request = new Request.Builder()
                .url("https://test-payment.momo.vn/v2/gateway/api/create")
                .post(body)
                .build();

        try (Response response = client.newCall(request).execute()) {
            if (!response.isSuccessful()) {
                // Print Data response
                System.out.println(response.body().string());
                throw new StatusCodeException("Internal server error", 500);
            }

            assert response.body() != null;
            JsonObject jsonObject = new Gson().fromJson(response.body().string(), JsonObject.class);
            String payUrl = jsonObject.get("payUrl").getAsString();
            String deeplink = jsonObject.get("deeplink").getAsString();
            return PaymentResponse.builder()
                    .paymentMethod(PaymentMethod.MOMO)
                    .paymentUrl(payUrl)
                    .deepLink(deeplink)
                    .build();
        }
    }
}
