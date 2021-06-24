import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ExergameGUIComponent } from './exergamegui/exergamegui.component';
import { ModelComponent } from './model/model.component';
import { SceneComponent } from './scene/scene.component';
import { DefaultExergamesGUIComponent } from './default-exergames-gui/default-exergames-gui.component';

@NgModule({
  declarations: [
    AppComponent,
    ExergameGUIComponent,
    ModelComponent,
    SceneComponent,
    DefaultExergamesGUIComponent,
  ],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
