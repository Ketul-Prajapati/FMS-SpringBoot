package me.csproconnect.backend.repository.otherrepo;

import me.csproconnect.backend.model.othermodel.Notice;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NoticeRepo extends MongoRepository<Notice, String> {
    List<Notice> findByType(String type);
}
