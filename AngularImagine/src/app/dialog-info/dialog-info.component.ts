import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import SystemInfo from './../ViewModels/SystemInfo';

@Component({
  selector: 'app-dialog-info',
  templateUrl: './dialog-info.component.html',
  styleUrls: ['./dialog-info.component.scss']
})
export class DialogInfoComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DialogInfoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {

    if (data.systemInfo) {
      this.valueInfo = data.systemInfo.text;
      this.valueTooltip = data.systemInfo.tooltip;
      this.valueHasConnector = data.systemInfo.hasConnector;
      this.valueIsStart = data.systemInfo.isStart;
      this.valueIsEnd = data.systemInfo.isEnd;
      this.valueHasNext = data.systemInfo.hasNext;
      this.systemInfo = data.systemInfo;
    }

  }

  ngOnInit() {
      if (this.data.category) {
        this.categoryTitle = "Add to Category ("+this.data.category+")";
      }
    if (this.data.text) {
      this.textTitle = "Add to Deed (" + this.data.text + ")";
    }

  }

  systemInfo: SystemInfo;
  categoryTitle: string;
  textTitle: string;
  showText: boolean;

  valueInfo: string;
  updateInfo(value: string) { this.valueInfo = value; }
  valueTooltip: string;
  updateTooltip(value: string) { this.valueTooltip = value; }
  valueHasConnector: boolean;
  updateHasConnector(value: boolean) { this.valueHasConnector = value; }
  valueIsStart: boolean;
  updateIsStart(value: boolean) { this.valueIsStart = value; }
  valueIsEnd: boolean;
  updateIsEnd(value: boolean) { this.valueIsEnd = value; }
  valueHasNext: boolean;
  updateHasNext(value: boolean) { this.valueHasNext = value; }

  cancel() {
    this.dialogRef.close({});
  }

  close() {
    if (this.systemInfo) {
      this.systemInfo.update({
        'info': this.valueInfo,
        'initialCategory': this.data.category,
        'initialText': this.data.text,
        'tooltip': this.valueTooltip,
        'hasConnector': this.valueHasConnector,
        'isStart': this.valueIsStart,
        'isEnd': this.valueIsEnd,
        'hasNext': this.valueHasNext
      });
    }
    this.dialogRef.close({});
  }
}
