package me.csproconnect.backend.service.otherservice;

import me.csproconnect.backend.model.othermodel.Timetable;
import me.csproconnect.backend.repository.otherrepo.TimetableRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.stereotype.Service;

import java.sql.Time;
import java.util.List;
import java.util.Optional;

@Service
public class TimetableService {

    @Autowired
    private TimetableRepo timetableRepository;

    public Timetable findBySemester(int semester){return timetableRepository.findBySemester(semester);}

    public void addTimetable(Timetable timetable) {
        timetableRepository.save(timetable);
    }

    public void updateTimetable(Timetable timetable) {
        timetableRepository.save(timetable);
    }

//    public boolean deleteTimetable(int semester) {
//        Timetable timetable = timetableRepository.findBySemester(semester);
//        if (timetable != null) {
//            timetableRepository.delete(timetable);
//            return true;
//        } else {
//            return false;
//        }
//    }
}

