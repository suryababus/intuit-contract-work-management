package com.ainc.contract_tracker.service;


import com.ainc.contract_tracker.dto.CreateContractWorkerRequestDTO;
import com.ainc.contract_tracker.dto.UpdateContractWorkerDTO;
import com.ainc.contract_tracker.model.Employee;
import com.ainc.contract_tracker.repository.EmployeeRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.modelmapper.ModelMapper;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class ContractWorkerService {

    private final EmployeeRepository employeeRepository;
    private final PasswordEncoder passwordEncoder;
    private final ModelMapper modalMapper;


    public Employee createNewWorker(CreateContractWorkerRequestDTO createContractWorkerRequestDTO) {
        Employee employee = modalMapper.map(createContractWorkerRequestDTO, Employee.class);

        employee.setPassword(passwordEncoder.encode("Testing"));

        return this.employeeRepository.save(employee);

    }


    public Optional<Employee> getContractWorker(Long id) {
        return this.employeeRepository.findById(id);
    }

    public Optional<Employee> getContractWorker(String email) {
        return this.employeeRepository.findByEmail(email);
    }


    public Employee updateEmployee(Long id, UpdateContractWorkerDTO updateContractWorkerDTO) {
        var result = this.employeeRepository.findById(id);

        if (result.isPresent()) {
            var existingEmployee = result.get();
            modalMapper.map(updateContractWorkerDTO, existingEmployee);
            return this.employeeRepository.save(existingEmployee);
        } else {
            throw new IllegalStateException("Employee did not exist");
        }

    }

    public Employee deleteEmployee(Long id) {
        var result = this.employeeRepository.findById(id);

        if (result.isPresent()) {
            var existingEmployee = result.get();
            existingEmployee.setDeleted(true);
            return this.employeeRepository.save(existingEmployee);
        } else {
            throw new IllegalStateException("Employee did not exist");
        }
    }


    public List<Employee> filterEmployee(String key) {
        return this.employeeRepository.search(key);
    }


}
