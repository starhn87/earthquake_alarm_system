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

@Repository
public class ShelterDao {
    private NamedParameterJdbcTemplate jdbc;
    private RowMapper<Shelter> rowMapper = BeanPropertyRowMapper.newInstance(Shelter.class);
    private float limit = 0.1f;

    public ShelterDao(DataSource dataSource) {
        this.jdbc = new NamedParameterJdbcTemplate(dataSource);
    }

    public List<Shelter> getFirstMarkerData(float limitla, float limitlo) {
        MapSqlParameterSource params = new MapSqlParameterSource();
        params.addValue("laLow", limitla - limit);
        params.addValue("laHigh", limitla + limit);
        params.addValue("loLow", limitlo - limit);
        params.addValue("loHigh", limitlo + limit);
        return jdbc.query(SELECT_FIRST, params, rowMapper);
    }

    public List<Shelter> getOtherMarkerData(float limitla, float limitlo) {
        MapSqlParameterSource params = new MapSqlParameterSource();
        params.addValue("laLow", limitla - limit);
        params.addValue("laHigh", limitla + limit);
        params.addValue("loLow", limitlo - limit);
        params.addValue("loHigh", limitlo + limit);
        return jdbc.query(SELECT_OTHERS, params, rowMapper);
    }
}