package com.habit_tracker.controller;

import com.habit_tracker.entity.Habit;
import com.habit_tracker.service.HabitService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/habits")
@CrossOrigin(origins = "*")
public class HabitController {

    private final HabitService habitService;

    public HabitController(HabitService habitService) {
        this.habitService = habitService;
    }

    @GetMapping
    public List<Habit> list() {
        return habitService.findAll();
    }

    @GetMapping("/{id}")
    public Habit get(@PathVariable Long id) {
        return habitService.findById(id);
    }

    @PostMapping
    public ResponseEntity<Habit> create(@RequestBody Habit habit) {
        return ResponseEntity.ok(habitService.create(habit));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Habit> update(@PathVariable Long id, @RequestBody Habit habit) {
        return ResponseEntity.ok(habitService.update(id, habit));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        habitService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{id}/progress")
    public ResponseEntity<Habit> markProgress(@PathVariable Long id) {
        return ResponseEntity.ok(habitService.incrementProgress(id));
    }
}


