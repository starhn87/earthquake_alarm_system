package com.daumsoft.eas.service.impl;

import java.util.List;

import com.daumsoft.eas.dao.ShelterDao;
import com.daumsoft.eas.dto.Shelter;
import com.daumsoft.eas.service.MainService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Category 관련 수행될 기능 정의
 * 
 * @author Lee Seungwoo
 * @version 1.0
 * @since 2019. 7. 24.
 */

@Service
public class MainServiceImpl implements MainService {

    @Autowired
    private ShelterDao shelterDao;

    /**
     * {@inheritDoc}
     */
    @Override
    @Transactional(readOnly = true)
    public List<Shelter> getFirstDatas(float pivotx, float pivoty) {
        return shelterDao.getFirstMarkerData(pivotx, pivoty);
    }

    /**
     * {@inheritDoc}
     */
    @Override
    @Transactional(readOnly = true)
    public List<Shelter> getOtherDatas(float pivotx, float pivoty) {
        return shelterDao.getOtherMarkerData(pivotx, pivoty);
    }
}