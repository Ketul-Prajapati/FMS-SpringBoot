package me.csproconnect.backend.repository.facultyrepo;

import me.csproconnect.backend.model.facultymodel.FacultyCredentials;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FacultyCredentialsRepo extends MongoRepository<FacultyCredentials, String> {
    FacultyCredentials findByLoginid(Long loginid);
}

