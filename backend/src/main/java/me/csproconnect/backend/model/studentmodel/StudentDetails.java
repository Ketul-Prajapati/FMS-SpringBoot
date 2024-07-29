package me.csproconnect.backend.model.studentmodel;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.util.Date;

@Document(collection = "student details") // Specify the MongoDB collection name
@Data
@NoArgsConstructor
@AllArgsConstructor
public class StudentDetails {
    @Id
    private String id;
    private Long enrollmentNo;
    private String firstName;
    private String middleName;
    private String lastName;
    private String email;
    private Long phoneNumber;
    private String classn; // here "class" can not be used as it is reserved
    private String gender;
    private Date timestamp;
}

