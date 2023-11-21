import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { JwtRequest } from 'src/app/models/jwtRequest';
import { UserorService } from 'src/app/services/useror.service';
import { Useror } from 'src/app/models/useror';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(private loginService: LoginService, private router: Router, private snackBar: MatSnackBar,
    private uS: UserorService) { }
  username: string = ""
  password: string = ""
  mensaje: string = ""
  user:Useror=new Useror()
  ngOnInit(): void {
  }

  login() {
    let request = new JwtRequest();
    request.username = this.username;
    request.password = this.password;
  
    this.loginService.login(request).subscribe(
      (data: any) => {
        sessionStorage.setItem('token', data.jwttoken);
        
        this.uS.getUserByName(this.username).subscribe(
          (user: Useror) => {
            this.user = user;
              this.uS.setCurrentUser(user);
  
            console.log(user);
          },
          (error) => {
            console.log("Error al obtener la información del usuario");
          }
        );
  
        this.router.navigate(['']);
      },
      (error) => {
        this.mensaje = 'Credenciales incorrectas!!!';
        this.snackBar.open(this.mensaje, 'Aviso', { duration: 2000 });
      }
    );
  }
}