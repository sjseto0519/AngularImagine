import { AppComponent } from '../app.component';
import SystemInfo from './SystemInfo';
import Deed from './Deed';

class SystemRow {
  constructor(component: AppComponent, deed: Deed, infoList: SystemInfo[]) {
    this.infoList = infoList || [];
    this.component = component;
    this.deed = deed;
    if (this.infoList) {
      let l = this.infoList.length;
      while (l--) {
        this.infoList[l].row = this;
      }
    }
  }

  addInfo() {
    this.infoList.push(new SystemInfo(this.component, this.deed, this, "Default text", "", false, false, false, false));
  }

  removeInfo(info: SystemInfo) {
    const ind = this.infoList.indexOf(info);
    const length = this.infoList.length;
    const toDelete = length - ind - 1;
    if (toDelete > 0) {
      this.infoList.splice(ind + 1, toDelete);
    }
  }

  toObject() {
    var o: any = {};
    o.list = Array.isArray(this.infoList) ? this.infoList.map((i) => i.toObject()) : [];
    return o;
  }

  deed: Deed;
  infoList: SystemInfo[];
  component: AppComponent;
}

export default SystemRow;
