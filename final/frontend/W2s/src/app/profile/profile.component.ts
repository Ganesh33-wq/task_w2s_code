import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../_services/token-storage.service';
import { TaskService } from '../_services/task.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  currentUser: any;
  task_list: any;
  notifications!: any;

  constructor(private taskService: TaskService,private tokenStorageService: TokenStorageService,private token: TokenStorageService) {
   }

  ngOnInit(): void {
    this.currentUser = this.token.getUser();
    const user = this.tokenStorageService.getUser();
    // console.log("pppppppppppppp",user.email)
    // this.taskService.getemp_task(user.email).subscribe(
    //   data => {
    //     this.task_list=data
    //     console.log("uuuuuuuuuuuuuuuuu",data)
    //   });
    console.log("rrrrrrrrrrrrrrrrrrrrrr",user)

    this.taskService.getNotifications(user.email).subscribe(notifications => {
      this.notifications = notifications;
      console.log("hhhhhhhhhhhhhhhhhhh",this.notifications)
    });
    if(this.notifications.length !=0){
        const notification = new Notification('Notification for TASK', {
          body:this.notifications['titile'] +'assigen task your admin  please completed end date' +this.notifications['updated'],
          icon: 'path/to/icon.png' 
        });
  
        notification.onclick = (event) => {
          event.preventDefault();
          // Handle notification click event if needed
      };

    }
    
  }
  removeNotification(index: number) {
    /////
  }
  
}
