import { Component, OnInit } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import deedsObj from '../assets/json/deeds.json';
import {
  MatDialog,
  MatDialogConfig
} from "@angular/material";
import { DialogBodyComponent } from './dialog-body/dialog-body.component';
import { DialogJsonComponent } from './dialog-json/dialog-json.component';
import { DialogLoginComponent } from './dialog-login/dialog-login.component';
import { DialogInfoComponent } from './dialog-info/dialog-info.component';
import Deed from './ViewModels/Deed.js';
import Category from './ViewModels/Category.js';
import SystemInfo from './ViewModels/SystemInfo.js';

interface DataResponse {
  id: number;
  json: string;
}

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  
  async ngOnInit() {

    this.http.get<DataResponse>('/Home/Data')
      .subscribe((data) => this.processData(JSON.parse(data.json)));

    this.http.get('/Home/Check')
      .subscribe((data) => {
        if (data === "Success") {
          this.isAuthenticated = true;
        }
      }, error => { })


  }
  
  title = 'AngularByDoing';
  deeds = [];
  categories = [];
  isAuthenticated = false;


  processData(dataObj: any) {
    console.log("Processing:");
    console.log(dataObj);
    const propertyNames = Object.getOwnPropertyNames(dataObj);
    const pl = propertyNames.length;
    let pi = 0;
    while (pi < pl) {
      const name = propertyNames[pi++];
      const arr = dataObj[name];
      const jl = arr.length;
      let j = 0;
      while (j < jl) {
        const d = arr[j++];
        const deed = new Deed(this, j === 1 ? name : "", d.deed ? d.deed : d.text, d.rowList, d.hint);
        if (j === 1) {
          this.categories.push(new Category(this, deed));
        }
        this.deeds.push(deed);
      }
    }
  }

removeDeed(deed: Deed) {
  let index = this.deeds.indexOf(deed);
if(index !== -1) {
  if (this.deeds[index].category) {
    if (this.deeds[index].category !== '') {
      if (this.deeds[index+1]) {
        if (this.deeds[index+1].category === '') {
          this.deeds[index+1].setCategory(this.deeds[index].category);
        }
      }
    }
  }
  this.deeds.splice(index, 1);
}
}

  buildJson() {
    const l = this.categories.length;
    let i = 0;
    const outObj = {};
    while (i < l) {
      const category = this.categories[i++];
      outObj[category.deed.category] = [];
    }

    const ll = this.deeds.length;
    let ii = 0;
    let currentCategory = null;
    while (ii < ll) {
      const deed = this.deeds[ii++];
      if (deed.category) {
        currentCategory = deed.category;
      }
      outObj[currentCategory].push({
        'deed': deed.text,
        'rowList': Array.isArray(deed.rowList) ? deed.rowList.map((o) => o.toObject()) : [],
          'hint': deed.hint ? deed.hint : ""
      });
    }
    return JSON.stringify(outObj, null, 2);

  }

  addDeedToCategory(category, deed) {
    const arr = this.deeds;
    let i = 0;
    let found = false;
    while (i < arr.length) {
      const d = this.deeds[i++];
      if (found) {
        if (d.category) {
          this.deeds.splice(i-1, 0, deed);
          return;
        }
      }
      if (d.category === category) {
          found = true;
      }
    }
    this.deeds.push(deed);
  }

  collapseAll() {
    const arr = this.deeds;
    let i = 0;
    while (i < arr.length) {
      const d = this.deeds[i++];
      d.compress();
    }
  }

  openDialog(category) {
    const dialogConfig = new MatDialogConfig();
    //dialogConfig.disableClose = true;
 dialogConfig.autoFocus = true;
 dialogConfig.data = {
 id: 1,
 title: 'Angular',
 category: category
 };
  const component = this;
    let dialogRef = this.dialog.open(DialogBodyComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(value => {
      const newCategory = value.category;
      if (newCategory) {
        if (value.deed) {
          const deed = new Deed(component, newCategory, value.deed, value.hint);
          const category = new Category(component, deed);
          component.deeds.push(deed);
          component.categories.push(category);
        }
      } else if (value.isAddToCategory) {
          this.addDeedToCategory(value.initialCategory, new Deed(component, "", value.deed, value.hint));
      }
       
    });
  }

  editInfo(systemInfo: SystemInfo) {
    this.openInfoDialog(systemInfo, systemInfo.deed.category, systemInfo.deed.text);

  }

  openInfoDialog(systemInfo, category, text) {
    const dialogConfig = new MatDialogConfig();
    //dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      id: 1,
      systemInfo: systemInfo,
      title: 'Edit Info',
      category: category,
      text: text
    };
    const component = this;
    let dialogRef = this.dialog.open(DialogInfoComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(value => {

    });
  }

  openJsonDialog() {
    const dialogConfig = new MatDialogConfig();
    //dialogConfig.disableClose = true;
 dialogConfig.autoFocus = true;
 dialogConfig.data = {
 json: this.buildJson()
 }
  const component = this;
    let dialogRef = this.jsonDialog.open(DialogJsonComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(value => {
 
       
    });
  }

  openLoginDialog() {
    const dialogConfig = new MatDialogConfig();
    //dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      
    }
    const component = this;
    let dialogRef = this.jsonDialog.open(DialogLoginComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(value => {

      if (value.isAuthenticated) {
        this.isAuthenticated = true;
      }

    });
  }

  addToCategory(category) {
    this.openDialog(category);
  }

  addNewCategory() {
    this.openDialog(undefined);
  }

  exportAll() {
    this.openJsonDialog();
  }

  /**
  * Logs in the user by redirecting to Auth0 for authentication
  */
  login() {
    this.openLoginDialog();
  }

  /**
   * Logs the user out of the applicaion, as well as on Auth0
   */
  logout() {
    this.http.get('/Home/SignOut')
      .subscribe((data) => {
        this.isAuthenticated = false;
  });
  }

  constructor(public dialog: MatDialog, public jsonDialog: MatDialog, private http: HttpClient) {
    
  }
}
