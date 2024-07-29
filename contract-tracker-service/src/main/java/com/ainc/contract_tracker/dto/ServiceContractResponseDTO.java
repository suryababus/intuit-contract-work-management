package com.ainc.contract_tracker.dto;

import com.ainc.contract_tracker.model.Employee;
import com.ainc.contract_tracker.model.ServiceContractStatusEnum;
import com.ainc.contract_tracker.model.WorkLog;
import jakarta.persistence.*;
import lombok.Data;

import java.util.Set;

@Data
public class ServiceContractResponseDTO {

    private String id;

    private String title;

    private String description;

    private ServiceContractStatusEnum status;

    private ContractWorkerResponseDTO owner;

    private Integer developerCountRequired;

    private Integer currentDeveloperCount;

    private Set<ContractWorkerResponseDTO> employees;

}
