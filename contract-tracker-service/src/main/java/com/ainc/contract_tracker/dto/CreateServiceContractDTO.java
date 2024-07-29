package com.ainc.contract_tracker.dto;

import com.ainc.contract_tracker.model.ServiceContractStatusEnum;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class CreateServiceContractDTO {
    @NotNull
    private String title;

    @NotNull
    private String description;

    @NotNull
    private ServiceContractStatusEnum status;

    @NotNull
    private Long ownerId;

    @NotNull
    private Integer developerCountRequired;


}
