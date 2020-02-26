package com.daumsoft.ckan.controller.rest;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import com.daumsoft.ckan.dto.Shelter;
import com.daumsoft.ckan.service.MainService;
import com.daumsoft.ckan.util.CkanUtil;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;

@RestController
@RequestMapping("/shelter")
public class MarkerController {

    @Autowired
    private MainService mainService;

    @GetMapping(value = "/Marker/first")
    public String getFirstMarkers(@RequestParam("latitude") float latitude,
            @RequestParam("longitude") float longitude) {
        List<Shelter> shelters = mainService.getFirstDatas(latitude, longitude);
        return CkanUtil.shelterCoordinatesMapper(shelters);
    }

    @GetMapping(value = "/Marker/others")
    public String getOtherMarkers(@RequestParam("latitude") float latitude,
            @RequestParam("longitude") float longitude) {
        List<Shelter> shelters = mainService.getOtherDatas(latitude, longitude);
        return CkanUtil.shelterCoordinatesMapper(shelters);
    }
}