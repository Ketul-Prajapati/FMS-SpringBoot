package me.csproconnect.backend.controller.othercontroller;

import me.csproconnect.backend.model.othermodel.ApiResponse_Notice;
import me.csproconnect.backend.model.othermodel.Notice;
import me.csproconnect.backend.service.otherservice.NoticeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/notice")
public class NoticeController {

    @Autowired
    private NoticeService noticeService;

    @PostMapping("/getNotice")
    public ResponseEntity<?> getNotice(@RequestBody Notice request) {
        List<Notice> notices = new ArrayList<>();
        List<String> temp = request.getTypelist();
        for (String type : temp) {
            notices.addAll(noticeService.getByType(type));
        }
        if (!notices.isEmpty()) {
            return ResponseEntity.ok(new ApiResponse_Notice(true, "Notices Fetched Successfully", notices));
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ApiResponse_Notice(false, "No Notices Available!"));
        }
    }

//    @PostMapping("/getNotice")
//    public ResponseEntity<?> getNoticeByTypes(@RequestBody List<String> types) {
//        List<Notice> notices = new ArrayList<>();
//        for (String type : types) {
//            notices.addAll(noticeService.getByType(type));
//        }
//        if (!notices.isEmpty()) {
//            return ResponseEntity.ok(new ApiResponse_Notice(true, "Notices Fetched Successfully", notices));
//        } else {
//            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ApiResponse_Notice(false, "No Notices Available!"));
//        }
//    }

    @PostMapping("/addNotice")
    public ResponseEntity<?> addNotice(@RequestBody Notice notice) {
        Notice addedNotice = noticeService.addNotice(notice);
        if (addedNotice != null) {
            return ResponseEntity.ok(new ApiResponse_Notice(true, "Notice Added Successfully", addedNotice));
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse_Notice(false, "Internal Server Error"));
        }
    }

    @PutMapping("/updateNotice/{id}")
    public ResponseEntity<?> updateNotice(@PathVariable String id, @RequestBody Notice notice) {
        Notice updatedNotice = noticeService.updateNotice(id, notice);
        if (updatedNotice != null) {
            return ResponseEntity.ok(new ApiResponse_Notice(true, "Notice Updated Successfully", updatedNotice));
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ApiResponse_Notice(false, "No Notice Available with the provided ID!"));
        }
    }

    @DeleteMapping("/deleteNotice/{id}")
    public ResponseEntity<?> deleteNotice(@PathVariable String id) {
        boolean deleted = noticeService.deleteNotice(id);
        if (deleted) {
            return ResponseEntity.ok(new ApiResponse_Notice(true, "Notice Deleted Successfully"));
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ApiResponse_Notice(false, "No Notice Available with the provided ID!"));
        }
    }
}
