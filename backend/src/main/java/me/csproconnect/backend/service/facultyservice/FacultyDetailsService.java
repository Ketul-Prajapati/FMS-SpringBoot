package me.csproconnect.backend.service.facultyservice;

import me.csproconnect.backend.model.facultymodel.FacultyDetails;
import me.csproconnect.backend.repository.facultyrepo.FacultyDetailsRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FacultyDetailsService {

    @Autowired
    private FacultyDetailsRepo facultyRepository;

    public FacultyDetails findByEmployeeId(Long employeeId) {
        return facultyRepository.findByEmployeeId(employeeId);
    }
    public List<FacultyDetails> findBy_class(String _class) {
        return facultyRepository.findBy_class(_class);
    }

    public FacultyDetails addFaculty(FacultyDetails faculty) {
        if (facultyRepository.findByEmployeeId(faculty.getEmployeeId()) != null) {
            throw new RuntimeException("Faculty with this employee ID already exists");
        }
        return facultyRepository.save(faculty);
    }

    public FacultyDetails updateFaculty(String id, FacultyDetails faculty) {
        if (!facultyRepository.existsById(id)) {
            throw new RuntimeException("No faculty found with this ID");
        }
        faculty.setId(id);
        return facultyRepository.save(faculty);
    }

    public void deleteFaculty(String id) {
        facultyRepository.deleteById(id);
    }

    public Long countFaculties() {
        return facultyRepository.count();
    }
}
