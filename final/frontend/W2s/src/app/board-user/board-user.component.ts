import { Component, OnInit } from '@angular/core';
import { TaskService } from '../_services/task.service';
import { TokenStorageService } from '../_services/token-storage.service';

@Component({
  selector: 'app-board-user',
  templateUrl: './board-user.component.html',
  styleUrls: ['./board-user.component.css']
})
export class BoardUserComponent implements OnInit {
  content?: string;
  data_val:any;
  task_list:any;
  data_vale:any;
  currentUser: any;
  constructor(private taskService: TaskService,private tokenStorageService: TokenStorageService,private token: TokenStorageService) { }

  ngOnInit(): void {
    this.currentUser = this.token.getUser();
    const user = this.tokenStorageService.getUser();
    console.log("pppppppppppppp",user.email)
    this.taskService.getemp_task(user.email).subscribe(
      data => {
        this.task_list=data
        console.log("uuuuuuuuuuuuuuuuu",data)
      });
  }
  handleCheckboxClick(id:any) {
    console.log("TRRRRRRRRRueeeeeeeeee")
    this.data_vale ={
      'id':id,
      'completed':true
    }
    this.taskService.updateTask(id,this.data_vale).subscribe(
      data => {
        this.task_list=data
        console.log("uuuuuuuuuuuuuuuuu",data)
        const user = this.tokenStorageService.getUser();
        this.taskService.getemp_task(user.email).subscribe(
          data => {
            this.task_list=data
            console.log("uuuuuuuuuuuuuuuuu",data)
          });
      });
  }
  
}
