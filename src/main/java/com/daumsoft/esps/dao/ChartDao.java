package com.daumsoft.esps.dao;

import java.util.Collections;
import java.util.List;

import javax.sql.DataSource;

import com.daumsoft.esps.dto.EqInfo;

import static com.daumsoft.esps.sql.Sql.*;

import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

/**
 * chart 관련 테이블에 접근하는 객체
 * 
 * @author Lee Seungwoo
 * @version 1.0
 * @since 2020. 2. 26.
 */
@Repository
public class ChartDao {
    private final NamedParameterJdbcTemplate jdbc;
    private RowMapper<EqInfo> rowMapper = BeanPropertyRowMapper.newInstance(EqInfo.class);

    public ChartDao(DataSource dataSource) {
        this.jdbc = new NamedParameterJdbcTemplate(dataSource);
    }

    /**
     * 지진 현황 정보의 모든 로우 조회
     * 
     * @param limitla 위도
     * @param limitlo 경도
     * @return 조건을 만족하는 모든 로우들의 리스트
     */
    @Transactional(readOnly = true)
    public List<EqInfo> getEqChartDatas() {
        return jdbc.query(SELECT_FROM_EARTHQUAKE_TABLE, Collections.emptyMap(), rowMapper);
    }

}