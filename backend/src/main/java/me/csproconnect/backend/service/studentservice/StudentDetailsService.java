package me.csproconnect.backend.service.studentservice;

import me.csproconnect.backend.model.studentmodel.StudentDetails;
import me.csproconnect.backend.repository.studentrepo.StudentDetailsRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StudentDetailsService {

    @Autowired
    private StudentDetailsRepo studentDetailsRepository;

    public StudentDetails findByEnrollmentNo(Long enrollmentNo) {
        return studentDetailsRepository.findByEnrollmentNo(enrollmentNo);
    }
    public List<StudentDetails> findByClassn(String classn) {
        return studentDetailsRepository.findByClassn(classn);
    }

    public StudentDetails addStudentDetails(StudentDetails studentDetails) {
        if (studentDetailsRepository.findByEnrollmentNo(studentDetails.getEnrollmentNo()) != null) {
            throw new RuntimeException("Student with this enrollment number already exists");
        }
        return studentDetailsRepository.save(studentDetails);
    }

    public StudentDetails updateStudentDetails(String id, StudentDetails studentDetails) {
        if (!studentDetailsRepository.existsById(id)) {
            throw new RuntimeException("No student details found with this ID");
        }
        studentDetails.setId(id);
        return studentDetailsRepository.save(studentDetails);
    }

    public void deleteStudentDetails(String id) {
        studentDetailsRepository.deleteById(id);
    }

    public Long getCount() {
        return studentDetailsRepository.count();
    }
}

