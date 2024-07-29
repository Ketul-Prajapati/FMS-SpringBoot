package me.csproconnect.backend.controller.othercontroller;

import me.csproconnect.backend.model.othermodel.ApiResponse_Mark;
import me.csproconnect.backend.model.othermodel.Mark;
import me.csproconnect.backend.service.otherservice.MarkService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.persistence.criteria.CriteriaBuilder;
import java.util.Map;

@RestController
@RequestMapping("/marks")
public class MarkController {

    @Autowired
    private MarkService marksService;

    @PostMapping("/getMarks")
    public ResponseEntity<?> getMarks(@RequestBody Mark request) {
        try {
            Mark marks = marksService.findByEnrollmentNo(request.getEnrollmentNo());
            if (marks == null) {
                return ResponseEntity.ok(new ApiResponse_Mark(true, "Marks Not Available",marks));
            }
            return ResponseEntity.ok(new ApiResponse_Mark(true, "All Marks Loaded!", marks));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse_Mark(false, "Internal Server Error"));
        }
    }

//    @PostMapping("/addMarks")
//    public ResponseEntity<?> addMarks(@RequestBody Mark marks) {
//        try {
//            Mark savedMarks = marksService.findByEnrollmentNo(marks.getEnrollmentNo());
//            if(savedMarks == null){
//                Mark marks =
//            }
//            return ResponseEntity.ok(new ApiResponse_Mark(true, "Marks Added/Updated!", savedMarks));
//        } catch (Exception e) {
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
//                    .body(new ApiResponse_Mark(false, "Internal Server Error"));
//        }
//    }

    @PostMapping("/addMarks")
    public ResponseEntity<?> addMarks(@RequestBody Mark request) {
        try {
            Long enrollmentNo = request.getEnrollmentNo();
            Map<String, Integer> requestedInternalMarks = request.getInternal();

            Mark existingMark = marksService.findByEnrollmentNo(enrollmentNo);
            if (existingMark != null) {
                // Get the existing internal marks map
                Map<String, Integer> existingInternalMarks = existingMark.getInternal();
                if (existingInternalMarks != null) {
                    // Add or update marks from the requested internal marks map
                    requestedInternalMarks.forEach((subject, marks) -> existingInternalMarks.merge(subject, marks, (v1, v2) -> v2));
                } else {
                    // If there were no existing internal marks, set the requested map as is
                    existingMark.setInternal(requestedInternalMarks);
                }
                marksService.save(existingMark);
                return ResponseEntity.ok().body(new ApiResponse_Mark(true, "Marks Updated"));
            } else {
                Mark newMark = new Mark();
                newMark.setEnrollmentNo(enrollmentNo);
                newMark.setInternal(requestedInternalMarks);
                marksService.save(newMark);
                return ResponseEntity.ok().body(new ApiResponse_Mark(true, "Marks Added"));
            }
        } catch (Exception e) {
            e.printStackTrace(); // For debugging, it's better to log the stack trace
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse_Mark(false, "Internal Server Error"));
        }
    }

    @DeleteMapping("/deleteMarks/{id}")
    public ResponseEntity<?> deleteMarks(@PathVariable("id") String id) {
        try {
            marksService.deleteMarks(id);
            return ResponseEntity.ok(new ApiResponse_Mark(true, "Marks Deleted!"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse_Mark(false, "Internal Server Error"));
        }
    }
}
