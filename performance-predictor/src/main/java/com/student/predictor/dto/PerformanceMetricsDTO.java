package com.student.predictor.dto;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class PerformanceMetricsDTO {
    // Getters and Setters
    private Long id;
    private double attendancePercentage;
    private double averageTestScore;
    private int behaviorScore;

    // Constructors
    public PerformanceMetricsDTO(Long id, double attendancePercentage, double averageTestScore, int behaviorScore) {
        this.id = id;
        this.attendancePercentage = attendancePercentage;
        this.averageTestScore = averageTestScore;
        this.behaviorScore = behaviorScore;
    }

}
