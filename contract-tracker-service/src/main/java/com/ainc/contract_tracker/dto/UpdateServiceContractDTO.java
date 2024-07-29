package com.ainc.contract_tracker.dto;

import com.ainc.contract_tracker.model.ServiceContractStatusEnum;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import lombok.Data;


@Data
@Valid
public class UpdateServiceContractDTO {


    private String title;


    private String description;


    private ServiceContractStatusEnum status;


    private Long ownerId;

}
