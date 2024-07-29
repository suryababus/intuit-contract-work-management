package com.ainc.contract_tracker.service;

import com.ainc.contract_tracker.config.JwtTokenProvider;
import com.ainc.contract_tracker.dto.ContractWorkerResponseDTO;
import com.ainc.contract_tracker.dto.LoginRequestDTO;
import com.ainc.contract_tracker.dto.LoginResponseDTO;
import com.ainc.contract_tracker.model.Employee;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;


@Service
@AllArgsConstructor
public class AuthenticationService {
    private final ContractWorkerService contractWorkerService;

    private final JwtTokenProvider jwtTokenProvider;
    private final ModelMapper modelMapper;

    public LoginResponseDTO authenticate(LoginRequestDTO input) {
        var response = new LoginResponseDTO();
        final Employee user;
        try {
            user = this.contractWorkerService.getContractWorker(input.getEmail())
                    .orElseThrow();
            response.setUser(modelMapper.map(user, ContractWorkerResponseDTO.class));
        } catch (Exception e) {
            throw new IllegalStateException("User not found");
        }
        try {
            response.setToken(this.jwtTokenProvider.generateToken(user));
            return response;

        } catch (Exception e) {
            throw new IllegalStateException("Internal Server Error");
        }
    }

    public Employee getCurrentUser() {
        var context = SecurityContextHolder.getContext().getAuthentication();
        var employeeEmail = context.getName();
        var employee = this.contractWorkerService.getContractWorker((employeeEmail));
        if (employee.isPresent()) {
            return employee.get();
        } else {
            throw new IllegalStateException("User email from the auth token is not in database");
        }
    }
}
