package me.csproconnect.backend.service.facultyservice;

import me.csproconnect.backend.model.facultymodel.FacultyCredentials;
import me.csproconnect.backend.repository.facultyrepo.FacultyCredentialsRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class FacultyCredentialsService {

    @Autowired
    private FacultyCredentialsRepo facultyRepository;

    public FacultyCredentials findByLoginid(Long loginid) {
        return facultyRepository.findByLoginid(loginid);
    }

    public FacultyCredentials registerFaculty(FacultyCredentials faculty) {
        if (facultyRepository.findByLoginid(faculty.getLoginid()) != null) {
            throw new RuntimeException("User with this login ID already exists");
        }
        return facultyRepository.save(faculty);
    }

    public FacultyCredentials updateFaculty(String id, FacultyCredentials faculty) {
        if (!facultyRepository.existsById(id)) {
            throw new RuntimeException("No faculty found with this ID");
        }
        faculty.setId(id);
        return facultyRepository.save(faculty);
    }

    public void deleteFaculty(String id) {
        facultyRepository.deleteById(id);
    }
}

