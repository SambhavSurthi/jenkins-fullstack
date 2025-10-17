package com.habit_tracker.entity;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "habits")
public class Habit {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    // Target number of times to perform per day (e.g., 8 glasses of water)
    @Column(nullable = false)
    private int targetPerDay;

    // Count performed on the lastProgressDate
    @Column(nullable = false)
    private int completedCountToday = 0;

    private LocalDate lastProgressDate;

    private LocalDate lastCompletedDate;

    @Column(nullable = false)
    private int currentStreak = 0;

    @Column(nullable = false)
    private int longestStreak = 0;

    public Habit() {
    }

    public Habit(String name, int targetPerDay) {
        this.name = name;
        this.targetPerDay = targetPerDay;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getTargetPerDay() {
        return targetPerDay;
    }

    public void setTargetPerDay(int targetPerDay) {
        this.targetPerDay = targetPerDay;
    }

    public int getCompletedCountToday() {
        return completedCountToday;
    }

    public void setCompletedCountToday(int completedCountToday) {
        this.completedCountToday = completedCountToday;
    }

    public LocalDate getLastProgressDate() {
        return lastProgressDate;
    }

    public void setLastProgressDate(LocalDate lastProgressDate) {
        this.lastProgressDate = lastProgressDate;
    }

    public LocalDate getLastCompletedDate() {
        return lastCompletedDate;
    }

    public void setLastCompletedDate(LocalDate lastCompletedDate) {
        this.lastCompletedDate = lastCompletedDate;
    }

    public int getCurrentStreak() {
        return currentStreak;
    }

    public void setCurrentStreak(int currentStreak) {
        this.currentStreak = currentStreak;
    }

    public int getLongestStreak() {
        return longestStreak;
    }

    public void setLongestStreak(int longestStreak) {
        this.longestStreak = longestStreak;
    }
}


