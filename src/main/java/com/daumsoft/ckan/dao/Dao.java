package com.daumsoft.ckan.dao;

import java.util.Collections;
import java.util.List;

import javax.sql.DataSource;

import com.daumsoft.ckan.dto.Dto;

import static com.daumsoft.ckan.sql.Sql.*;

import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class Dao {
    private NamedParameterJdbcTemplate jdbc;
    private RowMapper<Dto> rowMapper = BeanPropertyRowMapper.newInstance(Dto.class);
    private float limit = 0.1f;

    public Dao(DataSource dataSource) {
        this.jdbc = new NamedParameterJdbcTemplate(dataSource);
    }

    public List<Dto> selectAll() {
        return jdbc.query(SELECT_ALL, Collections.emptyMap(), rowMapper);
    }

    public List<Dto> getFirstMarkerData(float limitla, float limitlo) {
        MapSqlParameterSource params = new MapSqlParameterSource();
        params.addValue("laLow", limitla - limit);
        params.addValue("laHigh", limitla + limit);
        params.addValue("loLow", limitlo - limit);
        params.addValue("loHigh", limitlo + limit);
        return jdbc.query(SELECT_FIRST, params, rowMapper);
    }

    public List<Dto> getOtherMarkerData(float limitla, float limitlo) {
        MapSqlParameterSource params = new MapSqlParameterSource();
        params.addValue("laLow", limitla - limit);
        params.addValue("laHigh", limitla + limit);
        params.addValue("loLow", limitlo - limit);
        params.addValue("loHigh", limitlo + limit);
        return jdbc.query(SELECT_OTHERS, params, rowMapper);
    }
}