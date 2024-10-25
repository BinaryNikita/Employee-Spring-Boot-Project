package com.employeeproject.employeeprojectdemo;

import java.util.List;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
@Service
public class EmployeeServiceImp implements EmployeeService {

    @Autowired
    private EmployeeRepository employeeRepository;
    // List<Employee> employees = new ArrayList<>();

    @Override
    public String createEmployee(Employee employee) {
        EmployeeEntity employeeEntity = new EmployeeEntity();
        BeanUtils.copyProperties(employee, employeeEntity);
        employeeRepository.save(employeeEntity);
        // employees.add(employee);
        return "Saved Succesfully";

    }

    @Override
    public List<Employee> readEmployee() {
            List<EmployeeEntity> employeeList = employeeRepository.findAll();
            List<Employee> employees = new ArrayList<>();

            for(EmployeeEntity employeeEntity: employeeList){
                 Employee emp = new Employee();
                 emp.setName(employeeEntity.getName());
                 emp.setEmail(employeeEntity.getEmail());
                 emp.setPhone(employeeEntity.getPhone());
                 emp.setId(employeeEntity.getId());
                 employees.add(emp);
            }
        return employees;
    }

    @Override
    public boolean deleteEmployee(Long id) {
        EmployeeEntity emp = employeeRepository.findById(id).get();
        employeeRepository.delete(emp);
        return true;
    
        // for (EmployeeEntity employee : employees) {
    
        //     if (employee.getId().equals(id)) {
    
        //         // employees.remove(employee);
        //         return true;
        //     }
        // }
    
    }

    @Override
    public String updateEmployee(Long id, Employee employee) {
        EmployeeEntity existingEmployeeEntity = employeeRepository.findById(id).get();
        existingEmployeeEntity.setEmail(employee.getEmail());
        existingEmployeeEntity.setPhone(employee.getPhone());
        existingEmployeeEntity.setName(employee.getName());
        employeeRepository.save(existingEmployeeEntity);
     return "Updated Succesfully";
    }

    @Override
    public Employee readEmploye(Long id) {
EmployeeEntity employeeEntity = employeeRepository.findById(id).get();
Employee employee = new Employee();
BeanUtils.copyProperties(employeeEntity, employee);
return employee;

    }



}


