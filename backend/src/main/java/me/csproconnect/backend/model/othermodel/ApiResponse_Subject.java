package me.csproconnect.backend.model.othermodel;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ApiResponse_Subject {
    private boolean success;
    private String message;
    private Object data;

    public ApiResponse_Subject(boolean success, String message) {
        this.success = success;
        this.message = message;
    }
}
