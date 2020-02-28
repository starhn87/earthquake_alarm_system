package com.daumsoft.esps.dto;

import lombok.*;

/**
 * EarthquakeInformation DTO
 * 
 * @author Lee Seungwoo
 * @version 1.0
 * @since 2020. 2. 27.
 */
@Setter
@Getter
public class EqInfo {
	private long id;
	private String area;
	private int level;
	private int frequency;
	private String year;
}