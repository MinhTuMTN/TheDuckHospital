package com.theduckhospital.api.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;
import org.hibernate.annotations.Nationalized;

@Entity
@Data
public class Nation {
    @Id
    private int nationId;

    @Nationalized
    private String nationName;
}
