package com.ainc.contract_tracker.controller;


import com.ainc.contract_tracker.dto.AssignEmployeeToServiceContractRequestDTO;
import com.ainc.contract_tracker.dto.CreateServiceContractDTO;
import com.ainc.contract_tracker.dto.ServiceContractResponseDTO;
import com.ainc.contract_tracker.model.ServiceContract;
import com.ainc.contract_tracker.service.ServiceContractService;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1")
@AllArgsConstructor
public class ServiceContractController {

    private final ServiceContractService serviceContractService;
    private final ModelMapper modelMapper;

    @GetMapping("/service-contract/{id}")
//    @PreAuthorize("hasAnyRole('ADMIN', 'PM') or @serviceContractService.isAssignee(authentication, #id)")
    public ResponseEntity<ServiceContractResponseDTO> getServiceContract(@PathVariable String id) {
        var result = serviceContractService.getServiceContract(id);
        return result.map(serviceContract ->
                        ResponseEntity.ok(modelMapper.map(serviceContract, ServiceContractResponseDTO.class)))
                .orElseGet(() -> ResponseEntity.badRequest().build());

    }

    @PostMapping("/service-contract")
    public ResponseEntity<ServiceContractResponseDTO> createServiceContract(@RequestBody CreateServiceContractDTO createServiceContractDTO) {


        var createdContract = serviceContractService.createServiceContract(createServiceContractDTO);
        return new ResponseEntity<>(modelMapper.map(createdContract, ServiceContractResponseDTO.class), HttpStatus.CREATED);
    }

    @PostMapping("/service-contract/{serviceContractId}/assign")
    public ResponseEntity<Boolean> assignEmployeeToServiceContract(@PathVariable String serviceContractId, @RequestBody AssignEmployeeToServiceContractRequestDTO assignEmployeeToServiceContractRequestDTO) {

        return ResponseEntity.ok(this.serviceContractService.assignEmployeeToContract(assignEmployeeToServiceContractRequestDTO.getEmployeeId(), serviceContractId));
    }


//
//    @PatchMapping("/service-contract/{id}")
//    @PreAuthorize("hasRole('ADMIN') or @serviceContractService.isOwner(authentication, #id)")
//    public ResponseEntity<ServiceContract> updateServiceContract(@PathVariable Long id, @RequestBody ServiceContract serviceContract) {
//        ServiceContract updatedContract = serviceContractService.updateServiceContract(id, serviceContract);
//        return ResponseEntity.ok(updatedContract);
//    }
//
//    @DeleteMapping("/service-contract/{id}")
//    @PreAuthorize("hasRole('ADMIN') or @serviceContractService.isOwner(authentication, #id)")
//    public ResponseEntity<Void> deleteServiceContract(@PathVariable Long id) {
//        serviceContractService.deleteServiceContract(id);
//        return ResponseEntity.noContent().build();
//    }
}
