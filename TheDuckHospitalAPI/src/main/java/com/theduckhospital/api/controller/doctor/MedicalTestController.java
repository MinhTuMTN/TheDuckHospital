package com.theduckhospital.api.controller.doctor;

import com.theduckhospital.api.constant.MedicalTestState;
import com.theduckhospital.api.constant.RoomType;
import com.theduckhospital.api.dto.request.doctor.CompleteMedicalTest;
import com.theduckhospital.api.dto.request.headdoctor.AcceptMedicalTestsRequest;
import com.theduckhospital.api.dto.response.GeneralResponse;
import com.theduckhospital.api.services.IMedicalServiceServices;
import com.theduckhospital.api.services.IMedicalTestServices;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.UUID;

@RestController
@RequestMapping("/api/doctor/medical-tests")
@PreAuthorize("hasAnyRole('ROLE_DOCTOR', 'ROLE_HEAD_DOCTOR', 'ROLE_LABORATORY_TECHNICIAN')")
public class MedicalTestController {
    private final IMedicalServiceServices medicalServiceServices;
    private final IMedicalTestServices medicalTestServices;

    public MedicalTestController(IMedicalServiceServices medicalServiceServices,
                                 IMedicalTestServices medicalTestServices
    ) {
        this.medicalServiceServices = medicalServiceServices;
        this.medicalTestServices = medicalTestServices;
    }

    @GetMapping
    public ResponseEntity<?> getAllMedicalTests() {
        return ResponseEntity.ok(
                GeneralResponse.builder()
                        .success(true)
                        .message("Success")
                        .data(medicalServiceServices.doctorGetAllMedicalTests())
                        .build()
        );
    }

    @GetMapping("/lab-rooms")
    public ResponseEntity<?> getLabRooms(
            @RequestParam(required = false, defaultValue = "LABORATORY_ROOM_NORMAL") RoomType roomType
    ) {
        return ResponseEntity.ok(
                GeneralResponse.builder()
                        .success(true)
                        .message("Success")
                        .data(medicalTestServices.getLabRooms(roomType))
                        .build()
        );
    }

    @GetMapping("/lab-rooms/{roomId}")
    public ResponseEntity<?> getMedicalTestsByRoomId(
            @PathVariable Integer roomId,
            @RequestParam(required = false, defaultValue = "") String search,
            @RequestParam(required = false, defaultValue = "PENDING") MedicalTestState state,
            @RequestParam(required = false, defaultValue = "0") int page,
            @RequestParam(required = false, defaultValue = "5") int size
    ) {
        return ResponseEntity.ok(
                GeneralResponse.builder()
                        .success(true)
                        .message("Success")
                        .data(medicalTestServices.getMedicalTestsByRoomId(
                                roomId,
                                search,
                                state,
                                page,
                                size
                        ))
                        .build()
        );
    }

    @GetMapping("/lab-rooms/{roomId}/next")
    public ResponseEntity<?> getNextQueueNumber(
            @PathVariable Integer roomId
    ) {
        return ResponseEntity.ok(
                GeneralResponse.builder()
                        .success(true)
                        .message("Success")
                        .data(medicalTestServices.getNextQueueNumber(
                                roomId
                        ))
                        .build()
        );
    }

    @GetMapping("/lab-rooms/{roomId}/counter")
    public ResponseEntity<?> getRoomCounter(
            @PathVariable Integer roomId
    ) {
        return ResponseEntity.ok(
                GeneralResponse.builder()
                        .success(true)
                        .message("Success")
                        .data(medicalTestServices.getRoomCounter(
                                roomId
                        ))
                        .build()
        );
    }

    @PutMapping("/{medicalTestId}/accept")
    public ResponseEntity<?> acceptMedicalTest(
            @RequestHeader("Authorization") String authorization,
            @PathVariable UUID medicalTestId
    ) {
        return ResponseEntity.ok(
                GeneralResponse.builder()
                        .success(true)
                        .message("Success")
                        .data(medicalTestServices.acceptMedicalTest(authorization, medicalTestId))
                        .build()
        );
    }

    @GetMapping("/{medicalTestId}")
    public ResponseEntity<?> getMedicalTestRecord(
            @PathVariable UUID medicalTestId
    ) {
        return ResponseEntity.ok(
                GeneralResponse.builder()
                        .success(true)
                        .message("Success")
                        .data(medicalTestServices.getMedicalTestRecordById(medicalTestId))
                        .build()
        );
    }

    @PutMapping("/{medicalTestId}/complete")
    public ResponseEntity<?> CompleteMedicalTest(
            @PathVariable UUID medicalTestId,
            @ModelAttribute("data") CompleteMedicalTest request
            ) throws IOException {
        return ResponseEntity.ok(
                GeneralResponse.builder()
                        .success(true)
                        .message("Success")
                        .data(medicalTestServices.completeMedicalTest(medicalTestId, request))
                        .build()
        );
    }
}
