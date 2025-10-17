package com.habit_tracker.service;

import com.habit_tracker.entity.Habit;
import com.habit_tracker.entity.repository.HabitRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class HabitService {

    private final HabitRepository habitRepository;

    public HabitService(HabitRepository habitRepository) {
        this.habitRepository = habitRepository;
    }

    public List<Habit> findAll() {
        return habitRepository.findAll();
    }

    public Habit findById(Long id) {
        return habitRepository.findById(id).orElseThrow();
    }

    public Habit create(Habit habit) {
        if (habit.getTargetPerDay() <= 0) {
            habit.setTargetPerDay(1);
        }
        habit.setCurrentStreak(0);
        habit.setLongestStreak(0);
        habit.setCompletedCountToday(0);
        habit.setLastProgressDate(null);
        habit.setLastCompletedDate(null);
        return habitRepository.save(habit);
    }

    public Habit update(Long id, Habit updated) {
        Habit existing = findById(id);
        existing.setName(updated.getName());
        existing.setTargetPerDay(updated.getTargetPerDay());
        return habitRepository.save(existing);
    }

    public void delete(Long id) {
        habitRepository.deleteById(id);
    }

    public Habit incrementProgress(Long id) {
        Habit habit = findById(id);
        LocalDate today = LocalDate.now();

        if (habit.getLastProgressDate() == null || !habit.getLastProgressDate().isEqual(today)) {
            // New day, reset today's count
            habit.setCompletedCountToday(0);
            habit.setLastProgressDate(today);
        }

        habit.setCompletedCountToday(habit.getCompletedCountToday() + 1);

        if (habit.getCompletedCountToday() >= habit.getTargetPerDay()) {
            // Mark completion for the day if not already counted
            if (habit.getLastCompletedDate() == null) {
                habit.setCurrentStreak(1);
            } else {
                LocalDate yesterday = today.minusDays(1);
                if (habit.getLastCompletedDate().isEqual(today)) {
                    // already counted today
                } else if (habit.getLastCompletedDate().isEqual(yesterday)) {
                    habit.setCurrentStreak(habit.getCurrentStreak() + 1);
                } else {
                    habit.setCurrentStreak(1);
                }
            }
            habit.setLastCompletedDate(today);
            if (habit.getCurrentStreak() > habit.getLongestStreak()) {
                habit.setLongestStreak(habit.getCurrentStreak());
            }
        }

        return habitRepository.save(habit);
    }
}


