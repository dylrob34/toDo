package com.blockz.javaBackend.api;

import com.blockz.javaBackend.model.Task;

import java.util.List;

import com.blockz.javaBackend.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/api/task/getTasks")
@RestController
public class TaskController {

    private final TaskService taskService;

    @Autowired
    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    @GetMapping
    public List<Task> getTasks() {
        System.out.println("Getting Tasks");
        return taskService.getTasks("dylana1998@gmail.com");
    }
}
