package com.theduckhospital.api.dto.response.doctor;

import com.theduckhospital.api.entity.MedicalTest;
import com.theduckhospital.api.entity.Room;
import lombok.Data;

import java.util.Date;
import java.util.UUID;

@Data
public class DoctorMedicalTestResponse {
    private String serviceName;
    private String note;
    private Date date;
    private Date createdDate;
    private double price;
    private String result;
    private String testResult;
    private int queueNumber;
    private UUID medicalTestId;
    private String medicalTestCode;
    private int roomId;
    private String roomName;
    private String roomDescription;

    public DoctorMedicalTestResponse(MedicalTest medicalTest) {
        this.serviceName = medicalTest.getMedicalService().getServiceName();
        this.note = medicalTest.getNote();
        this.date = medicalTest.getDate();
        this.createdDate = medicalTest.getCreatedDate();
        this.price = medicalTest.getPrice();
        this.testResult = medicalTest.getTestResult();
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
