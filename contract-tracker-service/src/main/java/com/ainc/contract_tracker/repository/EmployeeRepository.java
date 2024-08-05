package com.ainc.contract_tracker.repository;

import com.ainc.contract_tracker.model.Employee;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface EmployeeRepository extends CrudRepository<Employee, Long>, PagingAndSortingRepository<Employee, Long> {
    Optional<Employee> findByEmail(String email);

    List<Employee> findAllByEmailContainsIgnoreCase(String key, PageRequest pageRequest);
}
