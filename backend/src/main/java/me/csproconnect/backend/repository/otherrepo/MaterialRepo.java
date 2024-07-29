package me.csproconnect.backend.repository.otherrepo;

import me.csproconnect.backend.model.othermodel.Material;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MaterialRepo extends MongoRepository<Material, String> {

    List<Material> findBySubject(String subject);
}
