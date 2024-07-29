package me.csproconnect.backend.repository.otherrepo;

import me.csproconnect.backend.model.othermodel.Timetable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TimetableRepo extends MongoRepository<Timetable, String> {
    Timetable findBySemester(int semester);

}
