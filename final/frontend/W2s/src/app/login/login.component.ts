import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: any = {
    username: null,
    password: null,
    role:null
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];

  constructor(private authService: AuthService, private tokenStorage: TokenStorageService,private router: Router) { }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
    }
  }
  onBtnClick(){
    this.router.navigate(['/register']);
  }

  onSubmit(): void {
    const { email, password,role } = this.form;

    this.authService.login(email, password,role).subscribe(
      data => {
        // localStorage.setItem('user', JSON.stringify(data));
        console.log("sssssssssssss",data.accessToken)
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);
        

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getUser().roles;
        this.reloadPage();
        // if(data.role == 'employee'){
        //   this.router.navigate(['/user']);
        // }
        // else if(data.role == 'admin'){
        //   this.router.navigate(['/admin']);
        // }
      },
      err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      },
      
    );
  }

  reloadPage(): void {
    window.location.reload();
  }
}
