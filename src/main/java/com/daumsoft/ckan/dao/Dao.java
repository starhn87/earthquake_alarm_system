package com.daumsoft.ckan.dao;

import java.util.Collections;
import java.util.List;

import javax.sql.DataSource;

import static com.daumsoft.ckan.sql.Sql.SELECT_ALL;

import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class Dao {
    private NamedParameterJdbcTemplate jdbc;
    private RowMapper<Dao> rowMapper = BeanPropertyRowMapper.newInstance(Dao.class);

    public Dao(DataSource dataSource) {
        this.jdbc = new NamedParameterJdbcTemplate(dataSource);
    }

    public List<Dao> selectAll() {
        return jdbc.query(SELECT_ALL, Collections.emptyMap(), rowMapper);
    }
}