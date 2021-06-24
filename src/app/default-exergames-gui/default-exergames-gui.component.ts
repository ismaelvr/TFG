import { Component, OnInit } from '@angular/core';
import { ExergameGUIComponent } from '../exergamegui/exergamegui.component';

@Component({
  selector: 'app-default-exergames-gui',
  templateUrl: './default-exergames-gui.component.html',
  styleUrls: ['./default-exergames-gui.component.scss'],
})
export class DefaultExergamesGUIComponent implements OnInit {
  checkbox_show: any;

  exergame_1: File = require('../../assets/default_exergames/Estension_pierna_izq.json');
  exergame_2: File = require('../../assets/default_exergames/Estension_pierna_der.json');
  exergame_3: File = require('../../assets/default_exergames/Extension_rodilla_izq.json');
  exergame_4: File = require('../../assets/default_exergames/Extension_rodilla_der.json');
  exergame_5: File = require('../../assets/default_exergames/Abduccion_brazo_izq.json');
  exergame_6: File = require('../../assets/default_exergames/Abduccion_brazo_der.json');
  exergame_7: File = require('../../assets/default_exergames/Extension_antebrazo_izq.json');
  exergame_8: File = require('../../assets/default_exergames/Extension_antebrazo_der.json');
  exergame_9: File = require('../../assets/default_exergames/Levantamiento_brazo_izq.json');
  exergame_10: File = require('../../assets/default_exergames/Levantamiento_brazo_der.json');

  constructor(private exergamegui: ExergameGUIComponent) {}

  ngOnInit(): void {}

  importExergame(exergame_file: File) {
    this.exergamegui.loadExergameGUI(exergame_file);

    document.getElementById('exergameLoaded')!.style.display = 'block';

    setTimeout(function () {
      document.getElementById('exergameLoaded')!.style.display = 'none';
    }, 1500);
  }

  show_default_exercises() {
    this.checkbox_show = document.getElementById('checkbox_show');
    var examples = document.getElementById('examples');
    if (examples) {
      if (this.checkbox_show.checked) {
        examples.style.display = 'block';
      } else {
        examples.style.display = 'none';
      }
    }
  }
}
