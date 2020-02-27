package com.daumsoft.ckan.sql;

/**
 * Shelter 관련 쿼리문
 * 
 * @author Lee Seungwoo
 * @version 1.0
 * @since 2020. 2. 26.
 */
public class Sql {
    /**
     *
     */
    public static final String SELECT_FROM_EARTHQUAKE_TABLE = "SELECT "
     + " *" 
    + " FROM" 
    + " earthquake_table;";
    public static final String SELECT_FIRST = "SELECT * FROM shelter_table WHERE (latitude >= :laLow and latitude <= :laHigh) and (longitude >= :loLow and longitude <= :loHigh) ";
    public static final String SELECT_OTHERS = "SELECT * FROM shelter_table WHERE latitude < :laLow or latitude > :laHigh or longitude < :loLow or longitude > :loHigh;";
}