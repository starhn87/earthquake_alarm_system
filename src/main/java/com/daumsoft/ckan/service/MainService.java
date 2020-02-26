package com.daumsoft.ckan.service;

import java.util.List;

import com.daumsoft.ckan.dto.Shelter;

public interface MainService {

    List<Shelter> getFirstDatas(float pivotx, float pivoty);

    List<Shelter> getOtherDatas(float pivotx, float pivoty);
}