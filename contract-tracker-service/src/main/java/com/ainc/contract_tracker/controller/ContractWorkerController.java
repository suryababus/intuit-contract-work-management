package com.ainc.contract_tracker.controller;

import com.ainc.contract_tracker.dto.*;
import com.ainc.contract_tracker.model.EmployeeRoleEnum;
import com.ainc.contract_tracker.service.AuthenticationService;
import com.ainc.contract_tracker.service.ContractWorkerService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.nio.file.AccessDeniedException;
import java.util.List;

@RestController
@RequestMapping("api/v1/contract-worker")
@AllArgsConstructor
public class ContractWorkerController {

    private final ContractWorkerService contractWorkerService;
    private final AuthenticationService authenticationService;
    private final ModelMapper modelMapper;

    @PostMapping
    public ResponseEntity<ContractWorkerResponseDTO> createContractWorker(@RequestBody @Valid CreateContractWorkerRequestDTO createContractWorkerRequestDTO) throws AccessDeniedException {
        // Only Admin can create service contract
        var currentUser = this.authenticationService.getCurrentUser();

        if (currentUser.getRole() != EmployeeRoleEnum.ADMIN) {
            throw new AccessDeniedException("Only admin can create contract worker");
        }

        var employee = contractWorkerService.createNewWorker(createContractWorkerRequestDTO);

        return new ResponseEntity<>(modelMapper.map(employee, ContractWorkerResponseDTO.class), HttpStatus.OK);
    }

    @GetMapping(path = "/{id}")
    @ResponseBody
    public ResponseEntity<ContractWorkerResponseDTO> getContractWorker(@PathVariable Long id) {

        var contractWorker = this.contractWorkerService.getContractWorker(id);
        return contractWorker.map(employee -> ResponseEntity.ok(modelMapper.map(employee, ContractWorkerResponseDTO.class)))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @GetMapping(path = "/{id}/service-contracts")
    @ResponseBody
    public ResponseEntity<List<ContractWorkerServiceContractResponseDTO>> getContractWorkerServiceContracts(@PathVariable Long id) {

        var serviceContractsResult = this.contractWorkerService.getContractWorkerServiceContract(id);
        var serviceContractsResponse = serviceContractsResult.stream()
                .map(eSC -> {
                    var serviceContract = modelMapper.map(eSC.getService(), ContractWorkerServiceContractResponseDTO.class);
                    serviceContract.setAllocatedBandwidth(eSC.getBandWidth());
                    return serviceContract;
                }).toList();
        return ResponseEntity.ok(serviceContractsResponse);
    }

    @GetMapping(path = "/me")
    @ResponseBody
    public ResponseEntity<ContractWorkerResponseDTO> getMe() {

        var employee = this.authenticationService.getCurrentUser();
        return ResponseEntity.ok(modelMapper.map(employee, ContractWorkerResponseDTO.class));
    }


    @PatchMapping(path = "/{id}")
    @ResponseBody
    public ResponseEntity<ContractWorkerResponseDTO> updateEmployee(@PathVariable Long id, @Valid @RequestBody UpdateContractWorkerDTO updateContractWorkerDTO) throws AccessDeniedException {
        // Only Admin can create service contract
        var currentUser = this.authenticationService.getCurrentUser();

        if (currentUser.getRole() != EmployeeRoleEnum.ADMIN) {
            throw new AccessDeniedException("Only admin can create contract worker");
        }
        var employee = this.contractWorkerService.updateEmployee(id, updateContractWorkerDTO);

        return ResponseEntity.ok(modelMapper.map(employee, ContractWorkerResponseDTO.class));
    }

    @DeleteMapping(path = "/{id}")
    @ResponseBody
    public ResponseEntity<ContractWorkerResponseDTO> deleteEmployee(@PathVariable Long id) {
        var employee = this.contractWorkerService.deleteEmployee(id);

        return ResponseEntity.ok(modelMapper.map(employee, ContractWorkerResponseDTO.class));
    }


}
