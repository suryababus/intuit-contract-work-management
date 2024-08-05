package com.ainc.contract_tracker.service;


import com.ainc.contract_tracker.dto.CreateServiceContractDTO;
import com.ainc.contract_tracker.dto.UpdateServiceContractDTO;
import com.ainc.contract_tracker.model.*;
import com.ainc.contract_tracker.repository.EmployeeRepository;
import com.ainc.contract_tracker.repository.ServiceContractRepository;
import com.ainc.contract_tracker.repository.ServiceContractToEmployeesRepository;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.webjars.NotFoundException;

import java.nio.file.AccessDeniedException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
@AllArgsConstructor
public class ServiceContractService {
    private final ServiceContractRepository serviceContractRepository;
    private final ContractWorkerService contractWorkerService;
    private final ModelMapper modelMapper;
    private final AuthenticationService authenticationService;
    private final ServiceContractToEmployeesRepository serviceContractToEmployeesRepository;
    private final EmployeeRepository employeeRepository;

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
        var pageRequest = PageRequest.of(0,
                10,
                Sort.by("developerCountInNeed").descending());

        var serviceContractSearchProjections = this.serviceContractRepository.findAllByTitleContainsIgnoreCase(key, pageRequest);
        return serviceContractSearchProjections.stream()
                .map(sCP -> this.modelMapper.map(sCP, ServiceContract.class))
                .toList();
    }

    @Transactional
    public boolean assignEmployeeToContract(Long employeeId, String serviceContractId, Integer bandWidth) throws AccessDeniedException {

        var currentEmployee = this.authenticationService.getCurrentUser();


        // Fetch the existing ServiceContract
        ServiceContract serviceContract = serviceContractRepository.findById(serviceContractId)
                .orElseThrow(() -> new NotFoundException("ServiceContract not found"));


        // Throw if the owner is not the person trying to change it.
        if (!Objects.equals(currentEmployee.getEmail(), serviceContract.getOwner().getEmail())) {
            throw new AccessDeniedException("Only the owner of the service contract can edit it");
        }


        // Check if the service contract is active
        if (serviceContract.getStatus() != ServiceContractStatusEnum.ACTIVE) {
            throw new IllegalStateException("Contract worker can be assigned to only the active service contracts.");
        }

        // Fetch the Employee to be added
        Employee employee = contractWorkerService.getContractWorker(employeeId)
                .orElseThrow(() -> new NotFoundException("Employee not found"));

        //  Check if the employee is already assigned
        if (serviceContract.getEmployees().contains(employee)) {
            throw new IllegalStateException("Employee already assigned to the contract");
        }

        // Check if the employee is active
        if (employee.getStatus() != EmployeeStatusEnum.ACTIVE) {
            throw new IllegalStateException("Only active Contract worker can be assigned to service contracts.");
        }

        if (employee.getAvailableBandwidth() < bandWidth) {
            throw new IllegalStateException("Not enough bandwidth for " + employee.getFirstName());
        }


        // Add the employee to the set
        var newServiceContractToEmployee = new ServiceContractsToEmployees();
        newServiceContractToEmployee.setEmployee(employee);
        newServiceContractToEmployee.setService(serviceContract);
        newServiceContractToEmployee.setBandWidth(bandWidth);
        serviceContractToEmployeesRepository.save(newServiceContractToEmployee);

        employee.setAvailableBandwidth(employee.getAvailableBandwidth() - bandWidth);
        this.employeeRepository.save(employee);


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


    public ServiceContract updateServiceContract(String serviceContractId, UpdateServiceContractDTO updateServiceContractDTO) throws AccessDeniedException {
        var currentEmployee = this.authenticationService.getCurrentUser();


        // Fetch the existing ServiceContract
        ServiceContract serviceContract = serviceContractRepository.findById(serviceContractId)
                .orElseThrow(() -> new NotFoundException("ServiceContract not found"));


        // Throw if the owner is not the person trying to change it.
        if (!Objects.equals(currentEmployee.getEmail(), serviceContract.getOwner().getEmail())) {
            throw new AccessDeniedException("Only the owner of the service contract can edit it");
        }


        this.modelMapper.map(updateServiceContractDTO, serviceContract);


        // Save the updated ServiceContract
        return this.serviceContractRepository.save(serviceContract);

    }
}
