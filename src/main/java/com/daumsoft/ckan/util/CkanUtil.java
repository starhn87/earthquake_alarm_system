package com.daumsoft.ckan.util;

import java.util.List;

import com.daumsoft.ckan.dto.Shelter;

public class CkanUtil {

    public static String shelterCoordinatesMapper(List<Shelter> shelters) {
        StringBuilder ret = new StringBuilder("");

        boolean init = true;

        ret.append("{\"type\":\"shelterMarker\",\"datas\":[");
        for (Shelter shelter : shelters) {
            if (init) {
                init = false;
            } else {
                ret.append(",");
            }
            ret.append("{\"id\":");
            ret.append(shelter.getId());
            ret.append(",\"phone\":\"");
            ret.append(shelter.getPhoneNumber());
            ret.append("\",\"capacity\":\"");
            ret.append(shelter.getMaxCapacity());
            ret.append("\",\"jibun\":\"");
            ret.append(shelter.getJibunAddress());
            ret.append("\",\"coordinates\":[");
            ret.append(shelter.getLatitude());
            ret.append(",");
            ret.append(shelter.getLongitude());
            ret.append("],\"name\":\"");
            ret.append(shelter.getName());
            ret.append("\"}");
        }
        ret.append("]}");

        return ret.toString();
    }
}