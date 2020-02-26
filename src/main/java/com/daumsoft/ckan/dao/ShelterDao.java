package com.daumsoft.ckan.dao;

import java.util.List;

import javax.sql.DataSource;

import com.daumsoft.ckan.dto.Shelter;

import static com.daumsoft.ckan.sql.Sql.*;

import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Repository;

/**
 * Shelter 관련 테이블에 접근하는 객체
 * 
 * @author Lee Seungwoo
 * @version 1.0
 * @since 2020. 2. 26.
 */
@Repository
public class ShelterDao {
    private NamedParameterJdbcTemplate jdbc;
    private RowMapper<Shelter> rowMapper = BeanPropertyRowMapper.newInstance(Shelter.class);
    private static final float LIMIT = 0.1f;

    public ShelterDao(DataSource dataSource) {
        this.jdbc = new NamedParameterJdbcTemplate(dataSource);
    }

    /**
     * 해당 위도, 경도의 제한 범위에 모든 로우 조회
     * 
     * @param limitla 위도
     * @param limitlo 경도
     * @return 조건을 만족하는 모든 로우들의 리스트
     */
    public List<Shelter> getFirstMarkerData(float limitla, float limitlo) {
        MapSqlParameterSource params = new MapSqlParameterSource();
        params.addValue("laLow", limitla - LIMIT);
        params.addValue("laHigh", limitla + LIMIT);
        params.addValue("loLow", limitlo - LIMIT);
        params.addValue("loHigh", limitlo + LIMIT);
        return jdbc.query(SELECT_FIRST, params, rowMapper);
    }

    public List<Shelter> getOtherMarkerData(float limitla, float limitlo) {
        MapSqlParameterSource params = new MapSqlParameterSource();
        params.addValue("laLow", limitla - LIMIT);
        params.addValue("laHigh", limitla + LIMIT);
        params.addValue("loLow", limitlo - LIMIT);
        params.addValue("loHigh", limitlo + LIMIT);
        return jdbc.query(SELECT_OTHERS, params, rowMapper);
    }
}