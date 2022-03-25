package com.blockz.javaBackend.model;

import java.util.List;
import java.util.Date;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("tasks")
public class Task {

    @Id
    private final String id;

    private final String owner;
    private final List<String> assignees;
    private final String title;
    private final String body;
    private final List<String> buckets;
    private final boolean complete;
    private final Date duedate;

    public Task(String id, String owner, List<String> assignees, String title, String body, List<String> buckets, boolean complete, Date duedate) {
        this.id = id;
        this.owner = owner;
        this.assignees = assignees;
        this.title = title;
        this.body = body;
        this.buckets = buckets;
        this.complete = complete;
        this.duedate = duedate;
    }

    public String getId() {
        return id;
    }

    public String getOwner() {
        return owner;
    }

    public List<String> getAssignees() {
        return assignees;
    }

    public String getTitle() {
        return title;
    }

    public String getBody() {
        return body;
    }

    public List<String> getBuckets() {
        return buckets;
    }

    public boolean isComplete() {
        return complete;
    }

    public Date getDuedate() {
        return duedate;
    }
}
