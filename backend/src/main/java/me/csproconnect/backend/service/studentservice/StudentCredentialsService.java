package me.csproconnect.backend.service.studentservice;

import me.csproconnect.backend.model.studentmodel.StudentCredentials;
import me.csproconnect.backend.repository.studentrepo.StudentCredentialsRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class StudentCredentialsService {

    @Autowired
    private StudentCredentialsRepo studentRepository;

    public StudentCredentials findByLoginid(Long loginid) {
        return studentRepository.findByLoginid(loginid);
    }

    public StudentCredentials registerStudent(StudentCredentials student) {
        if (studentRepository.findByLoginid(student.getLoginid()) != null) {
            throw new RuntimeException("User with this login ID already exists");
        }
        return studentRepository.save(student);
    }

    public StudentCredentials updateStudent(String id, StudentCredentials student) {
        if (!studentRepository.existsById(id)) {
            throw new RuntimeException("No student found with this ID");
        }
        student.setId(id);
        return studentRepository.save(student);
    }

    public void deleteStudent(String id) {
        studentRepository.deleteById(id);
    }
}

