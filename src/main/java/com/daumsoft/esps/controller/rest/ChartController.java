package com.daumsoft.esps.controller.rest;

import java.util.List;

import com.daumsoft.esps.dto.EqInfo;
import com.daumsoft.esps.service.ChartService;
import com.daumsoft.esps.util.CkanUtil;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

/**
 * 차트 관련 API
 * 
 * @author Han Jewan
 * @version 1.0
 * @since 2020. 2. 27.
 */
@RestController
@RequestMapping("/data/chart")
public class ChartController {

    @Autowired
    private ChartService chartService;

    /**
     * 지진 현황 데이터 가져옴
     * 
     * @return 가공된 지진 현황 데이터
     */
    @GetMapping(value = "/earthquake")
    public String getEarthquakeCharts() {
        List<EqInfo> eqinfo = chartService.getEqChartDatas();
        return CkanUtil.eqchartMapper(eqinfo);
    }
}