package com.ainc.contract_tracker.exception;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.IOException;
import java.io.Serial;
import java.io.Serializable;

@Data
@NoArgsConstructor
public class Error implements Serializable {
    @Serial
    private static final long serialVersionUID = 999L;

    @JsonProperty("status")
    private int status;

    @JsonProperty("message")
    private Object message;

    public void setMessage(String message) {
        ObjectMapper mapper = new ObjectMapper();
        try {
            // Try to parse the message as JSON
            this.message = mapper.readTree(message);
        } catch (JsonProcessingException e) {
            // If parsing fails, store it as a regular string
            this.message = message;
        }
    }

    @JsonProperty("message")
    public Object getMessage() {
        if (message instanceof JsonNode) {
            return message;
        } else {
            return message.toString();
        }
    }

}