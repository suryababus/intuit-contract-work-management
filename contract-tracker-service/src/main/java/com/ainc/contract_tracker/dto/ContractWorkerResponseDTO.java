package com.ainc.contract_tracker.dto;

import com.ainc.contract_tracker.model.EmployeeRoleEnum;
import com.ainc.contract_tracker.model.EmployeeStatusEnum;
import com.ainc.contract_tracker.model.EmployeeTypeEnum;
import lombok.Data;

import java.time.LocalDate;

@Data
public class ContractWorkerResponseDTO {
    private String firstName;


    private String lastName;


    private EmployeeTypeEnum type;


    private EmployeeRoleEnum role;


    private LocalDate startDate;


    private LocalDate endDate;


    private String employeeNumber;


    private EmployeeStatusEnum status;

    private String email;

    private String phone;

    private boolean deleted;
}
