package com.theduckhospital.api.services.impl;

import com.google.firebase.messaging.FirebaseMessagingException;
import com.theduckhospital.api.constant.Gender;
import com.theduckhospital.api.dto.request.AddPatientProfileRequest;
import com.theduckhospital.api.dto.request.CreatePatientProfileRequest;
import com.theduckhospital.api.dto.request.FindPatientCodeRequest;
import com.theduckhospital.api.dto.request.SendOTPPatientProfileRequest;
import com.theduckhospital.api.dto.request.nurse.NurseCreatePatientProfileRequest;
import com.theduckhospital.api.dto.request.nurse.NurseUpdatePatientProfileRequest;
import com.theduckhospital.api.dto.response.PatientProfileItemResponse;
import com.theduckhospital.api.dto.response.admin.PatientProfileResponse;
import com.theduckhospital.api.dto.response.nurse.NursePatientProfileItemResponse;
import com.theduckhospital.api.entity.*;
import com.theduckhospital.api.error.BadRequestException;
import com.theduckhospital.api.error.NotFoundException;
import com.theduckhospital.api.error.StatusCodeException;
import com.theduckhospital.api.repository.NationRepository;
import com.theduckhospital.api.repository.PatientProfileRepository;
import com.theduckhospital.api.repository.ProvinceRepository;
import com.theduckhospital.api.repository.WardRepository;
import com.theduckhospital.api.services.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class PatientProfileServicesImpl implements IPatientProfileServices {
    @Value("${settings.fcm.token}")
    private String fcmToken;
    private final IAccountServices accountServices;
    private final NationRepository nationRepository;
    private final WardRepository wardRepository;
    private final ProvinceRepository provinceRepository;
    private final PatientProfileRepository patientProfileRepository;
    private final IPatientServices patientServices;
    private final IOTPServices otpServices;
    private final IFirebaseServices firebaseServices;

    public PatientProfileServicesImpl(
            IAccountServices accountServices,
            NationRepository nationRepository,
            WardRepository wardRepository, ProvinceRepository provinceRepository, PatientProfileRepository patientProfileRepository, IPatientServices patientServices, IOTPServices otpServices, IFirebaseServices firebaseServices) {
        this.accountServices = accountServices;
        this.nationRepository = nationRepository;
        this.wardRepository = wardRepository;
        this.provinceRepository = provinceRepository;
        this.patientProfileRepository = patientProfileRepository;
        this.patientServices = patientServices;
        this.otpServices = otpServices;
        this.firebaseServices = firebaseServices;
    }

    @Override
    public PatientProfile createPatientProfile(
            String token,
            CreatePatientProfileRequest request
    ) {
        Account account = accountServices.findAccountByToken(token);
        Integer numberOfProfile = account.getNumberOfProfile();
        if (numberOfProfile >= 10)
            throw new BadRequestException("Number of patient profile is limited", 10028);

        account.setNumberOfProfile(numberOfProfile + 1);
        accountServices.saveAccount(account);

        Nation nation = null;
        if (request.getNationId() != null) {
            nation = nationRepository.findById(request.getNationId())
                    .orElseThrow(() -> new NotFoundException("Nation not found"));
        }

        Ward ward = wardRepository.findById(request.getWardId())
                .orElseThrow(() -> new NotFoundException("Ward not found"));

        if (request.getGender() != 0 && request.getGender() != 1)
            throw new BadRequestException("Gender not valid");
        Gender gender = Gender.values()[request.getGender()];

        PatientProfile patientProfile = PatientProfile.builder()
                .email(request.getEmail())
                .dateOfBirth(request.getDateOfBirth())
                .fullName(request.getFullName())
                .account(account)
                .identityNumber(request.getIdentityNumber())
                .phoneNumber(request.getPhoneNumber())
                .gender(gender)
                .streetName(request.getStreetName())
                .ward(ward)
                .nation(nation)
                .build();

        return patientProfileRepository.save(patientProfile);
    }

    @Override
    public PatientProfileItemResponse updatePatientProfile(String token, UUID patientProfileId, CreatePatientProfileRequest request) {
        PatientProfile patientProfile = getPatientProfileByTokenAndPatientProfileId(token, patientProfileId);

        Ward ward = wardRepository.findById(request.getWardId())
                .orElseThrow(() -> new NotFoundException("Ward not found"));
        patientProfile.setWard(ward);
        patientProfile.setStreetName(request.getStreetName());

        patientProfile.setEmail(request.getEmail());

        // User not update phone number
        if (request.getPhoneNumber().startsWith("*"))
        {
            String last3Digits = patientProfile.getPhoneNumber().substring(7);
            if (!last3Digits.equals(request.getPhoneNumber().substring(7)))
                throw new StatusCodeException("Phone number not valid", 409);
        } else {
            if (request.getPhoneNumber().length() != 10 || !request.getPhoneNumber().startsWith("0"))
                throw new StatusCodeException("Phone number not valid", 409);
            patientProfile.setPhoneNumber(request.getPhoneNumber());
        }

        // if patient profile is not belong to any patient => allow to update
        if (patientProfile.getPatient() == null) {
            Nation nation = null;
            if (request.getNationId() != null) {
                nation = nationRepository.findById(request.getNationId())
                        .orElseThrow(() -> new NotFoundException("Nation not found"));
            }
            patientProfile.setNation(nation);

            patientProfile.setIdentityNumber(request.getIdentityNumber());
            patientProfile.setFullName(request.getFullName());
            patientProfile.setDateOfBirth(request.getDateOfBirth());

            if (request.getGender() != 0 && request.getGender() != 1)
                throw new BadRequestException("Gender not valid");
            Gender gender = Gender.values()[request.getGender()];
            patientProfile.setGender(gender);
        }

        return new PatientProfileItemResponse(patientProfileRepository.save(patientProfile));
    }

    @Override
    public List<PatientProfileItemResponse> getActivePatientProfile(String token) {
        Account account = accountServices.findAccountByToken(token);


        return patientProfileRepository
                .findPatientProfilesByAccountAndDeletedIsFalse(
                        account
                )
                .stream()
                .map(PatientProfileItemResponse::new).toList();
    }

    @Override
    public boolean deletePatientProfile(String token, UUID patientProfileId) {
        PatientProfile patientProfile = getPatientProfileByTokenAndPatientProfileId(token, patientProfileId);

        patientProfile.setDeleted(true);
        patientProfileRepository.save(patientProfile);

        return true;
    }

    @Override
    public boolean deletePatientProfileAdmin(UUID patientProfileId) {
        Optional<PatientProfile> optional = patientProfileRepository.findById(patientProfileId);

        if(optional.isEmpty())
            throw new NotFoundException("Patient profile not found");

        PatientProfile patientProfile = optional.get();

        patientProfile.setDeleted(true);
        patientProfileRepository.save(patientProfile);

        return true;
    }

    @Override
    public PatientProfile restorePatientProfileAdmin(UUID patientProfileId) {
        Optional<PatientProfile> optional = patientProfileRepository.findById(patientProfileId);

        if(optional.isEmpty())
            throw new NotFoundException("Patient profile not found");

        PatientProfile patientProfile = optional.get();

        patientProfile.setDeleted(false);
        return patientProfileRepository.save(patientProfile);
    }

    public PatientProfile getPatientProfileById(String token, UUID patientProfileId) {
        return getPatientProfileByTokenAndPatientProfileId(token, patientProfileId);
    }

    @Override
    public List<NursePatientProfileItemResponse> searchPatientProfiles(String patientName, String identityNumber) {
        return patientProfileRepository
                .findPatientProfiles(
                        patientName.trim(),
                        identityNumber.trim()
                ).stream()
                .map(NursePatientProfileItemResponse::new)
                .toList();
    }

    @Override
    public NursePatientProfileItemResponse nurseUpdatePatientProfile(NurseUpdatePatientProfileRequest request) {
        PatientProfile patientProfile = patientProfileRepository
                .findById(request.getPatientProfileId()).orElseThrow(
                        () -> new NotFoundException("Patient profile not found")
                );

        if (patientProfile.isDeleted())
            throw new NotFoundException("Patient profile not found");

        patientProfile.setIdentityNumber(request.getIdentityNumber());
        patientProfileRepository.save(patientProfile);

        Patient patient = patientServices.createPatient(
                request.getIdentityNumber(),
                patientProfile
        );
        patientProfile.setPatient(patient);
        patientProfileRepository.save(patientProfile);

        return new NursePatientProfileItemResponse(patientProfile);
    }

    @Override
    public NursePatientProfileItemResponse nurseCreatePatientProfile(NurseCreatePatientProfileRequest request) {
        Nation nation = null;
        if (request.getNationId() != null) {
            nation = nationRepository.findById(request.getNationId())
                    .orElseThrow(() -> new NotFoundException("Nation not found"));
        }

        Ward ward = wardRepository.findById(request.getWardId())
                .orElseThrow(() -> new NotFoundException("Ward not found"));

        if (request.getGender() != Gender.MALE && request.getGender() != Gender.FEMALE)
            throw new BadRequestException("Gender not valid");
        Gender gender = request.getGender();

        PatientProfile patientProfile = PatientProfile.builder()
                .dateOfBirth(request.getDateOfBirth())
                .fullName(request.getFullName())
                .account(null)
                .identityNumber(request.getIdentityNumber())
                .phoneNumber(request.getPhoneNumber())
                .gender(gender)
                .streetName(request.getStreetName())
                .ward(ward)
                .nation(nation)
                .build();

        patientProfileRepository.save(patientProfile);

        Patient patient = patientServices.createPatient(
                request.getIdentityNumber(),
                patientProfile
        );

        patientProfile.setPatient(patient);
        patientProfileRepository.save(patientProfile);

        return new NursePatientProfileItemResponse(patientProfile);
    }

    @Override
    public List<PatientProfileItemResponse> patientSearchByPatientCode(String patientCode) {
        Patient patient = patientServices.findPatientByPatientCode(patientCode);

        return patient.getPatientProfiles()
                .stream()
                .filter(patientProfile -> !patientProfile.isDeleted())
                .map(PatientProfileItemResponse::new)
                .toList();
    }

    @Override
    public PatientProfileItemResponse addPatientProfile(String authorization, AddPatientProfileRequest request) {
        Account account = accountServices.findAccountByToken(authorization);
        Integer numberOfProfile = account.getNumberOfProfile();
        if (numberOfProfile >= 10)
            throw new BadRequestException("Number of patient profile is limited", 10028);

        PatientProfile patientProfile = patientProfileRepository.findById(
                request.getPatientProfileId()
        ).orElseThrow(() -> new BadRequestException("Patient Profile not found", 10006));

        if (patientProfile.isDeleted()
        ) {
            throw new BadRequestException("Patient Profile not found", 10006);
        }

        if (!otpServices.verifyOTP(patientProfile, request.getOtp())) {
            throw new BadRequestException("OTP not valid", 10008);
        }

        account.setNumberOfProfile(numberOfProfile + 1);
        accountServices.saveAccount(account);

        patientProfile.setAccount(account);
        patientProfileRepository.save(patientProfile);

        return new PatientProfileItemResponse(patientProfile);
    }

    @Override
    public List<PatientProfileItemResponse> findPatientCode(FindPatientCodeRequest request) {
        Province province = provinceRepository
                .findById(request.getProvinceId())
                .orElseThrow(() -> new NotFoundException("Province not found"));

        List<PatientProfile> patientProfiles = patientProfileRepository
                .findPatientProfilesByInfo(
                        request.getFullName(),
                        request.getYearOfBirth(),
                        province.getProvinceId(),
                        request.getGender().ordinal()
                );

        return patientProfiles.stream()
                .filter(patientProfile -> !patientProfile.isDeleted())
                .map(PatientProfileItemResponse::new)
                .toList();
    }

    @Override
    public boolean sendOTP(SendOTPPatientProfileRequest request) {
        PatientProfile patientProfile = patientProfileRepository
                .findById(request.getPatientProfileId())
                .orElseThrow(() -> new BadRequestException("Patient profile not found", 10006));

        if (patientProfile.isDeleted())
            throw new BadRequestException("Patient profile not found", 10006);

        if (!patientProfile.getPhoneNumber().equals(request.getPhoneNumber()))
            throw new BadRequestException("Phone number not valid", 10007);

        int otp = otpServices.generateOTP(patientProfile);
        Map<String, String> data = new HashMap<>();
        data.put("phoneNumber", patientProfile.getPhoneNumber());
        data.put("message", "Mã xác nhận của bạn là: " + otp);
        try {
            firebaseServices.sendNotification(
                    fcmToken,
                    "OTP",
                    "Mã xác nhận của bạn là: " + otp,
                    data
            );
        } catch (FirebaseMessagingException ignored) {
            // Ignore because this is not implement in test
        }

        return true;
    }


    private PatientProfile getPatientProfileByTokenAndPatientProfileId(String token, UUID patientProfileId) {
        Account account = accountServices.findAccountByToken(token);

        PatientProfile patientProfile = patientProfileRepository
                .findById(patientProfileId)
                .orElseThrow(() -> new NotFoundException("Patient profile not found"));

        if (!patientProfile.getAccount().getUserId().equals(account.getUserId()))
            throw new BadRequestException("Patient profile not belong to this account");
        else if (patientProfile.isDeleted()) {
            throw new NotFoundException("Patient profile not found");
        }
        return patientProfile;
    }

    @Override
    public PatientProfileResponse getPatientProfileByIdAdmin(UUID patientProfileId) {
        Optional<PatientProfile> optional = patientProfileRepository.findById(patientProfileId);

        if(optional.isEmpty())
            throw new NotFoundException("Patient profile not found");

        PatientProfile patientProfile = optional.get();

        return new PatientProfileResponse(patientProfile);
    }
}
