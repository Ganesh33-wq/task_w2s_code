import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Task } from '../_services/task.model';
import { TaskService } from '../_services/task.service';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent implements OnInit {
  taskForm: FormGroup;
  isCompleted: boolean = false
  errorMessage: any;
  name: any;
  Assigent_employeename!: string;

  constructor(private fb: FormBuilder, private taskService: TaskService) {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      Assigent_employeename: ['', Validators.required],
      completed:['', Validators.required],
      timestamp:['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.taskService.getemp_name().subscribe(
      data => {
        this.name=data
        console.log("nameeeeeeeeeeeeeeeee",data)
      });
  }
  taskName!: string;
  taskDescription!: string;
  taskScheduleTime!: string;

  scheduleTask() {
    console.log('Task scheduled:', this.taskName, this.taskDescription, this.taskScheduleTime);
  }

  onSubmit(): void {
    console.log("fffffffff",this.taskForm.value)
    if (this.taskForm.valid) {
      const task: any = {
        id_task: Date.now(),
        title: this.taskForm.value.title,
        description: this.taskForm.value.description,
        completed: this.isCompleted,
        timestamp: this.taskForm.value.timestamp,
        Assigent_employeename: this.taskForm.value.Assigent_employeename
      };
      // consol
      this.taskService.addTask(this.taskForm.value).subscribe(
        data => {
          console.log("ddddddddddddddd",data)
        });
      // this.taskService.addTask(task);
      // this.taskForm.reset();
    }
  }
}
