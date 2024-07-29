package me.csproconnect.backend.service.otherservice;

import me.csproconnect.backend.model.othermodel.Mark;
//import me.csproconnect.backend.model.othermodel.mark;
import me.csproconnect.backend.repository.otherrepo.MarkRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MarkService {

    @Autowired
    private MarkRepo marksRepository;

    public Mark findByEnrollmentNo(long enrollmentNo) {
        return marksRepository.findByEnrollmentNo(enrollmentNo);
    }

    public void deleteMarks(String id) {
        marksRepository.deleteById(id);
    }

    public Mark save(Mark newMark) {
        return marksRepository.save(newMark);
    }
}
