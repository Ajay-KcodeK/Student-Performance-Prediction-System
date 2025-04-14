package com.student.predictor.controller;

import com.student.predictor.dto.StudentDTO;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import java.util.Map;

@RestController
@RequestMapping("/api")
public class PredictionController {

    @PostMapping("/predict")
    public ResponseEntity<?> predictStudentPerformance(@RequestBody StudentDTO dto) {
        try {
            // Step 1: Call ML Flask API here
            RestTemplate restTemplate = new RestTemplate();
            String flaskUrl = "http://localhost:5000/predict";

            ResponseEntity<Map> response = restTemplate.postForEntity(flaskUrl, dto, Map.class);
            return ResponseEntity.ok(response.getBody());

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Prediction failed: " + e.getMessage());
        }
    }
}
