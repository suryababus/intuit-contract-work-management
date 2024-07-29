package com.ainc.contract_tracker.service;


import com.ainc.contract_tracker.dto.CreateServiceContractDTO;
import com.ainc.contract_tracker.model.Employee;
import com.ainc.contract_tracker.model.ServiceContract;
import com.ainc.contract_tracker.repository.ServiceContractRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class ServiceContractService {
    private final ServiceContractRepository serviceContractRepository;
    private final ContractWorkerService contractWorkerService;
    private final ModelMapper modelMapper;

    public Optional<ServiceContract> getServiceContract(String id) {
        return this.serviceContractRepository.findById(id);
    }

    public ServiceContract createServiceContract(CreateServiceContractDTO createServiceContractDTO) {
        var serviceContract = modelMapper.map(createServiceContractDTO, ServiceContract.class);
        serviceContract.setId(null);
        serviceContract.setCurrentDeveloperCount(0);

        var ownerResult = this.contractWorkerService.getContractWorker(createServiceContractDTO.getOwnerId());

        if (ownerResult.isPresent()) {
            var owner = ownerResult.get();
            serviceContract.setOwner(owner);
        }


        return this.serviceContractRepository.save(serviceContract);
    }

    public List<ServiceContract> searchContract(String key) {
        var serviceContractSearchProjections = this.serviceContractRepository.search(key);
        return serviceContractSearchProjections.stream()
                .map(sCP -> this.modelMapper.map(sCP, ServiceContract.class))
                .toList();
    }

    public boolean assignEmployeeToContract(Long employeeId, String serviceContractId) {
        // Fetch the existing ServiceContract
        ServiceContract serviceContract = serviceContractRepository.findById(serviceContractId)
                .orElseThrow(() -> new EntityNotFoundException("ServiceContract not found"));

        // Fetch the Employee to be added
        Employee employee = contractWorkerService.getContractWorker(employeeId)
                .orElseThrow(() -> new EntityNotFoundException("Employee not found"));

        // Add the employee to the set
        serviceContract.getEmployees().add(employee);

        var currentDeveloperCount = serviceContract.getCurrentDeveloperCount();
        if (currentDeveloperCount == null) {
            currentDeveloperCount = 0;
        }
        // Update the current developer count
        serviceContract.setCurrentDeveloperCount(currentDeveloperCount + 1);

        // Save the updated ServiceContract
        this.serviceContractRepository.save(serviceContract);
        return true;
    }


}
