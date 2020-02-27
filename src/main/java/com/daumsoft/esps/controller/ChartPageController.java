package com.daumsoft.esps.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * 차트 페이지 컨트롤러
 * 
 * @author Han Jewan
 * @version 1.0
 * @since 2020. 2. 27.
 */
@Controller
public class ChartPageController {

    /**
     * 차트 페이지 반환
     *
     * @return 차트에 해당하는 view 페이지
     */
    @RequestMapping("/chartPage")
    public String chartPage() {
        return "chart";
    }
}