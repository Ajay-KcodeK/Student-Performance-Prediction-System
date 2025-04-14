package com.student.predictor.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class PerformanceMetrics {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private double attendancePercentage;
    private double averageTestScore;
    private int behaviorScore; // 1-10

    @OneToOne
    @JoinColumn(name = "student_id")
    private Student student;
}
