package com.ainc.contract_tracker.repository;

import com.ainc.contract_tracker.dto.ContractWorkerResponseDTO;
import com.ainc.contract_tracker.model.ServiceContractStatusEnum;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ServiceContractSearch {

    private String id;

    private String title;

    private String description;

    private ServiceContractStatusEnum status;

    private ContractWorkerResponseDTO owner;

    private Integer developerCountRequired;

    private Integer currentDeveloperCount;

}
