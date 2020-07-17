import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dialog-json',
  templateUrl: './dialog-json.component.html',
  styleUrls: ['./dialog-json.component.scss']
})
export class DialogJsonComponent implements OnInit {

  constructor(
    private http: HttpClient,
    public dialogRef: MatDialogRef<DialogJsonComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any){}

  ngOnInit() {
  }

  jsonContent = this.data.json;

  close() {
    this.dialogRef.close({ });
  }

  doingJsonUrl = "/Home/PostData";
  backupJsonUrl = "/Home/BackupData";

  postJson(json: ApiModel.SystemJson): Observable<HttpResponse<any>> {
    let httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8'
    });
    return this.http.post<ApiModel.DoingJson>(this.doingJsonUrl, json,
      {
        headers: httpHeaders,
        observe: 'response'
      }
    );
  }

  backupJsonFunc(json: ApiModel.SystemJson): Observable<HttpResponse<any>> {
    let httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8'
    });
    return this.http.post<ApiModel.DoingJson>(this.backupJsonUrl, json,
      {
        headers: httpHeaders,
        observe: 'response'
      }
    );
  }

  saveJson() {
    let json = {
      Id: 1, Json: this.jsonContent 
    };
    this.postJson(json).subscribe(res => {
      let result: any = res.body;
      console.log("Result: "+result);
      console.log("Content Type: "+res.headers.get('Content-Type'));
    },
      err => {
        console.log(err);
      }
    );
  }

  backupJson() {
    let json = {
      Id: 1, Json: this.jsonContent
    };
    this.backupJsonFunc(json).subscribe(res => {
      let result: any = res.body;
      console.log("Result: " + result);
      console.log("Content Type: " + res.headers.get('Content-Type'));
    },
      err => {
        console.log(err);
      }
    );
  } 

  saveChanges() {
    this.saveJson();
    this.dialogRef.close({});
  }

  backup() {
    this.backupJson();
    this.dialogRef.close({});
  }
}
