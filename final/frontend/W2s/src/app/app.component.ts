import { Component } from '@angular/core';
import { TokenStorageService } from './_services/token-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title(title: any) {
    throw new Error('Method not implemented.');
  }
  private roles: string[] = [];
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username?: string;

  constructor(private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
     
    console.log("ppppppppppppppppppppp",this.isLoggedIn)
    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.role;

      this.showAdminBoard = this.roles.includes('admin');
      this.showModeratorBoard = this.roles.includes('employee');
      console.log("fffffffffffffffffffff",this.showAdminBoard )
      console.log("sssssssssssssssssssssssssssssss",this.showModeratorBoard )


      this.username = user.username;
    }
    const savedData = localStorage.getItem('user');
    console.log("dddddddddddddddddddddd",savedData)
    // const data = JSON.parse(savedData);
  }

  logout(): void {
    this.tokenStorageService.signOut();
    window.location.reload();
  }
}
