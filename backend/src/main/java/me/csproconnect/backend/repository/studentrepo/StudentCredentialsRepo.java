package me.csproconnect.backend.repository.studentrepo;

import me.csproconnect.backend.model.studentmodel.StudentCredentials;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StudentCredentialsRepo extends MongoRepository<StudentCredentials, String> {
    StudentCredentials findByLoginid(Long loginid);
}

