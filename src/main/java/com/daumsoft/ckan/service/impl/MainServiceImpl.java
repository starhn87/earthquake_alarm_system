package com.daumsoft.ckan.service.impl;

import java.util.List;

import com.daumsoft.ckan.dao.Dao;
import com.daumsoft.ckan.dto.Dto;
import com.daumsoft.ckan.service.MainService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class MainServiceImpl implements MainService {

    @Autowired
    private Dao dao;

    @Override
    @Transactional(readOnly = true)
    public List<Dto> getDatas() {
        return dao.selectAll();
    }
}