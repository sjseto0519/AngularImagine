import { AppComponent } from '../app.component';
import SystemRow from './SystemRow';
import SystemInfo from './SystemInfo';

class Deed {
  constructor(component: AppComponent, category: string, text: string, rowList: any[] = null, hint: string = null) {
    this.text = text;
    this.category = category;
    this.hint = hint;
    if (rowList) {
      this.rowList = [];
      let l = rowList.length;
      while (l--) {
        const rr = rowList.shift();
        const sr = [];
        if (!rr.list) {
          rr.list = [];
        }
        if (rr.list) {
          let ll = rr.list.length;
          while (ll--) {
            const info = rr.list.shift();
            sr.push(new SystemInfo(component, this, null, info.text, info.tooltip, info.hasConnector, info.isStart, info.isEnd, info.hasNext));
          }
        }
        this.rowList.push(new SystemRow(component, this, sr));
      }
    } else {
      this.rowList = [];
    }
    this.showHint = false;
    this.hintText = "Show Hint";
    this.deedText = "";
    this.isExpanded = true;
    this.isEditedTextVisible = false;
    this.component = component;
    this.categoryName = category.replace(/ /g, '');
  }

  setCategory(category) {
    this.category = category;
    this.categoryName = category.replace(/ /g, '');
  }

  add() {
    this.component.addToCategory(this.category);
  }

  text: string;
  category: string;
  categoryName: string;
  rowList: SystemRow[];
  hint: string;
  showHint: boolean;
  hintText: string;
  hover: boolean;
  hoverClear: boolean;
  hoverArrow: boolean;
  hoverAdd: boolean;
  hoverAddRow: boolean;
  hoverMoveUp: boolean;
  hoverMoveDown: boolean;
  hoverX: boolean;
  deedText: string;
  isExpanded: boolean;
  isEditedTextVisible: boolean;
  editedText: string;
  editedHint: string;
  component: AppComponent;
  clear() {

  }
  remove() {
    this.component.removeDeed(this);
  }
  editText() {
    if (this.isEditedTextVisible) {
      this.isEditedTextVisible = false;
      this.text = this.editedText;
      this.hint = this.editedHint;
    } else {
      this.isEditedTextVisible = true;
      this.editedText = this.text;
      this.editedHint = this.hint;
    }
  }
  expandAll() {
    const deeds = this.component.deeds;
    const l = deeds.length;
    let i = 0;
    let isIn = false;
    while (i < l) {
      const deed = deeds[i++];
      if (deed.category === this.category) {
        deed.expand();
        isIn = true;
      } else if (deed.category === '' && isIn) {
        deed.expand();
      } else if (isIn) {
        return;
      }
    }
  }
  compressAll() {
    const deeds = this.component.deeds;
    const l = deeds.length;
    let i = 0;
    let isIn = false;
    while (i < l) {
      const deed = deeds[i++];
      if (deed.category === this.category) {
        deed.compress();
        isIn = true;
      } else if (deed.category === '' && isIn) {
        deed.compress();
      } else if (isIn) {
        return;
      }
    }
  }
  moveUp() {
    const deeds = this.component.deeds;
    const l = deeds.length;
    let i = 0;
    while (i < l) {
      const deed = deeds[i++];
      if (deed === this) {
        if (i === 1) {
          return;
        }
        const temp = deeds[i - 2];
        deeds[i - 2] = deeds[i - 1];
        deeds[i - 1] = temp;
        return;
      } 
    }
  }
  moveDown() {
    const deeds = this.component.deeds;
    const l = deeds.length;
    let i = 0;
    while (i < l) {
      const deed = deeds[i++];
      if (deed === this) {
        if (i === l) {
          return;
        }
        const temp = deeds[i];
        deeds[i] = deeds[i - 1];
        deeds[i - 1] = temp;
        return;
      }
    }
  }
  expand() {
    this.isExpanded = true;
  }
  compress() {
    this.isExpanded = false;
  }
  addRow() {
    this.rowList.push(new SystemRow(this.component, this, []));
  }
  toggleHint() {
    this.showHint = !this.showHint;
    if (this.showHint) {
      this.hintText = "Hide Hint";
    } else {
      this.hintText = "Show Hint";
    }
  }
}

export default Deed;
