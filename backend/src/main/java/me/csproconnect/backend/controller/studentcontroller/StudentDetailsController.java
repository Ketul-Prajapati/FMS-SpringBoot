package me.csproconnect.backend.controller.studentcontroller;

import me.csproconnect.backend.model.studentmodel.ApiResponse;
import me.csproconnect.backend.model.studentmodel.StudentDetails;
import me.csproconnect.backend.service.studentservice.StudentDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/student/details")
public class StudentDetailsController {

    @Autowired
    private StudentDetailsService studentDetailsService;

    @PostMapping("/getDetails")
    public ResponseEntity<?> getDetails(@RequestBody StudentDetails request) {
        try {
            if (request.getEnrollmentNo() != null) {
                // Request for a specific student's details
                StudentDetails studentDetails = studentDetailsService.findByEnrollmentNo(request.getEnrollmentNo());
                if (studentDetails == null) {
                    return ResponseEntity.ok(new ApiResponse(false, "No Student Found"));
                }
                return ResponseEntity.ok(new ApiResponse(true, "Student Details Found!", studentDetails));
            } else if (request.getClassn() != null) {
                // Request for all students in a class
                List<StudentDetails> studentsInClass = studentDetailsService.findByClassn(request.getClassn());
                if (studentsInClass.isEmpty()) {
                    return ResponseEntity.ok(new ApiResponse(false, "No Students Found in this class"));
                }
                return ResponseEntity.ok(new ApiResponse(true, "Students Found in this class!", studentsInClass));
            } else {
                // Invalid request
                return ResponseEntity.ok(new ApiResponse(false, "Invalid Request"));
            }
        } catch (Exception e) {
            return ResponseEntity.ok(new ApiResponse(false, "Internal Server Error"));
        }
    }


    @PostMapping("/addDetails")
    public ResponseEntity<?> addDetails(@RequestBody StudentDetails studentDetails) {
        try {
            StudentDetails newStudentDetails = studentDetailsService.addStudentDetails(studentDetails);
            return ResponseEntity.ok(new ApiResponse(true, "Student Details Added!", newStudentDetails));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ApiResponse(false, e.getMessage()));
        }
    }

    @PostMapping("/updateDetails/{id}")
    public ResponseEntity<?> updateDetails(@PathVariable("id") String id, @RequestBody StudentDetails studentDetails) {
        try {
            StudentDetails updatedStudentDetails = studentDetailsService.updateStudentDetails(id, studentDetails);
            return ResponseEntity.ok(new ApiResponse(true, "Updated Successfully!", updatedStudentDetails));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ApiResponse(false, e.getMessage()));
        }
    }

    @DeleteMapping("/deleteDetails/{id}")
    public ResponseEntity<?> deleteDetails(@PathVariable("id") String id) {
        studentDetailsService.deleteStudentDetails(id);
        return ResponseEntity.ok(new ApiResponse(true, "Deleted Successfully!"));
    }

    @GetMapping("/count")
    public ResponseEntity<?> getCount() {
        try {
            Long count = studentDetailsService.getCount();
            return ResponseEntity.ok(new ApiResponse(true, "Count Successful!", count));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse(false, "Internal Server Error"));
        }
    }
}

