package com.ainc.contract_tracker.controller;


import com.ainc.contract_tracker.dto.AssignEmployeeToServiceContractRequestDTO;
import com.ainc.contract_tracker.dto.CreateServiceContractDTO;
import com.ainc.contract_tracker.dto.ServiceContractResponseDTO;
import com.ainc.contract_tracker.dto.UpdateServiceContractDTO;
import com.ainc.contract_tracker.model.ServiceContract;
import com.ainc.contract_tracker.service.ServiceContractService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.nio.file.AccessDeniedException;

@RestController
@RequestMapping("/api/v1")
@AllArgsConstructor
public class ServiceContractController {

    private final ServiceContractService serviceContractService;
    private final ModelMapper modelMapper;

    @GetMapping("/service-contract/{id}")
    public ResponseEntity<ServiceContractResponseDTO> getServiceContract(@PathVariable String id) {

        var result = serviceContractService.getServiceContract(id);
        return result.map(serviceContract ->
                        ResponseEntity.ok(modelMapper.map(serviceContract, ServiceContractResponseDTO.class)))
                .orElseGet(() -> ResponseEntity.badRequest().build());

    }

    @PostMapping("/service-contract")
    public ResponseEntity<ServiceContractResponseDTO> createServiceContract(@RequestBody @Valid CreateServiceContractDTO createServiceContractDTO) {


        var createdContract = serviceContractService.createServiceContract(createServiceContractDTO);
        return new ResponseEntity<>(modelMapper.map(createdContract, ServiceContractResponseDTO.class), HttpStatus.CREATED);
    }

    @PostMapping("/service-contract/{serviceContractId}/assign")
    public ResponseEntity<Boolean> assignEmployeeToServiceContract(@PathVariable String serviceContractId, @RequestBody @Valid AssignEmployeeToServiceContractRequestDTO assignEmployeeToServiceContractRequestDTO) throws AccessDeniedException {

        return ResponseEntity.ok(this.serviceContractService.assignEmployeeToContract(
                assignEmployeeToServiceContractRequestDTO.getEmployeeId(),
                serviceContractId,
                assignEmployeeToServiceContractRequestDTO.getBandWidthPercentage()));
    }

    @PatchMapping("/service-contract/{id}")
    public ResponseEntity<ServiceContractResponseDTO> updateServiceContract(@PathVariable String id, @Valid @RequestBody UpdateServiceContractDTO updateServiceContractDTO) throws AccessDeniedException {
        var createdContract = serviceContractService.updateServiceContract(id, updateServiceContractDTO);
        return new ResponseEntity<>(modelMapper.map(createdContract, ServiceContractResponseDTO.class), HttpStatus.CREATED);
    }


}
