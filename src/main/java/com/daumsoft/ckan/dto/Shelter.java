package com.daumsoft.ckan.dto;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class Shelter {
    private long id;
    private String name;
    private String category;
    private String doroAddress;
    private String jibunAddress;
    private float latitude;
    private float longitude;
    private float acceptanceArea;
    private int maxCapacity;
    private boolean operationStatus;
    private String phoneNumber;
    private String institutionName;
}