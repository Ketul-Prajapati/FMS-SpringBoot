package me.csproconnect.backend.repository.studentrepo;

import me.csproconnect.backend.model.studentmodel.StudentDetails;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StudentDetailsRepo extends MongoRepository<StudentDetails, String> {
    StudentDetails findByEnrollmentNo(Long enrollmentNo);
    List<StudentDetails> findByClassn(String classn);

}

