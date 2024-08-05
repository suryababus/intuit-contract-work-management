package com.ainc.contract_tracker.dto;

import com.ainc.contract_tracker.model.ServiceContractStatusEnum;
import lombok.Data;


@Data
public class ContractWorkerServiceContractResponseDTO {
    private String id;

    private String title;

    private String description;

    private ServiceContractStatusEnum status;

    private ContractWorkerResponseDTO owner;

    private Integer developerCountRequired;

    private Integer currentDeveloperCount;

    private Integer allocatedBandwidth;

}
