package com.ainc.contract_tracker.controller;


import com.ainc.contract_tracker.dto.ServiceContractResponseDTO;
import com.ainc.contract_tracker.model.ServiceContract;
import com.ainc.contract_tracker.service.ServiceContractService;
import jakarta.websocket.server.PathParam;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(path = "api/v1/service-contracts")
@AllArgsConstructor
public class FilterServiceContractController {

    private final ServiceContractService serviceContractService;
    private final ModelMapper modelMapper;


    @GetMapping
    public ResponseEntity<List<ServiceContractResponseDTO>> filterServiceContracts(@PathParam("") String key) {
        var serviceContracts = this.serviceContractService.searchContract(key);

        return ResponseEntity.ok(serviceContracts.stream()
                .map(sc -> modelMapper.map(sc, ServiceContractResponseDTO.class)).toList());
    }
}
