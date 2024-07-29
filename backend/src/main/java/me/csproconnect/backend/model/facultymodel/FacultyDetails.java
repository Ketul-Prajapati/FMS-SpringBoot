package me.csproconnect.backend.model.facultymodel;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.Date;

@Document(collection = "faculty details") // Specify the MongoDB collection name
@Data
@NoArgsConstructor
@AllArgsConstructor
public class FacultyDetails {
    @Id
    private String id;
    private Long employeeId;
    private String firstName;
    private String middleName;
    private String lastName;
    private String email;
    private Long phoneNumber;
    private String gender;
    private int experience;
    private String post;
    private String profile;
    private Date timestamp;
    private String _class;

}
