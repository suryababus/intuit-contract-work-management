package com.ainc.contract_tracker.controller;


import com.ainc.contract_tracker.model.AuditLog;
import com.ainc.contract_tracker.repository.projectile.AuditLogProjectile;
import com.ainc.contract_tracker.service.AuditLogService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("api/v1/audit-log")
@AllArgsConstructor
public class AuditLogController {
    private final AuditLogService auditLogService;

    @GetMapping(path = "/{id}")
    public ResponseEntity<List<AuditLogProjectile>> getAuditLog(@PathVariable("id") String serviceContractId) {
        return ResponseEntity.ok(this.auditLogService.getAuditLogs(serviceContractId));
    }

}
