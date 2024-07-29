package me.csproconnect.backend.controller.othercontroller;

import me.csproconnect.backend.model.othermodel.ApiResponse_Material;
import me.csproconnect.backend.model.othermodel.Material;
import me.csproconnect.backend.service.otherservice.MaterialService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/material")
public class MaterialController {

    @Autowired
    private MaterialService materialService;

    @PostMapping("/getMaterial")
    public ResponseEntity<?> getMaterialBySubject(@RequestBody Material request) {
        String subject = request.getSubject();
        List<Material> materials = materialService.getMaterialsBySubject(subject);
        if (materials.isEmpty()) {
            return ResponseEntity.ok(new ApiResponse_Material(false, "No Material Available!"));
        }
        return ResponseEntity.ok(new ApiResponse_Material(true, "Materials Found!", materials));
    }

    @PostMapping("/addMaterial")
    public ResponseEntity<?> addMaterial(@RequestBody Material material) {
        Material addedMaterial = materialService.addMaterial(material);
        if (addedMaterial != null) {
            return ResponseEntity.ok(new ApiResponse_Material(true, "Material Added!", addedMaterial));
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse_Material(false, "Internal Server Error"));
        }
    }

    @PutMapping("/updateMaterial/{id}")
    public ResponseEntity<?> updateMaterial(@PathVariable String id, @RequestBody Material material) {
        Material updatedMaterial = materialService.updateMaterial(id, material);
        if (updatedMaterial != null) {
            return ResponseEntity.ok(new ApiResponse_Material(true, "Material Updated!", updatedMaterial));
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ApiResponse_Material(false, "No Material Available with the provided ID!"));
        }
    }

    @DeleteMapping("/deleteMaterial/{id}")
    public ResponseEntity<?> deleteMaterial(@PathVariable String id) {
        boolean deleted = materialService.deleteMaterial(id);
        if (deleted) {
            return ResponseEntity.ok(new ApiResponse_Material(true, "Material Deleted!"));
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ApiResponse_Material(false, "No Material Available with the provided ID!"));
        }
    }
}
