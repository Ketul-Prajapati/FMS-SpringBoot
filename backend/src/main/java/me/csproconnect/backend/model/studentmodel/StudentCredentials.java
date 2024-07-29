package me.csproconnect.backend.model.studentmodel;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Document(collection = "student credentials") // Specify the MongoDB collection name
@Data
@NoArgsConstructor
@AllArgsConstructor
public class StudentCredentials {
    @Id
    private String id;
    private Long loginid;
    private String password;
    private Date timestamp;
}

