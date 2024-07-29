package com.ainc.contract_tracker.dto;

import lombok.Data;

@Data
public class LoginResponseDTO {
    String token;
    ContractWorkerResponseDTO user;
}
