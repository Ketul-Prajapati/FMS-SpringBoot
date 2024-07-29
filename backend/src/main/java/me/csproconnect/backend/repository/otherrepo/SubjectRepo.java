package me.csproconnect.backend.repository.otherrepo;

import me.csproconnect.backend.model.othermodel.Subject;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface SubjectRepo extends MongoRepository<Subject, String> {
    List<Subject> findBySemester(int semester);

//    List<Subject> findAll();
    Optional<Subject> findByCode(int code);
}
