package com.ainc.contract_tracker.controller;


import com.ainc.contract_tracker.dto.ContractWorkerResponseDTO;
import com.ainc.contract_tracker.model.Employee;
import com.ainc.contract_tracker.service.ContractWorkerService;
import jakarta.websocket.server.PathParam;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping(path = "api/v1/contract-workers")
@AllArgsConstructor
public class FilterContractWorkersController {
    private final ContractWorkerService contractWorkerService;
    private final ModelMapper modelMapper;

    @GetMapping
    public List<ContractWorkerResponseDTO> getFilteredContractWorkers(@PathParam("") String key) {
        System.out.println("key:" + key);
        var employeeResult = contractWorkerService.filterEmployee(key);

        return employeeResult.stream()
                .map(user -> modelMapper.map(user, ContractWorkerResponseDTO.class))
                .collect(Collectors.toList());
    }


}
