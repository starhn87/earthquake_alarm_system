package com.daumsoft.eas.controller.rest;

import java.util.List;

import com.daumsoft.eas.dto.EqInfo;
import com.daumsoft.eas.service.ChartService;
import com.daumsoft.eas.util.CkanUtil;

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