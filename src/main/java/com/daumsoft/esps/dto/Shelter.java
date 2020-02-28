package com.daumsoft.esps.dto;

import lombok.Getter;
import lombok.Setter;

/**
 * Shelter DTO
 * 
 * @author Lee Seungwoo
 * @version 1.0
 * @since 2020. 2. 26.
 */
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