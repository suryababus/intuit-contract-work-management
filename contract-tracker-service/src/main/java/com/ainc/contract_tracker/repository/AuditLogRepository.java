package com.ainc.contract_tracker.repository;


import com.ainc.contract_tracker.model.AuditLog;
import com.ainc.contract_tracker.repository.projectile.AuditLogProjectile;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AuditLogRepository extends CrudRepository<AuditLog, String>, PagingAndSortingRepository<AuditLog, String> {
    List<AuditLogProjectile> findAllByAffectedRecord(String id, PageRequest pageRequest);
}
