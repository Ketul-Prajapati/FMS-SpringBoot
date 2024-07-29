package me.csproconnect.backend.model.othermodel;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ApiResponse_Timetable {
    private boolean success;
    private String message;
    private List<Timetable> timetable;
    private Timetable data;

    public ApiResponse_Timetable(boolean success, String message, List<Timetable> timetable) {
        this.success = success;
        this.message = message;
        this.timetable = timetable;
    }

    public ApiResponse_Timetable(boolean success, String message, Timetable data) {
        this.success = success;
        this.message = message;
        this.data = data;
    }

    public ApiResponse_Timetable(boolean success, String message) {
        this.success = success;
        this.message = message;
    }
}
