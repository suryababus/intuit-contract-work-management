package com.ainc.contract_tracker.model;

import com.ainc.contract_tracker.repository.projectile.EmployeeMinimalProjectile;
import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UuidGenerator;

import java.time.LocalDateTime;

@Entity
@Table(name = "audit_logs")
@Data
public class AuditLog {
    @Id
    @UuidGenerator
    private String id;

    @CreationTimestamp
    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column
    private String activity;

    @ManyToOne
    @JoinColumn(name = "performed_by")
    private Employee performedBy;

    @Column(name = "affected_record")
    private String affectedRecord;

    // Getters and setters
}
