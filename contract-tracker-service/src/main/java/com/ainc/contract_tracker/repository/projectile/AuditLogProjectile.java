package com.ainc.contract_tracker.repository.projectile;

import jakarta.persistence.Column;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UuidGenerator;

import java.time.LocalDateTime;

public interface AuditLogProjectile {

    String getId();

    LocalDateTime getCreatedAt();

    String getActivity();

    EmployeeMinimalProjectile getPerformedBy();


    String getAffectedRecord();

}
