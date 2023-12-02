package com.theduckhospital.api.controller.admin;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/admin/departments")
@PreAuthorize("hasRole('ROLE_ADMIN')")
public class DepartmentAdminController {
}
