package com.daumsoft.ckan.controller.rest;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import com.daumsoft.ckan.dto.Dto;
import com.daumsoft.ckan.service.MainService;
import com.daumsoft.ckan.util.CkanUtil;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;

@RestController
@RequestMapping("/shelter")
public class MarkerController {

    @Autowired
    private MainService mainService;

    @GetMapping(value = "/Marker")
    public String getMethodName() {
        List<Dto> dtos = mainService.getDatas();
        return CkanUtil.shelterCoordinatesMapper(dtos);
        /*for (Dto dto : dtos) {
            System.out.println(dto.getName());
        }*/
    }
    @GetMapping(value="/Marker/first")
    public String getFirstMarkers(@RequestParam("latitude") float latitude
                                    ,@RequestParam("longitude") float longitude) {
        List<Dto> dtos = mainService.getFirstDatas(latitude,longitude);
        return CkanUtil.shelterCoordinatesMapper(dtos);
    }

    @GetMapping(value="/Marker/others")
    public String getOtherMarkers(@RequestParam("latitude") float latitude
                                ,@RequestParam("longitude") float longitude) {
        List<Dto> dtos = mainService.getOtherDatas(latitude,longitude);
        return CkanUtil.shelterCoordinatesMapper(dtos);
    }
}