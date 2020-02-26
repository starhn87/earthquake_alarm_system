package com.daumsoft.ckan.service.impl;

import java.util.List;

import com.daumsoft.ckan.dao.ShelterDao;
import com.daumsoft.ckan.dto.Shelter;
import com.daumsoft.ckan.service.MainService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class MainServiceImpl implements MainService {

    @Autowired
    private ShelterDao shelterDao;

    @Override
    @Transactional(readOnly = true)
    public List<Shelter> getFirstDatas(float pivotx, float pivoty) {
        return shelterDao.getFirstMarkerData(pivotx, pivoty);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Shelter> getOtherDatas(float pivotx, float pivoty) {
        return shelterDao.getOtherMarkerData(pivotx, pivoty);
    }
}