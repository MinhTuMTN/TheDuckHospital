package com.theduckhospital.api.services.impl;

import com.theduckhospital.api.constant.DateCommon;
import com.theduckhospital.api.dto.request.nurse.CreateTreatmentMedicineRequest;
import com.theduckhospital.api.dto.request.nurse.InvoiceDetails;
import com.theduckhospital.api.entity.HospitalAdmission;
import com.theduckhospital.api.entity.HospitalizationDetail;
import com.theduckhospital.api.entity.Medicine;
import com.theduckhospital.api.entity.TreatmentMedicine;
import com.theduckhospital.api.error.BadRequestException;
import com.theduckhospital.api.error.NotFoundException;
import com.theduckhospital.api.repository.TreatmentMedicineRepository;
import com.theduckhospital.api.services.IMedicineServices;
import com.theduckhospital.api.services.ITreatmentMedicineServices;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class TreatmentMedicineServicesImpl implements ITreatmentMedicineServices {
    private final TreatmentMedicineRepository treatmentMedicineRepository;
    private final IMedicineServices medicineServices;

    public TreatmentMedicineServicesImpl(
            TreatmentMedicineRepository treatmentMedicineRepository,
            IMedicineServices medicineServices
    ) {
        this.treatmentMedicineRepository = treatmentMedicineRepository;
        this.medicineServices = medicineServices;
    }

    @Override
    public List<TreatmentMedicine> getTreatmentMedicinesByHospitalizationDetail(
            HospitalizationDetail hospitalizationDetail
    ) {
        return treatmentMedicineRepository
                .findByHospitalizationDetailAndDeletedIsFalse(
                        hospitalizationDetail
                );
    }

    @Override
    public List<TreatmentMedicine> createTreatmentMedicinesByHospitalizationDetail(
            HospitalizationDetail hospitalizationDetail,
            CreateTreatmentMedicineRequest request
    ) {
        Medicine medicine = medicineServices.findMedicineById(request.getMedicineId());
        Optional<TreatmentMedicine> treatmentMedicineOptional = treatmentMedicineRepository
                .findByHospitalizationDetailAndMedicineAndDeletedIsFalse(
                        hospitalizationDetail,
                        medicine
                );

        boolean isPresent = treatmentMedicineOptional.isPresent();
        TreatmentMedicine treatmentMedicine = treatmentMedicineOptional
                .orElseGet(TreatmentMedicine::new);

        treatmentMedicine.setHospitalizationDetail(hospitalizationDetail);
        treatmentMedicine.setMedicine(medicine);
        treatmentMedicine.setMedicineName(medicine.getMedicineName());
        treatmentMedicine.setUnit(medicine.getUnit());
        treatmentMedicine.setMedicineId(medicine.getMedicineId());

        int numberOfTimesInADay = 0;
        if (request.isMorning()) {
            numberOfTimesInADay++;
            treatmentMedicine.setMorning(true);
        } else {
            treatmentMedicine.setMorning(false);
        }
        if (request.isAfternoon()) {
            numberOfTimesInADay++;
            treatmentMedicine.setAfternoon(true);
        } else {
            treatmentMedicine.setAfternoon(false);
        }

        if (request.isEvening()) {
            numberOfTimesInADay++;
            treatmentMedicine.setEvening(true);
        } else {
            treatmentMedicine.setEvening(false);
        }
        if (request.isNight()) {
            numberOfTimesInADay++;
            treatmentMedicine.setNight(true);
        } else {
            treatmentMedicine.setNight(false);
        }

        treatmentMedicine.setQuantityPerTime(request.getQuantityPerTime());
        treatmentMedicine.setQuantity(
                request.getQuantityPerTime() * numberOfTimesInADay
        );
        treatmentMedicine.setNote(
                request.getNote()
        );
        treatmentMedicine.setUsageDate(
                hospitalizationDetail.getHospitalizationDate()
        );

        double unitPrice = isPresent ? treatmentMedicine.getUnitPrice() : medicine.getPrice();
        treatmentMedicine.setUnitPrice(
                unitPrice
        );
        treatmentMedicine.setTotalAmount(
                unitPrice * treatmentMedicine.getQuantity()
        );

        treatmentMedicineRepository.save(treatmentMedicine);
        return getTreatmentMedicinesByHospitalizationDetail(
                hospitalizationDetail
        );
    }

    @Override
    public List<TreatmentMedicine> getTreatmentMedicinesByYesterdayHospitalizationDetail(
            HospitalizationDetail yesterdayHospitalizationDetail,
            HospitalizationDetail hospitalizationDetail
    ) {
        List<TreatmentMedicine> yesterdayTreatmentMedicines = getTreatmentMedicinesByHospitalizationDetail(
                yesterdayHospitalizationDetail
        );

        List<TreatmentMedicine> treatmentMedicines = yesterdayTreatmentMedicines
                .stream()
                .filter(treatmentMedicine -> !treatmentMedicine.isDeleteFromTomorrow())
                .map(treatmentMedicine -> {
                    TreatmentMedicine newTreatmentMedicine = new TreatmentMedicine();
                    newTreatmentMedicine.setHospitalizationDetail(hospitalizationDetail);
                    newTreatmentMedicine.setMedicine(treatmentMedicine.getMedicine());
                    newTreatmentMedicine.setMedicineName(treatmentMedicine.getMedicineName());
                    newTreatmentMedicine.setUnit(treatmentMedicine.getUnit());
                    newTreatmentMedicine.setMedicineId(treatmentMedicine.getMedicineId());
                    newTreatmentMedicine.setQuantityPerTime(treatmentMedicine.getQuantityPerTime());
                    newTreatmentMedicine.setQuantity(treatmentMedicine.getQuantity());
                    newTreatmentMedicine.setUnitPrice(treatmentMedicine.getUnitPrice());
                    newTreatmentMedicine.setTotalAmount(treatmentMedicine.getTotalAmount());
                    newTreatmentMedicine.setNote(treatmentMedicine.getNote());
                    newTreatmentMedicine.setMorning(treatmentMedicine.isMorning());
                    newTreatmentMedicine.setAfternoon(treatmentMedicine.isAfternoon());
                    newTreatmentMedicine.setEvening(treatmentMedicine.isEvening());
                    newTreatmentMedicine.setNight(treatmentMedicine.isNight());
                    newTreatmentMedicine.setUsageDate(hospitalizationDetail.getHospitalizationDate());
                    return newTreatmentMedicine;
                })
                .toList();
        treatmentMedicineRepository.saveAll(treatmentMedicines);
        return treatmentMedicines;
    }

    @Override
    public List<TreatmentMedicine> deleteTreatmentMedicine(
            HospitalAdmission hospitalAdmission,
            UUID treatmentMedicineId,
            boolean deleteFromTomorrow
    ) {
        Optional<TreatmentMedicine> treatmentMedicineOptional = treatmentMedicineRepository
                .findByTreatmentMedicineIdAndHospitalizationDetail_HospitalAdmissionAndDeletedIsFalse(
                        treatmentMedicineId,
                        hospitalAdmission
                );
        if (treatmentMedicineOptional.isEmpty()) {
            throw new NotFoundException("Treatment medicine not found");
        }

        TreatmentMedicine treatmentMedicine = treatmentMedicineOptional.get();

        Date hospitalizationDate = treatmentMedicine.getHospitalizationDetail().getHospitalizationDate();
        if (DateCommon.isNotTodayOrYesterday(hospitalizationDate)) {
            throw new BadRequestException(
                    "Cannot delete treatment medicine of the day before yesterday"
            );
        }

        if (deleteFromTomorrow) {
            treatmentMedicine.setDeleteFromTomorrow(true);
        } else {
            treatmentMedicine.setDeleted(true);
        }
        treatmentMedicineRepository.save(treatmentMedicine);
        return getTreatmentMedicinesByHospitalizationDetail(
                treatmentMedicine.getHospitalizationDetail()
        );
    }

    @Override
    public List<InvoiceDetails> getTreatmentMedicineInvoices(HospitalAdmission hospitalAdmission) {
        List<Object[]> treatmentMedicines = treatmentMedicineRepository
                .findTreatmentMedicineForInvoice(hospitalAdmission);

        if (treatmentMedicines.isEmpty()) {
            return List.of();
        }

        return treatmentMedicines
                .stream()
                .map(treatmentMedicine -> {
                    InvoiceDetails invoiceDetails = new InvoiceDetails();
                    invoiceDetails.setServiceName((String) treatmentMedicine[1]);
                    invoiceDetails.setQuantity((Double) treatmentMedicine[2]);
                    invoiceDetails.setUnitPrice((Double) treatmentMedicine[3]);
                    invoiceDetails.setTotal((Double) treatmentMedicine[4]);
                    return invoiceDetails;
                })
                .toList();
    }
}
