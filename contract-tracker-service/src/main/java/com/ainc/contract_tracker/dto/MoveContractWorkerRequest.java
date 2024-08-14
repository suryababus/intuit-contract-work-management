package com.ainc.contract_tracker.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Data;
import org.hibernate.validator.constraints.UUID;

@Data
public class MoveContractWorkerRequest {
    @NotNull
    Long employeeNumber;

    @UUID
    String destinationContractId;
}
