package com.ainc.contract_tracker.dto;


import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class AssignEmployeeToServiceContractRequestDTO {
    @NotNull
    Long employeeId;

    @NotNull
    Integer bandWidthPercentage;
}
