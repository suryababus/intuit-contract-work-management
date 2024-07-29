package com.ainc.contract_tracker.repository;

import com.ainc.contract_tracker.dto.ContractWorkerResponseDTO;
import com.ainc.contract_tracker.model.ServiceContract;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface ServiceContractRepository extends CrudRepository<ServiceContract, String> {


    @Query("select sc from ServiceContract sc where UPPER(sc.title) like UPPER(CONCAT('%', ?1 ,'%')) ")
    List<ServiceContract> search(String key);


}
