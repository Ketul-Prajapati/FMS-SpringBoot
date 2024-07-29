package me.csproconnect.backend.model.othermodel;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Document(collection = "materials") // Specify the MongoDB collection name
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Material {
    @Id
    private String id;
    private String faculty;
    private String link;
    private String subject;
    private String title;
    private Date timestamp;
}
