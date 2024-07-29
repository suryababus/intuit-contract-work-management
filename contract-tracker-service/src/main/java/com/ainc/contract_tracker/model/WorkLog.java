package com.ainc.contract_tracker.model;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "work_logs")
public class WorkLog {
    @Id
    @GeneratedValue
    private String id;

    @ManyToOne
    @JoinColumn(name = "service_id")
    private ServiceContract service;

    @ManyToOne
    @JoinColumn(name = "performed_by")
    private Employee performedBy;

    @Column(name = "time_spent")
    private Float timeSpent;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    // Getters and setters
}
