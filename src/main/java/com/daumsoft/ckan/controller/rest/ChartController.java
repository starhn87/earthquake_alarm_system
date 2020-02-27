package com.daumsoft.ckan.controller.rest;

import java.util.List;

import com.daumsoft.ckan.dto.EqInfo;
import com.daumsoft.ckan.service.ChartService;
import com.daumsoft.ckan.util.CkanUtil;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/data/chart")
public class ChartController {

    @Autowired
    private ChartService chartService;

    /**
     * 
     * @return
     */
    @GetMapping(value = "/earthquake")
    public String getFirstMarkers(){
        List<EqInfo> eqinfo = chartService.getEqChartDatas();
        return CkanUtil.eqchartMapper(eqinfo);
    }
}