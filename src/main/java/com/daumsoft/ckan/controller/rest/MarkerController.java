package com.daumsoft.ckan.controller.rest;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import com.daumsoft.ckan.dto.Dto;
import com.daumsoft.ckan.service.MainService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;

@RestController
@RequestMapping("/shelter")
public class MarkerController {

    @Autowired
    private MainService mainService;

    @GetMapping(value = "/Marker")
    public void getMethodName() {
        List<Dto> dtos = mainService.getDatas();
        for (Dto dto : dtos) {
            System.out.println(dto.getName());
        }
    }
    // @GetMapping(value="/Marker/{}")

}