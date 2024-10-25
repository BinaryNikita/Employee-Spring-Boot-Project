package com.employeeproject.employeeprojectdemo;

import java.util.List;;

public interface EmployeeService {
    String createEmployee(Employee employee);
    List<Employee> readEmployee();
    boolean deleteEmployee(Long id);
    String updateEmployee(Long id , Employee employee);
    Employee readEmploye(Long id);
}
