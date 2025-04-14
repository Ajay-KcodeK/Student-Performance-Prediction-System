package com.student.predictor.repository;

import com.student.predictor.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StudentRepository extends JpaRepository<Student, Long> {
    // Custom query methods can be defined here if needed
    // For example, findByName, findByAge, etc.
}
