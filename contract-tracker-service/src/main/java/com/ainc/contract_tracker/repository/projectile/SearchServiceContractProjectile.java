package com.ainc.contract_tracker.repository.projectile;

import com.ainc.contract_tracker.model.Employee;
import com.ainc.contract_tracker.model.ServiceContractStatusEnum;

public interface SearchServiceContractProjectile {
    String getId();

    String getTitle();

    String getDescription();

    ServiceContractStatusEnum getStatus();


    Integer getDeveloperCountRequired();


    Integer getCurrentDeveloperCount();

    Employee getOwner();

    boolean getIsDeleted();

}
