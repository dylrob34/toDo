package com.blockz.javaBackend.service;

import com.blockz.javaBackend.repository.TaskRepo;
import com.blockz.javaBackend.model.Task;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TaskService {

    @Autowired
    private  TaskRepo taskRepo;

    public List<Task> getTasks(String user) {
        System.out.println("Getting MOAR Tasks");
        return taskRepo.getTasks(user);
    }
}
