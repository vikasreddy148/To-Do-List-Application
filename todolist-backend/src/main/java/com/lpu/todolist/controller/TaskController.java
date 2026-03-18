package com.lpu.todolist.controller;

import com.lpu.todolist.model.Task;
import com.lpu.todolist.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import com.lpu.todolist.security.CustomUserDetails;

import java.util.List;

@RestController
@RequestMapping("/api/tasks")
public class TaskController {

    @Autowired
    private TaskRepository taskRepository;

    @GetMapping
    public List<Task> getAllTasks(@AuthenticationPrincipal CustomUserDetails userDetails) {
        if (userDetails == null) return List.of();
        return taskRepository.findByUserId(userDetails.getUser().getId());
    }

    @PostMapping
    public Task createTask(@RequestBody Task task, @AuthenticationPrincipal CustomUserDetails userDetails) {
        task.setUserId(userDetails.getUser().getId());
        return taskRepository.save(task);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Task> updateTask(@PathVariable Long id, @RequestBody Task taskDetails, @AuthenticationPrincipal CustomUserDetails userDetails) {
        return taskRepository.findById(id)
                .filter(task -> task.getUserId().equals(userDetails.getUser().getId()))
                .map(task -> {
                    task.setDescription(taskDetails.getDescription());
                    task.setPriority(taskDetails.getPriority());
                    task.setStatus(taskDetails.getStatus());
                    task.setDeadline(taskDetails.getDeadline());
                    Task updatedTask = taskRepository.save(task);
                    return ResponseEntity.ok().body(updatedTask);
                }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTask(@PathVariable Long id, @AuthenticationPrincipal CustomUserDetails userDetails) {
        return taskRepository.findById(id)
                .filter(task -> task.getUserId().equals(userDetails.getUser().getId()))
                .map(task -> {
                    taskRepository.delete(task);
                    return ResponseEntity.ok().<Void>build();
                }).orElse(ResponseEntity.notFound().build());
    }
}
