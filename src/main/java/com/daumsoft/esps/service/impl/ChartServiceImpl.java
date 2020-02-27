package com.daumsoft.esps.service.impl;

import java.util.List;

import com.daumsoft.esps.dao.ChartDao;
import com.daumsoft.esps.dto.EqInfo;
import com.daumsoft.esps.service.ChartService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * Category 관련 수행될 기능 정의
 * 
 * @author Lee Seungwoo
 * @version 1.0
 * @param <EqInfo>
 * @since 2019. 7. 24.
 */
@Service
public class ChartServiceImpl implements ChartService {

    @Autowired
    private ChartDao chartDao;

    /**
     * {@inheritDoc}
     */
    @Override
    public List<EqInfo> getEqChartDatas() {
        return chartDao.getEqChartDatas();
    }
}
