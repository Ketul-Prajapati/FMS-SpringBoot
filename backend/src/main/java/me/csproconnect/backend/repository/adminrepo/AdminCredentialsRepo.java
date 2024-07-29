package me.csproconnect.backend.repository.adminrepo;

import me.csproconnect.backend.model.adminmodel.AdminCredentials;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AdminCredentialsRepo extends MongoRepository<AdminCredentials, String> {
    AdminCredentials findByLoginid(Long loginid);
}

