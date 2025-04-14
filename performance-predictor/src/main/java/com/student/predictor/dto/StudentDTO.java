package com.student.predictor.dto;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class StudentDTO {
    // Getters and Setters
    private Long id;
    private String name;
    private int age;
    private String gender;
    private PerformanceMetricsDTO performanceMetrics;

    // Constructors
    public StudentDTO(Long id, String name, int age, String gender, PerformanceMetricsDTO performanceMetrics) {
        this.id = id;
        this.name = name;
        this.age = age;
        this.gender = gender;
        this.performanceMetrics = performanceMetrics;
    }

}
