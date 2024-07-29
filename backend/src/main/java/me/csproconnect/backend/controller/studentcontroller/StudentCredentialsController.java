package me.csproconnect.backend.controller.studentcontroller;

import me.csproconnect.backend.model.studentmodel.ApiResponse;
import me.csproconnect.backend.model.studentmodel.StudentCredentials;
import me.csproconnect.backend.service.studentservice.StudentCredentialsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/student/auth")
public class StudentCredentialsController {

    @Autowired
    private StudentCredentialsService studentService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody StudentCredentials request) {
        Long loginid = request.getLoginid();
        String password = request.getPassword();
        StudentCredentials student = studentService.findByLoginid(loginid);
        if (student == null || !password.equals(student.getPassword())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ApiResponse(false, "Wrong Credentials"));
        }
        return ResponseEntity.ok(new ApiResponse(true, "Login Successful!", student.getLoginid(), student.getId()));
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody StudentCredentials student) {
        try {
            StudentCredentials newStudent = studentService.registerStudent(student);
            return ResponseEntity.ok(new ApiResponse(true, "Registration Successful!", newStudent.getLoginid(), newStudent.getId()));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ApiResponse(false, e.getMessage()));
        }
    }

    @PostMapping("/update/{id}")
    public ResponseEntity<?> update(@PathVariable("id") String id, @RequestBody StudentCredentials student) {
        try {
            StudentCredentials updatedStudent = studentService.updateStudent(id, student);
            return ResponseEntity.ok(new ApiResponse(true, "Updated Successfully!"));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ApiResponse(false, e.getMessage()));
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> delete(@PathVariable("id") String id) {
        studentService.deleteStudent(id);
        return ResponseEntity.ok(new ApiResponse(true, "Deleted Successfully!"));
    }
}

