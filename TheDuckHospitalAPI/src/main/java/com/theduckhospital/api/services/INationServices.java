package com.theduckhospital.api.services;

import com.theduckhospital.api.entity.Nation;

import java.util.List;

public interface INationServices {
    List<Nation> findAll();
}
