package com.ainc.contract_tracker.model;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "audit_logs")
public class AuditLog {
    @Id
    @GeneratedValue
    private String id;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    private String activity;

    @ManyToOne
    @JoinColumn(name = "performed_by")
    private Employee performedBy;

    @Column(name = "affected_record")
    private String affectedRecord;

    // Getters and setters
}
