package com.daumsoft.tm2.controller;

import com.daumsoft.tm2.service.MapService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/shelter")
public class MapController {
	@Autowired
	MapService service;

	@RequestMapping("/marker")
	public String requestMarker() {
		return service.getAllMarker();
	}
}