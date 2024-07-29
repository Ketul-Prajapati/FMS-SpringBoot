package me.csproconnect.backend.service.adminservice;

import me.csproconnect.backend.controller.admincontroller.AdminCredentialsController;
import me.csproconnect.backend.model.adminmodel.AdminCredentials;
import me.csproconnect.backend.repository.adminrepo.AdminCredentialsRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AdminCredentialsService {

    @Autowired
    private AdminCredentialsRepo adminRepository;

    public AdminCredentials findByLoginid(Long loginid) {
        return adminRepository.findByLoginid(loginid);
    }

    public AdminCredentials registerAdmin(AdminCredentials admin) {
        if (adminRepository.findByLoginid(admin.getLoginid()) != null) {
            throw new RuntimeException("Admin with this login ID already exists");
        }
        return adminRepository.save(admin);
    }

    public AdminCredentials updateAdmin(String id, AdminCredentials admin) {
        if (!adminRepository.existsById(id)) {
            throw new RuntimeException("No admin found with this ID");
        }
        admin.setId(id);
        return adminRepository.save(admin);
    }

    public void deleteAdmin(String id) {
        adminRepository.deleteById(id);
    }
}
