import { AppComponent } from '../app.component';
import Deed from './Deed';

class Category {
  constructor(component: AppComponent, deed: Deed) {
    this.deed = deed;
    this.component = component;
  }

  deed: Deed;
  component: AppComponent;
}

export default Category;
