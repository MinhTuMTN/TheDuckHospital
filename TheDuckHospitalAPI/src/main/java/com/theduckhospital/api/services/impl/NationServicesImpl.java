package com.theduckhospital.api.services.impl;

import com.theduckhospital.api.entity.Nation;
import com.theduckhospital.api.repository.NationRepository;
import com.theduckhospital.api.services.INationServices;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NationServicesImpl implements INationServices {
    private final NationRepository nationRepository;

    public NationServicesImpl(NationRepository nationRepository) {
        this.nationRepository = nationRepository;
    }

    @Override
    public List<Nation> findAll() {
        return nationRepository.findAll();
    }
}
