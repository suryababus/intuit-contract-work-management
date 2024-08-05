package com.ainc.contract_tracker.model;

import jakarta.persistence.*;

import java.time.LocalDate;
import java.util.Collection;
import java.util.Date;
import java.util.List;
import java.util.Set;

import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

@Entity
@Table(name = "employees")
@Getter
@Setter
public class Employee implements UserDetails {

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "last_name")
    private String lastName;

    @Enumerated(EnumType.STRING)
    private EmployeeTypeEnum type;

    @Enumerated(EnumType.STRING)
    private EmployeeRoleEnum role;

    @Column(name = "start_date")
    private LocalDate startDate;

    @Column(name = "end_date")
    private LocalDate endDate;

    @Column(name = "employee_number", unique = true)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    private Long employeeNumber;

    @Enumerated(EnumType.STRING)
    private EmployeeStatusEnum status;


    @Column(unique = true)
    private String email;

    private String phone;

    @Column(name = "is_deleted")
    private boolean isDeleted;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private Integer availableBandwidth;

    @CreationTimestamp
    @Column(updatable = false, name = "created_at")
    private Date createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private Date updatedAt;

    @OneToMany(mappedBy = "owner")
    private Set<ServiceContract> ownedContracts;

    @ManyToMany(mappedBy = "employees")
    private Set<ServiceContract> assignedContracts;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of();
    }

    @Override
    public String getPassword() {
        return this.password;
    }

    @Override
    public String getUsername() {
        return this.email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
