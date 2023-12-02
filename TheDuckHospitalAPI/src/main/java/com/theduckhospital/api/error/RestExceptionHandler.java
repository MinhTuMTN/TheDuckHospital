package com.theduckhospital.api.error;

import com.theduckhospital.api.dto.request.GeneralResponse;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestControllerAdvice
public class RestExceptionHandler extends ResponseEntityExceptionHandler {

    @Override
    protected ResponseEntity<Object> handleMethodArgumentNotValid(MethodArgumentNotValidException ex,
                                                                  HttpHeaders headers,
                                                                  HttpStatusCode status,
                                                                  WebRequest request) {
        List<ObjectError> details = ex.getBindingResult().getAllErrors();
        Map<String, String> errors = new HashMap<>();
        details.forEach((error) ->{
            String fieldName = ((FieldError) error).getField();
            String message = error.getDefaultMessage();
            errors.put(fieldName, message);
        });
        GeneralResponse genericResponse = GeneralResponse.builder()
                .success(false)
                .message("Validation failed for argument")
                .data(errors)
                .build();
        return new ResponseEntity<>(genericResponse ,HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<?> handleIllegalArgumentException(IllegalArgumentException e) {
        return ResponseEntity.badRequest().body(GeneralResponse.builder()
                .success(false)
                .message("Bad request. Please check your request again!")
                .build());
    }

    @ExceptionHandler(BadRequestException.class)
    public ResponseEntity<?> handleBadRequestException(BadRequestException e) {
        return ResponseEntity.badRequest().body(GeneralResponse.builder()
                .success(false)
                .message(e.getMessage())
                .build());
    }

    @ExceptionHandler(NotFoundException.class)
    public ResponseEntity<?> handleNotFoundException(NotFoundException e) {
        return ResponseEntity.status(404).body(GeneralResponse.builder()
                .success(false)
                .message(e.getMessage())
                .build());
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<?> handleException(Exception e) {
        return ResponseEntity.status(500).body(GeneralResponse.builder()
                .success(false)
                .message("Internal server error")
                .build());
    }
}
