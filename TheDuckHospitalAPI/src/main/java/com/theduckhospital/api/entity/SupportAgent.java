package com.theduckhospital.api.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import lombok.*;
import org.apache.commons.lang3.builder.ToStringExclude;

import java.util.List;

@Entity
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class SupportAgent extends Staff{
    @OneToMany(mappedBy = "supportAgent")
    @JsonBackReference
    @ToStringExclude
    private List<Conversation> conversations;
}
