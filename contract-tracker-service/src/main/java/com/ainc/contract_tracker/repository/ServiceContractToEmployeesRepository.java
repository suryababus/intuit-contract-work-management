package com.ainc.contract_tracker.repository;


import com.ainc.contract_tracker.model.ServiceContractsToEmployees;
import com.ainc.contract_tracker.repository.projectile.SearchServiceContractToEmployeeProjectile;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ServiceContractToEmployeesRepository extends CrudRepository<ServiceContractsToEmployees, String> {

    List<SearchServiceContractToEmployeeProjectile> findAllByEmployeeEmployeeNumber(Long id);
}
