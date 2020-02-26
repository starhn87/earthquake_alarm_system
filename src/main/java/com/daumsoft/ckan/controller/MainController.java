package com.daumsoft.ckan.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * 메인 페이지 컨트롤러
 * 
 * @author Lee Seungwoo
 * @version 1.0
 * @since 2020. 2. 26.
 */
@Controller
public class MainController {

	/**
	 * index 페이지 반환
	 *
	 * @return index에 해당하는 view 페이지
	 */
	@RequestMapping("/index")
	public String main() {
		return "index";
	}
}
