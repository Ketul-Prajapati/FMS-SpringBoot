package me.csproconnect.backend.model.studentmodel;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ApiResponse {
    @Id
    private boolean success;
    private String message;
    private StudentCredentials studentc;
    private StudentDetails studentd;
    private List<StudentDetails> studentsInClass;
    private Long loginid;
    private String id;
    private Long c;

    public ApiResponse(boolean success, String message, List<StudentDetails> studentsInClass) {
        this.success = success;
        this.message = message;
        this.studentsInClass = studentsInClass;
    }

    public ApiResponse(boolean success, String message, Long c) {
        this.success = success;
        this.message = message;
        this.c = c;
    }

    public ApiResponse(boolean success, String message, StudentDetails studentd) {
        this.success = success;
        this.message = message;
        this.studentd = studentd;
    }

    public ApiResponse(boolean success, String message, Long loginid, String id) {
        this.success = success;
        this.message = message;
        this.loginid = loginid;
        this.id = id;
    }

    public ApiResponse(boolean success, String id) {
        this.success = success;
        this.id = id;
    }
}
