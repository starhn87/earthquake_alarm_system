package com.daumsoft.ckan.dao;

import java.util.Collections;
import java.util.List;

import javax.sql.DataSource;

import com.daumsoft.ckan.dto.EqInfo;

import static com.daumsoft.ckan.sql.Sql.*;


import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public class ChartDao {
    private final NamedParameterJdbcTemplate jdbc;
    private RowMapper<EqInfo> rowMapper = BeanPropertyRowMapper.newInstance(EqInfo.class);

    public ChartDao(DataSource dataSource) {
        this.jdbc = new NamedParameterJdbcTemplate(dataSource);
    }

    @Transactional(readOnly = true)
    public List<EqInfo> getEqChartDatas() {
        return jdbc.query(SELECT_FROM_EARTHQUAKE_TABLE, Collections.emptyMap(), rowMapper);
    }

}