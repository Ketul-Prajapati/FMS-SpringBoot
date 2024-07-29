package me.csproconnect.backend.service.otherservice;

import me.csproconnect.backend.model.othermodel.Notice;
import me.csproconnect.backend.repository.otherrepo.NoticeRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class NoticeService {

    @Autowired
    private NoticeRepo noticeRepository;

    public List<Notice> getByType(String type) {
        return noticeRepository.findByType(type);
    }

    public Notice addNotice(Notice notice) {
        return noticeRepository.save(notice);
    }

    public Notice updateNotice(String id, Notice notice) {
        Optional<Notice> existingNotice = noticeRepository.findById(id);
        if (existingNotice.isPresent()) {
            notice.setId(id);
            return noticeRepository.save(notice);
        } else {
            return null;
        }
    }

    public boolean deleteNotice(String id) {
        if (noticeRepository.existsById(id)) {
            noticeRepository.deleteById(id);
            return true;
        } else {
            return false;
        }
    }
}

