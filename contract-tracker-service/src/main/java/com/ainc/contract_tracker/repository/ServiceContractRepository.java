package com.ainc.contract_tracker.repository;

import com.ainc.contract_tracker.dto.ContractWorkerResponseDTO;
import com.ainc.contract_tracker.model.Employee;
import com.ainc.contract_tracker.model.ServiceContract;
import com.ainc.contract_tracker.model.ServiceContractStatusEnum;
import com.ainc.contract_tracker.repository.projectile.SearchServiceContractProjectile;
import jakarta.persistence.*;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface ServiceContractRepository extends CrudRepository<ServiceContract, String>, PagingAndSortingRepository<ServiceContract, String> {


    List<SearchServiceContractProjectile> findAllByTitleContainsIgnoreCase(String key, PageRequest pageRequest);

}
