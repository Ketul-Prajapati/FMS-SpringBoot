package me.csproconnect.backend.repository.facultyrepo;

import me.csproconnect.backend.model.facultymodel.FacultyDetails;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FacultyDetailsRepo extends MongoRepository<FacultyDetails, String> {
    FacultyDetails findByEmployeeId(Long employeeId);
    List<FacultyDetails> findBy_class(String _class);
}

