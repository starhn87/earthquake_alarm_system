package com.daumsoft.ckan.util;

import java.util.List;

import com.daumsoft.ckan.dto.Dto;

public class CkanUtil {

    public static String shelterCoordinatesMapper(List<Dto> datas) {
        StringBuilder ret = new StringBuilder("");

        boolean init = true;

        ret.append("{\"type\":\"shelterMarker\",\"datas\":[");
        for (Dto data : datas) {
            if (init)
                init = false;
            else
                ret.append(",");

            ret.append("{\"id\":");
            ret.append(data.getId());
            ret.append(",\"phone\":\"");
            ret.append(data.getPhoneNumber());
            ret.append("\",\"capacity\":\"");
            ret.append(data.getMaxCapacity());
            ret.append("\",\"jibun\":\"");
            ret.append(data.getJibunAddress());
            ret.append("\",\"coordinates\":[");
            ret.append(data.getLatitude());
            ret.append(",");
            ret.append(data.getLongitude());
            ret.append("],\"name\":\"");
            ret.append(data.getName());
            ret.append("\"}");
        }
        ret.append("]}");

        return ret.toString();
    }
}