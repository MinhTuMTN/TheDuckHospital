package com.theduckhospital.api.services.impl;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.theduckhospital.api.constant.*;
import com.theduckhospital.api.dto.request.BookingRequest;
import com.theduckhospital.api.dto.request.PayMedicalTestRequest;
import com.theduckhospital.api.dto.response.PaymentResponse;
import com.theduckhospital.api.entity.Account;
import com.theduckhospital.api.entity.Booking;
import com.theduckhospital.api.entity.TimeSlot;
import com.theduckhospital.api.entity.Transaction;
import com.theduckhospital.api.error.BadRequestException;
import com.theduckhospital.api.error.StatusCodeException;
import com.theduckhospital.api.repository.BookingRepository;
import com.theduckhospital.api.repository.TimeSlotRepository;
import com.theduckhospital.api.repository.TransactionRepository;
import com.theduckhospital.api.services.IAccountServices;
import com.theduckhospital.api.services.IPaymentServices;
import jakarta.transaction.TransactionalException;
import okhttp3.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.math.BigDecimal;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.text.SimpleDateFormat;
import java.util.*;

import static com.theduckhospital.api.constant.PaymentMethod.*;

@Service
public class PaymentServicesImpl implements IPaymentServices {
    // Value from application.properties
    @Value("${server.callback.url}")
    private String callbackUrl;
    private final PasswordEncoder passwordEncoder;
    private final IAccountServices accountServices;
    private final TransactionRepository transactionRepository;
    private final BookingRepository bookingRepository;
    private final TimeSlotRepository timeSlotRepository;

    public PaymentServicesImpl(
            PasswordEncoder passwordEncoder,
            IAccountServices accountServices,
            TransactionRepository transactionRepository,
            BookingRepository bookingRepository,
            TimeSlotRepository timeSlotRepository
    ) {
        this.passwordEncoder = passwordEncoder;
        this.accountServices = accountServices;
        this.transactionRepository = transactionRepository;
        this.bookingRepository = bookingRepository;
        this.timeSlotRepository = timeSlotRepository;
    }
    @Override
    public PaymentResponse vnPayCreatePaymentUrl(double amount, UUID transactionId)  throws UnsupportedEncodingException {
        String vnPayUrl = callbackUrl + "/booking/callback/vnPay";

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
        vnp_Params.put("vnp_ReturnUrl", vnPayUrl);
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
                .paymentMethod(VNPAY)
                .paymentUrl(VNPayConfig.vnp_PayUrl + "?" + queryUrl)
                .deepLink(null)
                .build();
    }

    @Override
    public PaymentResponse momoCreatePaymentUrl(double amountInput, UUID transactionId, boolean mobile) throws IOException {
        String notifyUrl = callbackUrl + "/booking/callback/momo";
        OkHttpClient client = new OkHttpClient();

        long date = new Date().getTime();
        String requestId = date + "id";
        String orderId = date + ":" + transactionId.toString();
        String amount = String.valueOf((int) amountInput);

        String requestType = "captureWallet";
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
                assert response.body() != null;
                System.out.println(response.body().string());
                throw new StatusCodeException("Internal server error", 500);
            }

            assert response.body() != null;
            JsonObject jsonObject = new Gson().fromJson(response.body().string(), JsonObject.class);
            String payUrl = jsonObject.get("payUrl").getAsString();
            String deeplink = jsonObject.get("deeplink").getAsString();
            return PaymentResponse.builder()
                    .paymentMethod(MOMO)
                    .paymentUrl(payUrl)
                    .deepLink(deeplink)
                    .build();
        }
    }

    @Override
    public PaymentResponse createBookingPaymentUrl(
            Transaction transaction,
            BookingRequest request
    ) {
        PaymentMethod paymentMethod = request.getPaymentMethod();
        String pinCode = request.getPinCode();
        boolean mobile = request.isMobile();

        return createPaymentResponse(transaction, paymentMethod, pinCode, mobile);
    }

    @Override
    public PaymentResponse createMedicalTestPaymentUrl(
            Transaction transaction,
            PayMedicalTestRequest request
    ) {
        PaymentMethod paymentMethod = request.getPaymentMethod();
        String pinCode = request.getPinCode();

        return createPaymentResponse(transaction, paymentMethod, pinCode, true);
    }

    @Override
    public PaymentResponse createTopUpWalletPaymentUrl(
            Transaction transaction,
            PaymentMethod paymentMethod
    ) {
        if (paymentMethod != MOMO && paymentMethod != VNPAY)
            throw new BadRequestException("Invalid payment method", 10032);

        return createPaymentResponse(
                transaction,
                paymentMethod,
                null,
                true
        );
    }

    @Override
    public String checkVNPayBookingCallback(Map<String, String> vnpParams) {
        Map<String, String> results = new HashMap<>();
        List<String> keys = vnpParams.keySet().stream().toList();
        for (String key : keys) {
            results.put(
                    URLEncoder.encode(key, StandardCharsets.US_ASCII),
                    URLEncoder.encode(vnpParams.get(key), StandardCharsets.US_ASCII)
            );
        }

        results.remove("vnp_SecureHashType");
        results.remove("vnp_SecureHash");
        String secureHash = VNPayConfig.hashAllFields(results);
        String vnp_SecureHash = vnpParams.get("vnp_SecureHash");

        UUID transactionId = UUID.fromString(vnpParams.get("vnp_OrderInfo").split(":")[1]);

        if (!secureHash.equals(vnp_SecureHash)
                || !vnpParams.get("vnp_ResponseCode").equals("00")
        ) {
            Transaction transaction = updateTransactionAndBooking(
                    transactionId,
                    null,
                    null,
                    TransactionStatus.FAILED
            );
            if (transaction == null)
                return null;

            if (transaction.getOrigin() == null)
                return  "https://the-duck-hospital.web.app/payment-failed";
            return transaction.getOrigin() + "/payment-failed";
        }

        Transaction transaction = updateTransactionAndBooking(
                transactionId,
                vnpParams.get("vnp_BankCode"),
                "VNPAY",
                TransactionStatus.SUCCESS
        );

        if (transaction == null)
            return null;

        if (transaction.getOrigin() == null)
            return "https://the-duck-hospital.web.app/payment-success?transactionId=" + transaction.getTransactionId();

        return transaction.getOrigin() + "/payment-success?transactionId=" + transaction.getTransactionId();
    }

    @Override
    public boolean checkMomoBookingCallback(Map<String, String> params) throws Exception {
        String accessKey = MomoConfig.accessKey;
        String amount = params.get("amount");
        String extraData = params.get("extraData");
        String message = params.get("message");
        String orderId = params.get("orderId");
        String orderInfo = params.get("orderInfo");
        String orderType = params.get("orderType");
        String partnerCode = params.get("partnerCode");
        String payType = params.get("payType");
        String requestId = params.get("requestId");
        String responseTime = params.get("responseTime");
        String resultCode = params.get("resultCode");
        String transId = params.get("transId");
        String signatureFromMomo = params.get("signature");
        UUID transactionId = UUID.fromString(orderId.split(":")[1]);

        String signatureRaw = "accessKey=" + accessKey + "&amount=" + amount + "&extraData=" + extraData
                + "&message=" + message + "&orderId=" + orderId + "&orderInfo=" + orderInfo + "&orderType=" + orderType
                + "&partnerCode=" + partnerCode + "&payType=" + payType + "&requestId=" + requestId
                + "&responseTime=" + responseTime + "&resultCode=" + resultCode + "&transId=" + transId;
        String signature = MomoConfig.hashSignature(signatureRaw, MomoConfig.secretKey);

        if (!signature.equals(signatureFromMomo) || !resultCode.equals("0")) {
            updateTransactionAndBooking(
                    transactionId,
                    null,
                    null,
                    TransactionStatus.FAILED
            );

            return false;
        }

        Transaction transaction = updateTransactionAndBooking(
                transactionId,
                transId,
                "MOMO",
                TransactionStatus.SUCCESS
        );

        return transaction != null;
    }

    private PaymentResponse createPaymentResponse(
            Transaction transaction,
            PaymentMethod paymentMethod,
            String pinCode,
            boolean mobile
    ) {
        try {
            return switch (paymentMethod) {
                case VNPAY ->  vnPayCreatePaymentUrl(
                        transaction.getAmount() + transaction.getFee(),
                        transaction.getTransactionId()
                );
                case MOMO -> momoCreatePaymentUrl(
                        transaction.getAmount() + transaction.getFee(),
                        transaction.getTransactionId(),
                        mobile
                );
                case WALLET -> {
                    if (paymentWithWallet(transaction, pinCode)) {
                        yield PaymentResponse
                                .builder().walletSuccess(true).build();
                    } else {
                        yield PaymentResponse
                                .builder().walletSuccess(false).build();
                    }
                }
                default -> throw new BadRequestException("Invalid payment method");
            };
        } catch (IOException e) {
            throw new StatusCodeException("Can't create payment. Internal Server Error", 500);
        }
    }

    @Override
    @Transactional
    public boolean paymentWithWallet(Transaction transaction, String pinCode) {
        if (pinCode == null || pinCode.isEmpty())
            throw new BadRequestException("Pin code is required", 10031);

        Account account = transaction.getAccount();
        if (!passwordEncoder.matches(pinCode, account.getWalletPin()))
            throw new BadRequestException("Invalid pin code", 10014);
        if (account.getBalance().compareTo(BigDecimal.valueOf(transaction.getAmount())) < 0
                || account.getWalletLocked()
        )
            throw new BadRequestException("Not enough balance", 10030);

        account.setBalance(account.getBalance().subtract(BigDecimal.valueOf(transaction.getAmount())));

        Transaction transactionResult = updateTransactionAndBooking(
                transaction,
                "WALLET",
                "WALLET",
                TransactionStatus.SUCCESS
        );
        if (transactionResult == null)
        {
            throw new StatusCodeException("Internal server error", 500);
        }
        accountServices.saveAccount(account);

        return true;
    }

    private Transaction updateTransactionAndBooking(
            Transaction transaction,
            String bankCode,
            String paymentMethod,
            TransactionStatus status
    ) {
        try {
            if (status == TransactionStatus.FAILED) {
                transaction.setStatus(status);
                transactionRepository.save(transaction);
                return transaction;
            }
            transaction.setStatus(TransactionStatus.SUCCESS);
            transaction.setBankCode(paymentMethod.equals("MOMO") ? "MOMO" : bankCode);
            transaction.setPaymentMethod(paymentMethod == null ? "CASH" : paymentMethod);
            transaction.setMomoTransactionId(paymentMethod.equals("MOMO") ? bankCode : null);
            transactionRepository.save(transaction);

            // Update Booking
            if (transaction.getPaymentType() == PaymentType.BOOKING) {
                List<Booking> bookings = transaction.getBookings();
                for (Booking booking : bookings) {
                    TimeSlot timeSlot = booking.getTimeSlot();

                    booking.setQueueNumber(timeSlot.getStartNumber() + timeSlot.getCurrentSlot());
                    booking.setDeleted(false);
                    bookingRepository.save(booking);

                    timeSlot.setCurrentSlot(timeSlot.getCurrentSlot() + 1);
                    timeSlotRepository.save(timeSlot);
                }
            }
            else if (transaction.getPaymentType() == PaymentType.TOP_UP) {
                Account account = transaction.getAccount();
                account.setBalance(
                        account.getBalance()
                                .add(BigDecimal.valueOf(
                                        transaction.getAmount() - MomoConfig.medicalTestFee
                                )));
                accountServices.saveAccount(account);
            }

            return transaction;
        } catch (Exception e) {
            return null;
        }
    }

    private Transaction updateTransactionAndBooking(
            UUID transactionId,
            String bankCode,
            String paymentMethod,
            TransactionStatus status
    ) {
        Transaction transaction = transactionRepository.findById(transactionId).orElse(null);
        if (transaction == null)
            return null;

        return updateTransactionAndBooking(transaction, bankCode, paymentMethod, status);
    }
}
