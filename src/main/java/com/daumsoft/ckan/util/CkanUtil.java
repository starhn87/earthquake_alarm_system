package com.daumsoft.ckan.util;

import java.util.List;

import com.daumsoft.ckan.dto.EqInfo;
import com.daumsoft.ckan.dto.Shelter;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;

// import org.json.simple.JSONArray;
// import org.json.simple.parser.JSONParser;

/**
 * ckan 연동을 위한 shelter 관련 mapper
 */
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

    public static String eqchartMapper(List<EqInfo> eqinfos) {
        StringBuilder ret=new StringBuilder("[");
        
        boolean init=true;

        for (EqInfo info : eqinfos) {
            if(init){
                init=false;
            }else{
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