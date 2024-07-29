package me.csproconnect.backend.service.otherservice;

import me.csproconnect.backend.model.othermodel.Subject;
import me.csproconnect.backend.repository.otherrepo.SubjectRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class SubjectService {

    @Autowired
    private SubjectRepo subjectRepository;


    public List<Subject> getSubjectsBySemester(int semester) {
        return subjectRepository.findBySemester(semester);
    }

//    public List<Subject> getSubjects() {
//        return subjectRepository.findAll();
//    }

    public List<Subject> allSubjects(){
        return subjectRepository.findAll();
    }

    public Optional<Subject> findByCode(int code) {
        return subjectRepository.findByCode(code);
    }

    public Subject save(Subject subjectRequest) {
        Subject subject = new Subject();
        subject.setName(subjectRequest.getName());
        subject.setCode(subjectRequest.getCode());
        subject.setSemester(subjectRequest.getSemester());
        return subjectRepository.save(subject);
    }

    public Optional<Subject> findById(String id) {
        return subjectRepository.findById(id);
    }

    public void deleteById(String id) {
        subjectRepository.deleteById(id);
    }
}
