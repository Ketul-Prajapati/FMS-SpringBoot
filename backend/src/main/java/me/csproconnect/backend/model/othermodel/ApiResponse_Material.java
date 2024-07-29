package me.csproconnect.backend.model.othermodel;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ApiResponse_Material {
    private boolean success;
    private String message;
    private Object material;

    public ApiResponse_Material(boolean success, String message) {
        this.success = success;
        this.message = message;
    }
}
