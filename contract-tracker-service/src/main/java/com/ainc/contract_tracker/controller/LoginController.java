package com.ainc.contract_tracker.controller;

import com.ainc.contract_tracker.dto.LoginRequestDTO;
import com.ainc.contract_tracker.dto.LoginResponseDTO;
import com.ainc.contract_tracker.model.Employee;
import com.ainc.contract_tracker.service.AuthenticationService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.nio.file.AccessDeniedException;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping(path = "api/v1/auth/login")
@AllArgsConstructor
public class LoginController {
    private final AuthenticationService authenticationService;

    @PostMapping
    public ResponseEntity<LoginResponseDTO> login(@RequestBody @Valid LoginRequestDTO loginRequestDTO) throws Exception {
        var authResult = this.authenticationService.authenticate(loginRequestDTO);

//        Cookie cookie = new Cookie("authorization", authResult.getToken());
//        cookie.setMaxAge(7 * 24 * 60 * 60); // 1 week
//        cookie.setPath("/");
//        cookie.setSecure(false);
//        cookie.setHttpOnly(true);
//        cookie.setAttribute("SameSite", "None");
//        response.addCookie(cookie);

        return new ResponseEntity<>(authResult, HttpStatus.OK);
    }


}
