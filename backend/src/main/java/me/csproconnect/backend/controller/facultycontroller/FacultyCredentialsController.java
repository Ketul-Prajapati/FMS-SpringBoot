package me.csproconnect.backend.controller.facultycontroller;

import me.csproconnect.backend.model.facultymodel.ApiResponse;
import me.csproconnect.backend.model.facultymodel.FacultyCredentials;
import me.csproconnect.backend.service.facultyservice.FacultyCredentialsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/faculty/auth")
public class FacultyCredentialsController {

    @Autowired
    private FacultyCredentialsService facultyService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody FacultyCredentials request) {
        Long loginid = request.getLoginid();
        String password = request.getPassword();
        FacultyCredentials faculty = facultyService.findByLoginid(loginid);
        if (faculty == null || !password.equals(faculty.getPassword())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ApiResponse(false, "Wrong Credentials"));
        }
        return ResponseEntity.ok(new ApiResponse(true, "Login Successful!", faculty.getLoginid(), faculty.getId()));
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody FacultyCredentials faculty) {
        try {
            FacultyCredentials newFaculty = facultyService.registerFaculty(faculty);
            return ResponseEntity.ok(new ApiResponse(true, "Registration Successful!", newFaculty.getLoginid(), newFaculty.getId()));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ApiResponse(false, e.getMessage()));
        }
    }

    @PostMapping("/update/{id}")
    public ResponseEntity<?> update(@PathVariable("id") String id, @RequestBody FacultyCredentials faculty) {
        try {
            FacultyCredentials updatedFaculty = facultyService.updateFaculty(id, faculty);
            return ResponseEntity.ok(new ApiResponse(true, "Updated Successfully!"));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ApiResponse(false, e.getMessage()));
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> delete(@PathVariable("id") String id) {
        facultyService.deleteFaculty(id);
        return ResponseEntity.ok(new ApiResponse(true, "Deleted Successfully!"));
    }
}

