package me.csproconnect.backend.model.othermodel;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ApiResponse_Notice {
    private boolean success;
    private String message;
    private List<Notice> notices;
    private Notice data;

    public ApiResponse_Notice(boolean success, String message, Notice data) {
        this.success = success;
        this.message = message;
        this.data = data;
    }

    public ApiResponse_Notice(boolean success, String message, List<Notice> notices) {
        this.success = success;
        this.message = message;
        this.notices = notices;
    }

    public ApiResponse_Notice(boolean success, String message) {
        this.success = success;
        this.message = message;
    }
}
