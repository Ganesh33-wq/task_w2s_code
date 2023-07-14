import { Component, OnInit } from '@angular/core';
import { TaskService } from '../_services/task.service';
import { Task } from '../_services/task.model';
import { TokenStorageService } from '../_services/token-storage.service';

@Component({
  selector: 'app-board-admin',
  templateUrl: './board-admin.component.html',
  styleUrls: ['./board-admin.component.css']
})
export class BoardAdminComponent implements OnInit {
  tasks!: Task[];
  currentUser: any;


  constructor(private taskService: TaskService,private token: TokenStorageService) { }

  ngOnInit(): void {
    this.currentUser = this.token.getUser();
    this.taskService.getTasks().subscribe(
      data => {
        this.tasks=data
      });
  }

  deleteTask_value(task:any){
    this.taskService.deleteTask(task.id).subscribe(
      data => {
        this.taskService.getTasks().subscribe(
          data => {
            this.tasks=data
          });
      });
  }

}
