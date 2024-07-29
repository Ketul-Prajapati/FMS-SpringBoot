package me.csproconnect.backend.repository.adminrepo;

import me.csproconnect.backend.model.adminmodel.AdminDetails;
import me.csproconnect.backend.model.facultymodel.FacultyDetails;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AdminDetailsRepo extends MongoRepository<AdminDetails, String> {

    AdminDetails findByEmployeeId(Long employeeId);
    List<AdminDetails> findBy_class(String _class);
}
