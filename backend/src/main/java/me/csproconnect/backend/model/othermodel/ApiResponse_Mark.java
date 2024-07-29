package me.csproconnect.backend.model.othermodel;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import me.csproconnect.backend.model.facultymodel.FacultyCredentials;
import me.csproconnect.backend.model.facultymodel.FacultyDetails;
import org.springframework.data.annotation.Id;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ApiResponse_Mark {
    private boolean success;
    private String message;
    private Object data;

    public ApiResponse_Mark(boolean success, String message) {
        this.success = success;
        this.message = message;
    }
}
