package com.ainc.contract_tracker.model;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.UuidGenerator;

@Table(name = "service_contracts_to_employees")
@Entity
@Data
public class ServiceContractsToEmployees {


    @Id
    @UuidGenerator
    private String id;

    @ManyToOne()
    @JoinColumn(name = "employee_id")
    private Employee employee;

    @ManyToOne()
    @JoinColumn(name = "service_id")
    private ServiceContract service;

    private Integer bandWidth;
}
