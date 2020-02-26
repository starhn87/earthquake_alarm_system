package com.daumsoft.ckan.service;

import java.util.List;

import com.daumsoft.ckan.dto.Dto;

public interface MainService {

    List<Dto> getDatas();
    List<Dto> getFirstDatas(float pivotx, float pivoty);
    List<Dto> getOtherDatas(float pivotx, float pivoty);
}