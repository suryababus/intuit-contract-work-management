package com.ainc.contract_tracker.repository;

import com.ainc.contract_tracker.model.Employee;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface EmployeeRepository extends CrudRepository<Employee, Long> {
    Optional<Employee> findByEmail(String email);

    @Query("select e from Employee e where UPPER(e.email) like UPPER(CONCAT('%', ?1, '%'))")
    List<Employee> search(String key);
}
