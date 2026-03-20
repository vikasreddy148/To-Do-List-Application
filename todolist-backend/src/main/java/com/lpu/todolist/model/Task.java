package com.lpu.todolist.model;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;

@Data
@Entity
@Table(name = "tasks")
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_id")
    private Long userId;

    private String description;
    
    private String priority; // e.g., Low, Medium, High
    
    private String status; // e.g., Pending, In Progress, Completed
    
    private LocalDate deadline;
}
