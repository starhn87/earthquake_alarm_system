package com.daumsoft.esps.controller.rest;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import com.daumsoft.esps.dto.Shelter;
import com.daumsoft.esps.service.MarkerService;
import com.daumsoft.esps.util.CkanUtil;

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
     * 근처 데이터를 비동기적으로 가져옴
     * 
     * @param latitude  위도
     * @param longitude 경도
     * @return 근처에 해당하는 지진해일대피소 데이터 목록
     */
    @GetMapping(value = "/Marker/first")
    public String getFirstMarkers(@RequestParam("latitude") float latitude,
            @RequestParam("longitude") float longitude) {
        List<Shelter> shelters = markerService.getFirstDatas(latitude, longitude);
        return CkanUtil.shelterCoordinatesMapper(shelters);
    }

    /**
     * 전체 데이터를 비동기적으로 가져옴
     * 
     * @param latitude  위도
     * @param longitude 경도
     * @return 전체 지진해일대피소 데이터 목록
     */
    @GetMapping(value = "/Marker/others")
    public String getOtherMarkers(@RequestParam("latitude") float latitude,
            @RequestParam("longitude") float longitude) {
        List<Shelter> shelters = markerService.getOtherDatas(latitude, longitude);
        return CkanUtil.shelterCoordinatesMapper(shelters);
    }
}