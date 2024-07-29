package me.csproconnect.backend.model.facultymodel;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import me.csproconnect.backend.model.adminmodel.AdminCredentials;
import me.csproconnect.backend.model.adminmodel.AdminDetails;
import org.springframework.data.annotation.Id;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ApiResponse {
    @Id
    private boolean success;
    private String message;
    private FacultyCredentials facultyc;
    private FacultyDetails facultyd;
    private List<FacultyDetails> lfacultyd;
    private Long loginid;
    private String id;
    private Long c;

    public ApiResponse(boolean success, String message, Long loginid, String id) {
        this.success = success;
        this.message = message;
        this.loginid = loginid;
        this.id = id;
    }
    public ApiResponse(boolean success, String message, Long c) {
        this.success = success;
        this.message = message;
        this.c = c;
    }

    public ApiResponse(boolean success, String id) {
        this.success = success;
        this.id = id;
    }

    public ApiResponse(boolean success, Long loginid, String id) {
        this.success = success;
        this.loginid = loginid;
        this.id = id;
    }

    public ApiResponse(boolean success, String message, FacultyCredentials facultyc) {
        this.success = success;
        this.message = message;
        this.facultyc = facultyc;
    }
    public ApiResponse(boolean success, String message, List<FacultyDetails> lfacultyd) {
        this.success = success;
        this.message = message;
        this.lfacultyd = lfacultyd;
    }
    public ApiResponse(boolean success, String message, FacultyDetails facultyd) {
        this.success = success;
        this.message = message;
        this.facultyd = facultyd;
    }
}
