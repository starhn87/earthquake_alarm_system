package com.daumsoft.ckan.dao;

import java.util.Collections;
import java.util.List;

import javax.sql.DataSource;

import com.daumsoft.ckan.dto.Dto;

import static com.daumsoft.ckan.sql.Sql.SELECT_ALL;

import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class Dao {
    private NamedParameterJdbcTemplate jdbc;
    private RowMapper<Dto> rowMapper = BeanPropertyRowMapper.newInstance(Dto.class);

    public Dao(DataSource dataSource) {
        this.jdbc = new NamedParameterJdbcTemplate(dataSource);
    }

    public List<Dto> selectAll() {
        return jdbc.query(SELECT_ALL, Collections.emptyMap(), rowMapper);
    }
}