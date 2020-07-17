import { AppComponent } from '../app.component';
import Deed from './Deed';
import SystemRow from './SystemRow';

class SystemInfo {
  constructor(component: AppComponent, deed: Deed, row: SystemRow, text: string, tooltip: string, hasConnector: boolean, isStart: boolean, isEnd: boolean, hasNext: boolean) {
    this.text = text;
    this.tooltip = tooltip;
    this.component = component;
    this.deed = deed;
    this.hasConnector = hasConnector;
    this.isStart = isStart;
    this.isEnd = isEnd;
    this.row = row;
    this.hasNext = hasNext;
  }

  toObject() {
    return {
      'text': this.text,
      'tooltip': this.tooltip,
      'hasConnector': this.hasConnector,
      'isStart': this.isStart,
      'isEnd': this.isEnd,
      'hasNext': this.hasNext
    };

  }

  edit() {
    this.component.editInfo(this);

  }

  update(data: any) {

    //this.systemInfo.update({
    //  'info': this.valueInfo,
    //  'initialCategory': this.data.category,
    //  'initialText': this.data.text,
    //  'tooltip': this.valueTooltip,
    //  'hasConnector': this.valueHasConnector,
    //  'isStart': this.valueIsStart,
    //  'isEnd': this.valueIsEnd
    //});

    this.text = data.info;
    this.tooltip = data.tooltip;
    this.hasConnector = !!data.hasConnector;
    this.isStart = !!data.isStart;
    this.isEnd = !!data.isEnd;
    if (!this.hasNext) {
      if (data.hasNext) {
        this.row.addInfo();
      }
    } else {
      if (!data.hasNext) {
        this.row.removeInfo(this);
      }
    }
    this.hasNext = !!data.hasNext;

  }

  deed: Deed;
  row: SystemRow;
  text: string;
  tooltip: string;
  hasConnector: boolean;
  isStart: boolean;
  isEnd: boolean;
  hasNext: boolean;
  component: AppComponent;
}

export default SystemInfo;
