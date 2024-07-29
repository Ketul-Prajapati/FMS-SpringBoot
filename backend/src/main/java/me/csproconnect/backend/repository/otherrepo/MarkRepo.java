package me.csproconnect.backend.repository.otherrepo;

import me.csproconnect.backend.model.othermodel.Mark;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MarkRepo extends MongoRepository<Mark, String> {
    Mark findByEnrollmentNo(long enrollmentNo);
}
