package com.daumsoft.eas.service;

import java.util.List;

import com.daumsoft.eas.dto.EqInfo;

/**
 * Category 관련 수행되어야 할 기능 선언
 * 
 * @author Han Jewan
 * @version 1.0
 * @since 2020. 2. 26.
 */
public interface ChartService {

    /**
     * 먼저 가져와야 하는 데이터를 가져옴
     * 
     * @param pivotx 경도
     * @param pivoty 위도
     * @return 먼저 가져와야 하는 shelter들의 리스트
     */
    List<EqInfo> getEqChartDatas();

}