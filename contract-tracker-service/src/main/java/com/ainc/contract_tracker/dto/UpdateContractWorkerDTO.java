package com.ainc.contract_tracker.dto;

import com.ainc.contract_tracker.model.EmployeeRoleEnum;
import com.ainc.contract_tracker.model.EmployeeStatusEnum;
import com.ainc.contract_tracker.model.EmployeeTypeEnum;
import com.ainc.contract_tracker.model.ServiceContractStatusEnum;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


import java.time.LocalDate;

@Data
public class UpdateContractWorkerDTO {

    @NotNull
    private String firstName;


    private String lastName;


    private EmployeeTypeEnum type;


    private EmployeeRoleEnum role;


    private LocalDate startDate;


    private LocalDate endDate;


    private EmployeeStatusEnum status;

    @Email(message = "Not a valid Email")
    private String email;

    @Pattern(regexp = "^(\\+\\d{1,2}\\s)?\\(?\\d{3}\\)?[\\s.-]\\d{3}[\\s.-]\\d{4}$", message = "Not a valid Phone Number")
    private String phone;

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class ServiceContractSearch {

        private String id;

        private String title;

        private String description;

        private ServiceContractStatusEnum status;

        private ContractWorkerResponseDTO owner;

        private Integer developerCountRequired;

        private Integer currentDeveloperCount;

    }
}
