package com.theduckhospital.api.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;
import org.hibernate.annotations.Nationalized;

@Entity
@Data
@JsonIgnoreProperties(value = {"hibernateLazyInitializer", "handler"})
public class Nation {
    @Id
    private int nationId;

    @Nationalized
    private String nationName;
}
