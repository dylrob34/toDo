package com.blockz.javaBackend.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

import com.blockz.javaBackend.model.Task;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface TaskRepo extends MongoRepository<Task, String> {

    @Query("{owner: '?0'}")
    public List<Task> getTasks(String owner);

}
