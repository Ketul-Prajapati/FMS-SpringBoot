package me.csproconnect.backend.model.othermodel;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Document(collection = "subjects") // Specify the MongoDB collection name
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Subject {
    @Id
    private String id;
    private String name;
    private int code;
    private Date timestamp;
    private int semester;
}
