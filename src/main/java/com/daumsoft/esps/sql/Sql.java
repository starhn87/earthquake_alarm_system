package com.daumsoft.esps.sql;

/**
 * Shelter와 지진 현황 관련 쿼리문
 * 
 * @author Lee Seungwoo
 * @version 1.0
 * @since 2020. 2. 26.
 */
public class Sql {
    public static final String SELECT_FROM_EARTHQUAKE_TABLE = " SELECT "
                + " * " 
            + " FROM " 
                + " earthquake_table ";

    public static final String SELECT_FIRST = " SELECT "
                + " * " 
            + " FROM "
                + " shelter_table "
            + " WHERE "
                + " (latitude >= :laLow AND latitude <= :laHigh) "
            + " AND " 
                + " (longitude >= :loLow AND longitude <= :loHigh) ";
                
    public static final String SELECT_OTHERS = "SELECT "
                + " * " 
            + " FROM "
                + " shelter_table "
            + " WHERE "
                + " latitude < :laLow "
            + " OR "
                + " latitude > :laHigh "
            + " OR "
                + " longitude < :loLow "
            + " OR "
                + " longitude > :loHigh;";
}