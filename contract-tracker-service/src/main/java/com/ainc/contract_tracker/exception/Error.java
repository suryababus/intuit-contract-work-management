package com.ainc.contract_tracker.exception;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Data;

import java.io.Serializable;

@Data
@Builder
public class Error implements Serializable {
    private static final long serialVersionUID = 999L;

    @JsonProperty("status")
    private int status;

    @JsonProperty("message")
    private String message;


}