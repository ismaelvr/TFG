import { Component } from '@angular/core';
import { ExergameGUIComponent } from './exergamegui/exergamegui.component';
import { ModelComponent } from './model/model.component';
import { SceneComponent } from './scene/scene.component';
import { DefaultExergamesGUIComponent } from './default-exergames-gui/default-exergames-gui.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  name = 'TFG';

  model: ModelComponent = new ModelComponent();
  exergamegui: ExergameGUIComponent = new ExergameGUIComponent(this.model);
  defaultexergamesgui: DefaultExergamesGUIComponent =
    new DefaultExergamesGUIComponent(this.exergamegui);
  scene: SceneComponent = new SceneComponent(this.model);

  constructor() {
    setTimeout(() => {
      this.exergamegui.createPanel();
    }, 1500);

    this.model.loadGUIonModel(this.exergamegui);
  }

  /* onMouseDown(event: MouseEvent) {
    // calculate mouse position in normalized device coordinates
    // (-1 to +1) for both components
    console.log(this);
    this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  }*/
}
