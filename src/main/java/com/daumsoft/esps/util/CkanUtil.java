package com.daumsoft.esps.util;

import java.util.List;

import com.daumsoft.esps.dto.EqInfo;
import com.daumsoft.esps.dto.Shelter;

import org.json.simple.JSONObject;

/**
 * ckan 연동을 위한 shelter 관련 mapper
 */
public class CkanUtil {

    /**
     * 대피소 데이터를 가져와 가공
     * 
     * @param shelters 대피소 데이터 목록
     * @return 가공된 대피소 데이터 목록
     */
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

    /**
     * 지진 현황 데이터를 가져와 가공
     * 
     * @param eqinfos 지진 현황 데이터 목록
     * @return 가공된 지진 현황 데이터 목록
     */
    @SuppressWarnings("unchecked")
    public static String eqchartMapper(List<EqInfo> eqinfos) {
        StringBuilder ret = new StringBuilder("[");

        boolean init = true;

        for (EqInfo info : eqinfos) {
            if (init) {
                init = false;
            } else {
                ret.append(",");
            }

            JSONObject tmp = new JSONObject();
            tmp.put("id", info.getId());
            tmp.put("area", info.getArea());
            tmp.put("level", info.getLevel());
            tmp.put("frequency", info.getFrequency());
            tmp.put("year", info.getYear());
            ret.append(tmp.toString());

        }
        ret.append("]");
        return ret.toString();
    }
}