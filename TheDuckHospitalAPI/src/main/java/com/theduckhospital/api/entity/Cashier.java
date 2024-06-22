package com.theduckhospital.api.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import lombok.Getter;
import lombok.Setter;
import org.apache.commons.lang3.builder.ToStringExclude;

import java.util.List;

@Getter
@Setter
@Entity
@DiscriminatorValue("Cashier")
public class Cashier extends Staff {
    @OneToMany(mappedBy = "cashier")
    @JsonBackReference
    @ToStringExclude
    private List<Transaction> transactions;
}
