package com.theduckhospital.api.controller.headnurse;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/head-nurse/schedules")
@PreAuthorize("hasRole('ROLE_HEAD_NURSE')")
public class ScheduleHeadNurseController {
}
