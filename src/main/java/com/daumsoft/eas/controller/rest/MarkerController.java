package com.daumsoft.eas.controller.rest;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import com.daumsoft.eas.dto.Shelter;
import com.daumsoft.eas.service.MarkerService;
import com.daumsoft.eas.util.CkanUtil;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;

/**
 * 마커 관련 API
 * 
 * @author Han Jewan
 * @version 1.0
 * @since 2020. 2. 26.
 */
@RestController
@RequestMapping("/shelter")
public class MarkerController {

    @Autowired
    private MarkerService markerService;

    /**
     * 
     * @param latitude
     * @param longitude
     * @return
     */
    @GetMapping(value = "/Marker/first")
    public String getFirstMarkers(@RequestParam("latitude") float latitude,
            @RequestParam("longitude") float longitude) {
        List<Shelter> shelters = markerService.getFirstDatas(latitude, longitude);
        return CkanUtil.shelterCoordinatesMapper(shelters);
    }

    /**
     * 
     * @param latitude
     * @param longitude
     * @return
     */
    @GetMapping(value = "/Marker/others")
    public String getOtherMarkers(@RequestParam("latitude") float latitude,
            @RequestParam("longitude") float longitude) {
        List<Shelter> shelters = markerService.getOtherDatas(latitude, longitude);
        return CkanUtil.shelterCoordinatesMapper(shelters);
    }
}