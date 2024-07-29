package me.csproconnect.backend.model.othermodel;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;
import java.util.List;

@Document(collection = "notices") // Specify the MongoDB collection name
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Notice {
    @Id
    private String id;
    private String title;
    private String description;
    private String type;
    private String link;
    private Date timestamp = new Date();
    private List<String> typelist;
}
