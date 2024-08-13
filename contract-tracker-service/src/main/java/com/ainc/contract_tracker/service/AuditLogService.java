package com.ainc.contract_tracker.service;

import com.ainc.contract_tracker.model.AuditLog;
import com.ainc.contract_tracker.model.Employee;
import com.ainc.contract_tracker.repository.AuditLogRepository;
import com.ainc.contract_tracker.repository.projectile.AuditLogProjectile;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class AuditLogService {
    private AuditLogRepository auditLogRepository;
    private AuthenticationService authenticationService;

    public AuditLog addNewLog(String activity, String recordId) {
        var currentUser = this.authenticationService.getCurrentUser();
        var auditLog = new AuditLog();
        auditLog.setActivity(activity);
        auditLog.setPerformedBy(currentUser);
        auditLog.setAffectedRecord(recordId);
        return this.auditLogRepository.save(auditLog);
    }

    public List<AuditLogProjectile> getAuditLogs(String recordId) {
        var pageRequest = PageRequest.of(0, 10, Sort.by("createdAt").descending());
        return this.auditLogRepository.findAllByAffectedRecord(recordId, pageRequest);
    }
}
