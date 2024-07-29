package me.csproconnect.backend.controller.admincontroller;

import me.csproconnect.backend.model.adminmodel.AdminCredentials;
import me.csproconnect.backend.model.adminmodel.ApiResponse;
import me.csproconnect.backend.service.adminservice.AdminCredentialsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/admin/auth")
public class AdminCredentialsController {

    @Autowired
    private AdminCredentialsService adminService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AdminCredentials request) {
        Long loginid = request.getLoginid();
        String password = request.getPassword();
        AdminCredentials admin = adminService.findByLoginid(loginid);
        if (admin == null || !password.equals(admin.getPassword())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ApiResponse(false, "Wrong Credentials"));
        }
        return ResponseEntity.ok(new ApiResponse(true, "Login Successful!", admin.getLoginid(), admin.getId()));
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody AdminCredentials admin) {
        try {
            AdminCredentials newAdmin = adminService.registerAdmin(admin);
            return ResponseEntity.ok(new ApiResponse(true, "Registration Successful!", newAdmin.getLoginid(), newAdmin.getId()));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ApiResponse(false, e.getMessage()));
        }
    }

    @PostMapping("/update/{id}")
    public ResponseEntity<?> update(@PathVariable("id") String id, @RequestBody AdminCredentials admin) {
        try {
            AdminCredentials updatedAdmin = adminService.updateAdmin(id, admin);
            return ResponseEntity.ok(new ApiResponse(true, "Updated Successfully!"));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ApiResponse(false, e.getMessage()));
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> delete(@PathVariable("id") String id) {
        adminService.deleteAdmin(id);
        return ResponseEntity.ok(new ApiResponse(true, "Deleted Successfully!"));
    }
}
