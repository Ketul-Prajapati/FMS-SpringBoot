package me.csproconnect.backend.model.adminmodel;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.util.Date;

@Document(collection = "admin details")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class AdminDetails {

    @Id
    private String id;

    @Field("employeeId")
    private Long employeeId;

    @Field("firstName")
    private String firstName;

    @Field("middleName")
    private String middleName;

    @Field("lastName")
    private String lastName;

    @Field("email")
    private String email;

    @Field("phoneNumber")
    private Long phoneNumber;

    @Field("gender")
    private String gender;

    @Field("profile")
    private String profile;

    @Field("timestamp")
    private Date timestamp = new Date();

    private String _class;

}