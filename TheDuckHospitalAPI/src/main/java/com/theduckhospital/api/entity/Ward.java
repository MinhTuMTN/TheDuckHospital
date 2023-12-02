package com.theduckhospital.api.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Nationalized;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Ward {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int wardId;

    @Nationalized
    private String wardName;

    private boolean deleted = false;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonBackReference
    private District district;
}
