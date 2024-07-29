package me.csproconnect.backend.service.otherservice;

import me.csproconnect.backend.model.othermodel.Material;
import me.csproconnect.backend.repository.otherrepo.MaterialRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MaterialService {

    @Autowired
    private MaterialRepo materialRepository;

    public List<Material> getMaterialsBySubject(String subject) {
        return materialRepository.findBySubject(subject);
    }

    public Material getMaterialById(String id) {
        Optional<Material> material = materialRepository.findById(id);
        return material.orElse(null);
    }

    public Material addMaterial(Material material) {
        return materialRepository.save(material);
    }

    public Material updateMaterial(String id, Material material) {
        if (materialRepository.existsById(id)) {
            material.setId(id);
            return materialRepository.save(material);
        } else {
            return null;
        }
    }

    public boolean deleteMaterial(String id) {
        if (materialRepository.existsById(id)) {
            materialRepository.deleteById(id);
            return true;
        } else {
            return false;
        }
    }
}
