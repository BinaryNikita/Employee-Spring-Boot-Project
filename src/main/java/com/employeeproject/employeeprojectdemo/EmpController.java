package com.employeeproject.employeeprojectdemo;

import org.springframework.web.bind.annotation.RestController;
import java.util.List;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;

@RestController
@CrossOrigin("http://localhost:3000/")
public class EmpController {

    @Autowired
    // EmployeeService employeeService = new EmployeeServiceImp();

    EmployeeService employeeService;

    @GetMapping("employees")
    public List<Employee> getAllEmployees() {
        return employeeService.readEmployee();
    }

    @GetMapping("employees/{id}")
    public Employee getEmployeeById(@PathVariable Long id) {
        return employeeService.readEmploye(id);
    }

    @PostMapping("employees")

    public String createEmployee(@RequestBody Employee employee) {
        employeeService.createEmployee(employee);
        return "Saved Succesfully";

    }

    @DeleteMapping("employees/{id}")

    public String deleteEmployees(@PathVariable Long id) {
        boolean isDeleted = employeeService.deleteEmployee(id); // Only call delete once

        if (isDeleted) {
            return "Deleted successfully";
        } else {
            return "Some error occurred while deleting";
        }

    }

    @PutMapping("employees/{id}")
    public String putMethodName(@PathVariable Long id, @RequestBody Employee employee) {
        employeeService.updateEmployee(id, employee);

        return "Updated Successfully";
    }

}
