package com.theduckhospital.api.services.impl;

import com.google.firebase.messaging.FirebaseMessagingException;
import com.theduckhospital.api.constant.NurseType;
import com.theduckhospital.api.constant.Role;
import com.theduckhospital.api.dto.request.ChangePasswordRequest;
import com.theduckhospital.api.dto.request.ForgetPasswordDataRequest;
import com.theduckhospital.api.dto.request.RegisterRequest;
import com.theduckhospital.api.dto.request.UpdateDeviceInfoRequest;
import com.theduckhospital.api.dto.response.CheckTokenResponse;
import com.theduckhospital.api.dto.response.DeviceResponse;
import com.theduckhospital.api.dto.response.admin.AccountResponse;
import com.theduckhospital.api.dto.response.admin.FilteredAccountsResponse;
import com.theduckhospital.api.entity.*;
import com.theduckhospital.api.error.AccessDeniedException;
import com.theduckhospital.api.error.BadRequestException;
import com.theduckhospital.api.error.NotFoundException;
import com.theduckhospital.api.repository.*;
import com.theduckhospital.api.security.JwtTokenProvider;
import com.theduckhospital.api.services.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.*;
import java.util.stream.Collectors;

import static com.theduckhospital.api.constant.Role.*;

@Service
public class AccountServicesImpl implements IAccountServices {
    @Value("${settings.fcm.token}")
    private String fcmToken;
    private final AccountRepository accountRepository;
    private final DoctorScheduleRepository doctorScheduleRepository;
    private final PatientProfileRepository patientProfileRepository;
    private final DoctorRepository doctorRepository;
    private final StaffRepository staffRepository;
    private final PasswordEncoder passwordEncoder;
    private final IOTPServices otpServices;
    private final IFirebaseServices firebaseServices;
    private final TemporaryUserRepository temporaryUserRepository;
    private final IMSGraphServices graphServices;
    private final JwtTokenProvider tokenProvider;
    private final IDeviceServices deviceServices;
    private final ICloudinaryServices cloudinaryServices;

    public AccountServicesImpl(AccountRepository accountRepository,
                               DoctorScheduleRepository doctorScheduleRepository,
                               PatientProfileRepository patientProfileRepository,
                               StaffRepository staffRepository,
                               DoctorRepository doctorRepository,
                               PasswordEncoder passwordEncoder,
                               IOTPServices otpServices,
                               IFirebaseServices firebaseServices,
                               TemporaryUserRepository temporaryUserRepository,
                               IMSGraphServices graphServices,
                               JwtTokenProvider tokenProvider,
                               IDeviceServices deviceServices,
                               ICloudinaryServices cloudinaryServices) {
        this.accountRepository = accountRepository;
        this.passwordEncoder = passwordEncoder;
        this.otpServices = otpServices;
        this.firebaseServices = firebaseServices;
        this.temporaryUserRepository = temporaryUserRepository;
        this.graphServices = graphServices;
        this.tokenProvider = tokenProvider;
        this.doctorScheduleRepository = doctorScheduleRepository;
        this.patientProfileRepository = patientProfileRepository;
        this.staffRepository = staffRepository;
        this.doctorRepository = doctorRepository;
        this.deviceServices = deviceServices;
        this.cloudinaryServices = cloudinaryServices;
    }

    @Override
    public Account findAccount(String emailOrPhone) {
        if (emailOrPhone.contains("@")) {
            return accountRepository.findAccountByEmailAndDeletedIsFalse(emailOrPhone);
        } else {
            return accountRepository.findAccountByPhoneNumberAndDeletedIsFalse(emailOrPhone);
        }
    }

    @Override
    public boolean loginWithPassword(String emailOrPhone, String password) {
        Account account = findAccount(emailOrPhone);

        if (account == null) {
            return false;
        }

        return passwordEncoder.matches(password, account.getPassword());
    }

    @Override
    public boolean loginWithOtp(String emailOrPhone, String otp) {
        Account account = findAccount(emailOrPhone);

        if (account == null) {
            return false;
        }

        int otpNumber = 0;
        try {
            otpNumber = Integer.parseInt(otp);
        } catch (NumberFormatException e) {
            return false;
        }

        return otpServices.verifyOTP(account, otpNumber);
    }

    @Override
    public boolean checkAccountExistAndSendOtp(String emailOrPhone) throws FirebaseMessagingException {
        // Check if account already exist
        Account account = findAccount(emailOrPhone);

        if (account != null)
            return false;

        if (emailOrPhone.contains("@"))
            return true;

        int otp = 0;
        Optional<TemporaryUser> optionalTemporaryUser = temporaryUserRepository
                .findTemporaryUserByPhoneNumber(emailOrPhone);

        // If temporary user already exist, delete it
        optionalTemporaryUser.ifPresent(temporaryUserRepository::delete);

        TemporaryUser temporaryUser = new TemporaryUser();
        temporaryUser.setPhoneNumber(emailOrPhone);

        otp = otpServices.generateOTP(temporaryUser);
        Map<String, String> data = new HashMap<>();
        data.put("phoneNumber", emailOrPhone);
        data.put("message", "Mã xác nhận của bạn là: " + otp);
        firebaseServices.sendNotification(
                fcmToken,
                "OTP",
                "Mã xác nhận của bạn là: " + otp,
                data
        );

        return true;
    }

    @Override
    public Account register(RegisterRequest request) {
        // Check if account already exist
        Account account = findAccount(request.getPhoneNumber());
        if (account != null) {
            throw new BadRequestException("Account already exist");
        }

        // Find temporary user to verify OTP
        TemporaryUser user = temporaryUserRepository.findTemporaryUserByPhoneNumber(request.getPhoneNumber())
                .orElseThrow(() -> new BadRequestException("Invalid request"));

        // Parse OTP to integer. If not valid, throw exception
        int otp = 0;
        try {
            otp = Integer.parseInt(request.getOtp());
        } catch (Exception e) {
            throw new BadRequestException("OTP is not valid");
        }

        // Verify OTP
        boolean isOtpCorrect = otpServices.verifyOTP(user, otp);
        if (!isOtpCorrect) {
            throw new BadRequestException("OTP is not correct");
        }

        // Delete temporary user
        temporaryUserRepository.delete(user);

        // Create new account
        account = new Account();
        account.setPhoneNumber(request.getPhoneNumber());
        account.setPassword(passwordEncoder.encode(request.getPassword()));
        account.setFullName(request.getFullName());
        account.setDeleted(false);

        // Save account to database
        return accountRepository.save(account);
    }

    @Override
    public boolean sendOTP(String emailOrPhone) throws FirebaseMessagingException {
        Account account = findAccount(emailOrPhone);

        if (account == null) {
            return false;
        }

        int otp = otpServices.generateOTP(account);

        if (emailOrPhone.contains("@")) {
            boolean result = graphServices.sendEmail(
                    emailOrPhone,
                    "Mã xác nhận đăng nhập",
                    "Mã xác nhận đăng nhập The Duck Hospital của bạn là: "
                            + otp
            );
            if (!result) {
                throw new BadRequestException("An error occurred while sending email");
            }
        } else {
            Map<String, String> data = new HashMap<>();
            data.put("phoneNumber", emailOrPhone);
            data.put("message", "Mã xác nhận của bạn là: " + otp);
            firebaseServices.sendNotification(
                    fcmToken,
                    "OTP",
                    "Mã xác nhận của bạn là: " + otp,
                    data
            );
        }
        return true;
    }

    @Override
    public CheckTokenResponse checkToken(String token) {
        Account account = null;
        try {
            account = findAccountByToken(token);
        } catch (Exception ignored) {
        }

        if (account == null) {
            return CheckTokenResponse.builder()
                    .valid(false)
                    .role(null)
                    .fullName(null)
                    .balance(null)
                    .build();
        }

        String role = getRoleFromAccount(account);
        NurseType nurseType = null;
        if (Objects.equals(role, "Nurse") || Objects.equals(role, "HeadNurse")) {
            nurseType = ((Nurse) account.getStaff()).getNurseType();
        }
        return CheckTokenResponse.builder()
                .valid(true)
                .role(role)
                .nurseType(nurseType)
                .fullName(account.getFullName())
                .balance(account.getBalance())
                .phoneNumber(account.getPhoneNumber())
                .createdAt(account.getCreatedAt())
                .numberOfProfile(account.getNumberOfProfile())
                .avatar(account.getAvatar())
                .build();
    }

    @Override
    public Account findAccountByToken(String token) {
        token = token.substring(7); // Remove "Bearer " prefix
        boolean isValid = false;
        try {
            isValid = tokenProvider.validateToken(token);
        } catch (Exception ignored) {
        }
        if (!isValid) {
            return null;
        }

        String userId = tokenProvider.getUserIdFromJwt(token);
        Account account = accountRepository
                .findAccountByUserIdAndDeletedIsFalse(
                        UUID.fromString(userId)
                );

        if (account == null) {
            throw new AccessDeniedException("Token is not valid");
        }

        return account;
    }

    @Override
    public Map<String, String> checkInfo(String token) {
        Account account = findAccountByToken(token);
        if (account == null)
            return null;

        String fullName = account.getFullName();
        String role = getRoleFromAccount(account);
        NurseType nurseType = null;
        if (Objects.equals(role, "Nurse") || Objects.equals(role, "HeadNurse")) {
            nurseType = ((Nurse) account.getStaff()).getNurseType();
        }

        Map<String, String> data = new HashMap<>();
        data.put("fullName", fullName);
        data.put("role", role);
        data.put("nurseType", nurseType == null ? null : nurseType.toString());

        return data;
    }

    @Override
    public String otpTest(String phone) {
        try {
            if (phone.contains("@")) {
                Account account = accountRepository.findAccountByEmailAndDeletedIsFalse(phone);
                return String.valueOf(account.getOtp());
            }
            Account account = accountRepository.findUserByPhoneNumber(phone);
            return String.valueOf(account.getOtp());
        } catch (Exception e) {
            Optional<TemporaryUser> temporaryUser = temporaryUserRepository.findTemporaryUserByPhoneNumber(phone);
            return temporaryUser.map(user -> String.valueOf(user.getOtp())).orElse("Not found");
        }

    }

    private String getRoleFromAccount(Account account) {
        String role = "User";
        if (account.getStaff() != null) {
            String[] roleNames = account.getStaff().getClass().getName().split("\\.");
            role = roleNames[roleNames.length - 1];

            if (Objects.equals(role, "Doctor")) {
                if (((Doctor) account.getStaff()).isHeadOfDepartment()) {
                    role = "HeadDoctor";
                }
            } else if (Objects.equals(role, "Nurse")) {
                if (((Nurse) account.getStaff()).isHeadOfDepartment()) {
                    role = "HeadNurse";
                }
            }
        }

        return role;
    }

    @Override
    public FilteredAccountsResponse getPaginationFilteredAccounts(
            String search,
            int page,
            int limit,
            List<Role> accountRole,
            List<Boolean> accountStatus
    ) {
        List<Account> accounts = accountRepository.findByFullNameContainingAndDeletedIn(search, accountStatus);

        List<Account> filteredAccounts = accounts.stream()
                .filter(account -> (accountRole.contains(PATIENT) && account.getStaff() == null)
                        || (accountRole.contains(DOCTOR) && account.getStaff() instanceof Doctor)
                        || (accountRole.contains(NURSE) && account.getStaff() instanceof Nurse)
                        || (accountRole.contains(CASHIER) && account.getStaff() instanceof Cashier)
                        || (accountRole.contains(PHARMACIST) && account.getStaff() instanceof Pharmacist)
                        || (accountRole.contains(LABORATORY_TECHNICIAN) && account.getStaff() instanceof LaboratoryTechnician))
                .collect(Collectors.toList());

        Pageable pageable = PageRequest.of(page, limit);

        int start = (int) pageable.getOffset();
        int end = Math.min((start + pageable.getPageSize()), filteredAccounts.size());
        List<Account> pageContent = filteredAccounts.subList(start, end);

        List<AccountResponse> response = new ArrayList<>();
        for (Account account : pageContent) {
            response.add(new AccountResponse(account));
        }

        return new FilteredAccountsResponse(response, filteredAccounts.size(), page, limit);
    }

    @Override
    public AccountResponse getAccountById(UUID userId) {
        Optional<Account> optional = accountRepository.findById(userId);

        if (optional.isEmpty()) {
            throw new NotFoundException("Account not found");
        }

        return new AccountResponse(optional.get());
    }

    @Override
    public boolean deleteAccount(UUID userID) {
        Optional<Account> optional = accountRepository.findById(userID);
        if (optional.isEmpty() || optional.get().isDeleted()) {
            throw new NotFoundException("Account not found");
        }

        Account account = optional.get();
        account.setDeleted(true);

        Staff staff = account.getStaff();
        if (staff != null) {
            staff.setDeleted(true);
            staffRepository.save(staff);
            if (staff instanceof Doctor) {
                Doctor doctor = ((Doctor) staff);

                if (doctor.isHeadOfDepartment()) {
                    doctor.setHeadOfDepartment(false);
                    doctorRepository.save(doctor);
                }

                List<DoctorSchedule> schedules = ((Doctor) staff).getDoctorSchedules();
                if (!schedules.isEmpty()) {
                    schedules.forEach(schedule -> {
                        schedule.setDeleted(true);
                        doctorScheduleRepository.save(schedule);
                    });
                }
            }
        }

        List<PatientProfile> patientProfile = account.getPatientProfile();
        if (!patientProfile.isEmpty()) {
            patientProfile.forEach(profile -> {
                profile.setDeleted(true);
                patientProfileRepository.save(profile);
            });
        }

        accountRepository.save(account);

        return true;
    }

    @Override
    public AccountResponse restoreAccount(UUID userId) {
        Optional<Account> optional = accountRepository.findById(userId);
        if (optional.isEmpty() || !optional.get().isDeleted()) {
            throw new NotFoundException("Account not found");
        }

        Account account = optional.get();
        account.setDeleted(false);

        Staff staff = account.getStaff();
        if (staff != null) {
            staff.setDeleted(false);
            staffRepository.save(staff);
        }

        List<PatientProfile> patientProfile = account.getPatientProfile();
        if (!patientProfile.isEmpty()) {
            patientProfile.forEach(profile -> {
                profile.setDeleted(false);
                patientProfileRepository.save(profile);
            });
        }

        return new AccountResponse(accountRepository.save(account));
    }

    @Override
    public boolean sendOTPForgetPassword(String phoneNumber) throws FirebaseMessagingException {
        Account account = findAccount(phoneNumber);

        if (account == null) {
            throw new NotFoundException("Account not found" + phoneNumber);
        }

        int otp = otpServices.generateOTP(account);

        Map<String, String> data = new HashMap<>();
        data.put("phoneNumber", phoneNumber);
        data.put("message", "Mã xác nhận của bạn là: " + otp);
        firebaseServices.sendNotification(
                fcmToken,
                "OTP",
                "Mã xác nhận của bạn là: " + otp,
                data
        );

        return true;
    }

    @Override
    public boolean verifyForgetPassword(ForgetPasswordDataRequest request) {
        Account account = findAccount(request.getPhoneNumber());

        int otp;
        try {
            otp = Integer.parseInt(request.getOtp());
        } catch (Exception e) {
            throw new BadRequestException("OTP is not valid");
        }

        if (!otpServices.verifyOTP(account, otp)) {
            throw new BadRequestException("OTP is not valid");
        }

        if (!request.getNewPassword().equals(request.getConfirmNewPassword())) {
            throw new BadRequestException("Password not matched");
        }

        account.setPassword(passwordEncoder.encode(request.getNewPassword()));
        accountRepository.save(account);

        return true;
    }

    @Override
    public boolean changePassword(String token, ChangePasswordRequest request) {
        Account account = findAccountByToken(token);

        if (!request.getNewPassword().equals(request.getConfirmNewPassword())) {
            throw new BadRequestException("Password not matched", 10001);
        }

        if (!passwordEncoder.matches(request.getOldPassword(), account.getPassword())) {
            throw new BadRequestException("Current password is not correct", 10002);
        }

        if (passwordEncoder.matches(request.getNewPassword(), account.getPassword())) {
            throw new BadRequestException("New password is the same as old password", 10003);
        }

        // New password contains least 8 characters, 1 uppercase, 1 lowercase, 1 number and 1 special character
        if (!request.getNewPassword().matches("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$")) {
            throw new BadRequestException("Password is not valid", 10004);
        }

        account.setPassword(passwordEncoder.encode(request.getNewPassword()));
        accountRepository.save(account);

        return true;
    }

    @Override
    public boolean updateDeviceInfo(String token, UpdateDeviceInfoRequest request) {
        Account account = findAccountByToken(token);
        return deviceServices.updateDeviceInfo(request, account, tokenProvider.getTokenIdFromJwt(token.substring(7)));
    }

    @Override
    public boolean logout(String token) {
        String tokenId = tokenProvider.getTokenIdFromJwt(token.substring(7));
        return deviceServices.deleteDeviceJwtToken(tokenId);
    }

    @Override
    public List<DeviceResponse> getDevices(String token) {
        Account account = findAccountByToken(token);
        String tokenId = tokenProvider.getTokenIdFromJwt(token.substring(7));
        return deviceServices.getDevicesByAccount(account, tokenId);
    }

    @Override
    public boolean remoteLogout(String logoutTokenId, String token) {
        Account account = findAccountByToken(token);

        return deviceServices.remoteLogout(account, logoutTokenId);
    }

    @Override
    public boolean remoteLogoutAll(String token) {
        Account account = findAccountByToken(token);
        String tokenId = tokenProvider.getTokenIdFromJwt(token.substring(7));

        return deviceServices.remoteLogoutAll(account, tokenId);
    }

    @Override
    public void saveAccount(Account account) {
        accountRepository.save(account);
    }

    @Override
    public CheckTokenResponse updateProfile(String token, MultipartFile avatar, String fullName) {
        Account account = findAccountByToken(token);
        account.setFullName(fullName);

        if (avatar != null) {
            String avatarUrl = cloudinaryServices.uploadFile(avatar);
            account.setAvatar(avatarUrl);
        }
        accountRepository.save(account);

        return CheckTokenResponse.builder()
                .valid(true)
                .role(getRoleFromAccount(account))
                .fullName(account.getFullName())
                .balance(account.getBalance())
                .phoneNumber(account.getPhoneNumber())
                .createdAt(account.getCreatedAt())
                .numberOfProfile(account.getNumberOfProfile())
                .avatar(account.getAvatar())
                .build();
    }
}
