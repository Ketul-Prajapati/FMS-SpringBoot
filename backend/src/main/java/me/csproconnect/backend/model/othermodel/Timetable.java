package me.csproconnect.backend.model.othermodel;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;
import java.util.List;

@Document(collection = "timetables") // Specify the MongoDB collection name
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Timetable {
    @Id
    private String id;
    private String link;
    private int semester;
    private Date timestamp = new Date();
    private List<Integer> semList;

}
