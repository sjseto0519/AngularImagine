import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dialog-login',
  templateUrl: './dialog-login.component.html',
  styleUrls: ['./dialog-login.component.scss']
})
export class DialogLoginComponent implements OnInit {

  constructor(
    private http: HttpClient,
    public dialogRef: MatDialogRef<DialogLoginComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any){}

  ngOnInit() {
  }

  username: string;
  password: string;
  isAuthenticated: boolean;

  close() {
    this.dialogRef.close({ });
  }

  doingJsonUrl = "/Home/PostLogin";

  postJson(json: ApiModel.LoginJson): Observable<HttpResponse<any>> {
    let httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8'
    });
    return this.http.post<ApiModel.LoginJson>(this.doingJsonUrl, json,
      {
        headers: httpHeaders,
        observe: 'response'
      }
    );
  }

  loginFunc() {
    let json = {
      UserId: this.username, UserPassword: this.password, FirstName: 'Scott', LastName:"Seto" 
    };
    this.postJson(json).subscribe(res => {
      let result: any = res.body;
      if (result.indexOf("Success") > -1) {
        this.isAuthenticated = true;
      }
      console.log("Result: "+result);
      this.dialogRef.close({ isAuthenticated: this.isAuthenticated });
    },
      err => {
        console.log(err);
      }
    );
  } 

  login() {
    this.loginFunc();
    
  }
}
