package com.daumsoft.ckan.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * 로그인 페이지 컨트롤러
 * 
 * @author Han Jewan
 * @version 1.0
 * @since 2020. 2. 26.
 */
@Controller
public class LoginController {

    /**
     * login 페이지 반환
     *
     * @return login에 해당하는 view 페이지
     */
    @RequestMapping("/login")
    public String login() {
        return "login";
    }

    /**
     * signup 페이지 반환
     *
     * @return signup에 해당하는 view 페이지
     */
    @RequestMapping("/signup")
    public String signup() {
        return "signup";
    }
    @RequestMapping("/password")
    public String password(){
        return "changePassword";
    }
}
