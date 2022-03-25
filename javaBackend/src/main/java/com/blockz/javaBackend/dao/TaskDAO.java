package com.blockz.javaBackend.dao;

import com.blockz.javaBackend.model.Task;
import java.util.List;

public interface TaskDAO {

    int insertTask(Task task);
    Task get(String id);
    List<Task> getAll();

    default int createTask(Task task) {
        return insertTask(task);
    }

    default Task getTask(String id) {
        return get(id);
    }

    default List<Task> getTasks() {
        return getAll();
    }
}
