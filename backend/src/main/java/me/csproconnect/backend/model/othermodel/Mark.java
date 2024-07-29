package me.csproconnect.backend.model.othermodel;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;
import java.util.Map;

@Document(collection = "marks") // Specify the MongoDB collection name
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Mark {
    @Id
    private String id;
    private long enrollmentNo;
    private Map<String, Integer> internal;
    private Map<String, Integer> external;
    private Date timestamp;
}
