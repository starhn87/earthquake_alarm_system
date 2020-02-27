package com.daumsoft.eas.dto;

import lombok.*;

/**
 * Shelter DTO
 * 
 * @author Lee Seungwoo
 * @version 1.0
 * @since 2020. 2. 26.
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