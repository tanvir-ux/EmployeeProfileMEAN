import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/services/employee.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from 'src/app/models/employee.model';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit {

  currentEmployee: Employee = {
    name: '',
    education: '',
    employment: '',
    published: false
  };
  message = '';

  constructor(
    private employeeService: EmployeeService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.message = '';
    this.getEmployee(this.route.snapshot.params.id);
  }

  getEmployee(id: string): void {
    this.employeeService.get(id)
      .subscribe(
        data => {
          this.currentEmployee = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  updatePublished(status: boolean): void {
    const data = {
      name: this.currentEmployee.name,
      education: this.currentEmployee.education,
      employment: this.currentEmployee.employment,
      published: status
    };

    this.message = '';

    this.employeeService.update(this.currentEmployee.id, data)
      .subscribe(
        response => {
          this.currentEmployee.published = status;
          console.log(response);
          this.message = response.message ? response.message : 'The status was updated successfully!';
        },
        error => {
          console.log(error);
        });
  }

  updateEmployee(): void {
    this.message = '';

    this.employeeService.update(this.currentEmployee.id, this.currentEmployee)
      .subscribe(
        response => {
          console.log(response);
          this.message = response.message ? response.message : 'This employee was updated successfully!';
        },
        error => {
          console.log(error);
        });
  }

  deleteEmployee(): void {
    this.employeeService.delete(this.currentEmployee.id)
      .subscribe(
        response => {
          console.log(response);
          this.router.navigate(['/employees']);
        },
        error => {
          console.log(error);
        });
  }
}