package com.student.predictor.controller;

import com.student.predictor.dto.PerformanceMetricsDTO;
import com.student.predictor.dto.StudentDTO;
import com.student.predictor.entity.PerformanceMetrics;
import com.student.predictor.entity.Student;
import com.student.predictor.repository.StudentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@RestController
@RequestMapping("api/students")
public class StudentController {

    private final StudentRepository studentRepository;

    @PostMapping
    public ResponseEntity<StudentDTO> createStudent(@RequestBody Student student) {
        if (student.getPerformanceMetrics() != null) {
            student.getPerformanceMetrics().setStudent(student); // 🔥 Must set back-reference!
        }

        Student savedStudent = studentRepository.save(student);

        // Convert the saved student to a DTO if needed
        // For example, if you have a StudentDTO class, you can map it here
        StudentDTO studentDTO = new StudentDTO(
                savedStudent.getId(),
                savedStudent.getName(),
                savedStudent.getAge(),
                savedStudent.getGender(),
                new PerformanceMetricsDTO(
                        savedStudent.getPerformanceMetrics().getId(),
                        savedStudent.getPerformanceMetrics().getAttendancePercentage(),
                        savedStudent.getPerformanceMetrics().getAverageTestScore(),
                        savedStudent.getPerformanceMetrics().getBehaviorScore()
                )
        );

        return ResponseEntity.ok(studentDTO);
    }

    @GetMapping
    public ResponseEntity<List<StudentDTO>> getAllStudents() {

        List<Student> students = studentRepository.findAll();
        List<StudentDTO> studentDTOs = students.stream()
                .map(student -> new StudentDTO(
                        student.getId(),
                        student.getName(),
                        student.getAge(),
                        student.getGender(),
                        new PerformanceMetricsDTO(
                                student.getPerformanceMetrics().getId(),
                                student.getPerformanceMetrics().getAttendancePercentage(),
                                student.getPerformanceMetrics().getAverageTestScore(),
                                student.getPerformanceMetrics().getBehaviorScore()
                        )
                ))
                .toList();
        return ResponseEntity.ok(studentDTOs);
    }

    @GetMapping("/{id}")
    public ResponseEntity<StudentDTO> getStudentById(@PathVariable Long id) {
        Optional<Student> student = studentRepository.findById(id);

        if (student.isPresent()) {
            Student savedStudent = student.get();
            StudentDTO studentDTO = new StudentDTO(
                    savedStudent.getId(),
                    savedStudent.getName(),
                    savedStudent.getAge(),
                    savedStudent.getGender(),
                    new PerformanceMetricsDTO(
                            savedStudent.getPerformanceMetrics().getId(),
                            savedStudent.getPerformanceMetrics().getAttendancePercentage(),
                            savedStudent.getPerformanceMetrics().getAverageTestScore(),
                            savedStudent.getPerformanceMetrics().getBehaviorScore()
                    )
            );
            return ResponseEntity.ok(studentDTO);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

}
