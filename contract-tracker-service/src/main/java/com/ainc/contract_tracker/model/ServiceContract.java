package com.ainc.contract_tracker.model;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.UuidGenerator;

import java.util.Set;

@Entity
@Table(name = "service_contracts")
@Data
public class ServiceContract {
    @Id
    @UuidGenerator
    private String id;

    private String title;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Enumerated(EnumType.STRING)
    private ServiceContractStatusEnum status;

    @Column(name = "developer_count_required")
    private Integer developerCountRequired;

    @Column(name = "current_developer_count")
    private Integer currentDeveloperCount;

    @ManyToOne
    @JoinColumn(name = "owner_id")
    private Employee owner;


    @Column(name = "is_deleted")
    private boolean isDeleted;


    @ManyToMany
    @JoinTable(
            name = "service_contracts_to_employees",
            joinColumns = @JoinColumn(name = "service_id"),
            inverseJoinColumns = @JoinColumn(name = "employee_id")
    )
    private Set<Employee> employees;

    @OneToMany(mappedBy = "service")
    private Set<WorkLog> workLogs;

    // Getters and setters
}