package com.student.predictor.repository;

import com.student.predictor.entity.PerformanceMetrics;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PerformanceMetricsRepository extends JpaRepository<PerformanceMetrics, Long> {
    // Custom query methods can be defined here if needed
    // For example, findByAttendancePercentage, findByAverageTestScore, etc.
}
