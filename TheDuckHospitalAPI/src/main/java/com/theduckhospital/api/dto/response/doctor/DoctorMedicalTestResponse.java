package com.theduckhospital.api.dto.response.doctor;

import com.theduckhospital.api.entity.MedicalTest;
import com.theduckhospital.api.entity.Room;
import lombok.Data;

import java.util.UUID;

@Data
public class DoctorMedicalTestResponse {
    private String serviceName;
    private String note;
    private double price;
    private String result;
    private int queueNumber;
    private UUID medicalTestId;
    private String medicalTestCode;
    private int roomId;
    private String roomName;
    private String roomDescription;

    public DoctorMedicalTestResponse(MedicalTest medicalTest) {
        this.serviceName = medicalTest.getMedicalService().getServiceName();
        this.note = medicalTest.getNote();
        this.price = medicalTest.getPrice();
        this.result = medicalTest.getResultFileUrl();
        this.queueNumber = medicalTest.getQueueNumber();
        this.medicalTestId = medicalTest.getMedicalTestId();
        this.medicalTestCode = medicalTest.getMedicalTestCode();

        Room room = medicalTest.getRoom();
        if (room != null) {
            this.roomId = room.getRoomId();
            this.roomName = room.getRoomName();
            this.roomDescription = room.getDescription();
        }
    }
}
