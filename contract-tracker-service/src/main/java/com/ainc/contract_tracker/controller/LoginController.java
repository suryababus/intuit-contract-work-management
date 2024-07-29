package com.ainc.contract_tracker.controller;

import com.ainc.contract_tracker.dto.LoginRequestDTO;
import com.ainc.contract_tracker.dto.LoginResponseDTO;
import com.ainc.contract_tracker.model.Employee;
import com.ainc.contract_tracker.service.AuthenticationService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping(path = "api/v1/auth/login")
@AllArgsConstructor
public class LoginController {
    private final AuthenticationService authenticationService;

    @PostMapping
    public ResponseEntity<LoginResponseDTO> login(@RequestBody LoginRequestDTO loginRequestDTO) {
        try {

            return new ResponseEntity<>(this.authenticationService.authenticate(loginRequestDTO), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }


}
