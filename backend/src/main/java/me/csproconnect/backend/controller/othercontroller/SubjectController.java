package me.csproconnect.backend.controller.othercontroller;

import me.csproconnect.backend.model.othermodel.ApiResponse_Subject;
import me.csproconnect.backend.model.othermodel.Subject;
import me.csproconnect.backend.service.otherservice.SubjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/subject")
public class SubjectController {

    @Autowired
    private SubjectService subjectService;

        @PostMapping("/getSubject")
    public ResponseEntity<?> getSubjectBySemester(@RequestBody Map<String, Integer> request) {
        int semester = request.get("semester");
        List<Subject> subjects = subjectService.getSubjectsBySemester(semester);
        if (subjects.isEmpty()) {
            return ResponseEntity.ok(new ApiResponse_Subject(false, "No Subject Available", subjects));
        } else {
            return ResponseEntity.ok(new ApiResponse_Subject(true, "All Subjects Loaded!", subjects));
        }
    }


    @GetMapping("/getAllSubjects")
    public ResponseEntity<?> getAllSubjects(){
            List<Subject> subjects = subjectService.allSubjects();
        if (subjects.isEmpty()) {
            return ResponseEntity.ok(new ApiResponse_Subject(false, "No Subject Available", subjects));
        } else {
            return ResponseEntity.ok(new ApiResponse_Subject(true, "All Subjects Loaded!", subjects));
        }
        }

//    @GetMapping("/getSubjects")
//    public ResponseEntity<?> getSubjects{
//        List<Subject> subjects = subjectService.getSubjects();
//        if (subjects.isEmpty()) {
//            return ResponseEntity.ok(new ApiResponse_Subject(false, "No Subject Available", subjects));
//        } else {
//            return ResponseEntity.ok(new ApiResponse_Subject(true, "All Subjects Loaded!", subjects));
//        }
//    }

    @PostMapping("/addSubject")
    public ResponseEntity<?> addSubject(@RequestBody Subject subjectRequest) {
        Optional<Subject> existingSubject = subjectService.findByCode(subjectRequest.getCode());
        if (existingSubject.isPresent()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ApiResponse_Subject(false, "Subject Already Exists"));
        } else {
            Subject savedSubject = subjectService.save(subjectRequest);
            return ResponseEntity.ok(new ApiResponse_Subject(true, "Subject Added!", savedSubject));
        }
    }

    @DeleteMapping("/deleteSubject/{id}")
    public ResponseEntity<?> deleteSubject(@PathVariable String id) {
        Optional<Subject> existingSubject = subjectService.findById(id);
        if (existingSubject.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ApiResponse_Subject(false, "No Subject Exists!"));
        } else {
            subjectService.deleteById(id);
            return ResponseEntity.ok(new ApiResponse_Subject(true, "Subject Deleted!"));
        }
    }
}
