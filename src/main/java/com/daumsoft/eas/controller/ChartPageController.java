package com.daumsoft.eas.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

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