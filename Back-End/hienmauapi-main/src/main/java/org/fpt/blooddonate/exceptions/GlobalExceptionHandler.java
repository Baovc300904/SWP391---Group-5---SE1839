package org.fpt.blooddonate.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<?> handleValidationException(MethodArgumentNotValidException ex) {
        List<Map<String, String>> errors = ex.getBindingResult()
            .getFieldErrors()
            .stream()
            .map(error -> Map.of(
                    "field", error.getField(),
                    "message", error.getDefaultMessage()
            ))
            .toList();

        return ResponseEntity
            .status(HttpStatus.BAD_REQUEST)
            .body(Map.of("errors", errors));
    }

    @ExceptionHandler(ResponseStatusException.class)
    public ResponseEntity<?> handleResponseStatusException(ResponseStatusException ex) {
        return ResponseEntity
            .status(ex.getStatusCode())
            .body(Map.of(
                    "status", ex.getStatusCode().value(),
                    "message", ex.getReason() != null ? ex.getReason() : "Unexpected error"
            ));
    }
}
