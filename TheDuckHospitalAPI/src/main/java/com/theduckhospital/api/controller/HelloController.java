package com.theduckhospital.api.controller;

import com.theduckhospital.api.entity.Transaction;
import com.theduckhospital.api.repository.TransactionRepository;
import com.theduckhospital.api.services.ICloudinaryServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Calendar;
import java.util.List;

@RestController
@RequestMapping("/api")
public class HelloController {
    @Autowired
    private ICloudinaryServices cloudinaryServices;

    @Autowired
    private TransactionRepository transactionRepository;

    //Post mapping to upload PDF file
    @PostMapping("/upload")
    public String uploadFile(
             @RequestParam("file") MultipartFile file
    ) {
        return cloudinaryServices.uploadFile(file);
    }

    @GetMapping("/transactions")
    public String changeDateTransaction() {
        List<Transaction> transactions = transactionRepository.findAll();

        for (Transaction transaction : transactions) {
            // Change created date by random from 25/12/2023 to 05/01/2024
            Calendar calendar = Calendar.getInstance();
            calendar.set(2023, Calendar.DECEMBER, 20);

            int maxPlusDays = 16;
            int minPlusDays = 0;
            int randomPlusDays = (int) (Math.random() * (maxPlusDays - minPlusDays + 1) + minPlusDays);

            calendar.add(Calendar.DATE, randomPlusDays);

            transaction.setCreatedAt(calendar.getTime());

            transactionRepository.save(transaction);
        }
        return "Success";
    }

}
