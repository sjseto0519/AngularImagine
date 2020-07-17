import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";

@Component({
  selector: 'app-dialog-body',
  templateUrl: './dialog-body.component.html',
  styleUrls: ['./dialog-body.component.scss']
})
export class DialogBodyComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DialogBodyComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any){}

  ngOnInit() {
      if (this.data.category) {
        this.categoryTitle = "Add to Category ("+this.data.category+")";
        this.showCategory = false;
      } else {
        this.categoryTitle = "New Category";
        this.showCategory = true;
      }
  }

  categoryTitle: string;
  showCategory: boolean;

  value = '';
  updateCategory(value: string) { this.value = value; }
  valueDeed = '';
  updateDeed(value: string) { this.valueDeed = value; }
  valueHint = '';
  updateHint(value: string) { this.valueHint = value; }

  close() {
    this.dialogRef.close({ 'category':this.value, 'initialCategory':this.data.category, 'isAddToCategory':(!this.showCategory), 'deed':this.valueDeed, 'hint':this.valueHint });
  }
}
