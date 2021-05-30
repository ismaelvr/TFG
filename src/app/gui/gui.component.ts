import Dat from 'dat.gui';
import { ModelComponent } from '../model/model.component';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-gui',
  templateUrl: './gui.component.html',
  styleUrls: ['./gui.component.scss'],
})
export class GUIComponent implements OnInit {
  // model: ModelComponent = new ModelComponent();
  panel = new Dat.GUI({ width: 330 });

  constructor(private model: ModelComponent) {}

  ngOnInit(): void {
    // this.panel.domElement.id = 'panel';
  }

  changeMoment(value: string) {
    switch (value) {
      case 'Inicio':
        break;
      case 'Final':
        break;
    }
  }

  savePanel() {
    var data = {
      start_pose: {
        antebrazoDrotX: this.model.start_pose.antebrazoDrotX,
        antebrazoIrotX: this.model.start_pose.antebrazoIrotX,
        brazoDrotX: this.model.start_pose.brazoDrotX,
        brazoIrotX: this.model.start_pose.brazoIrotX,
        hombroDrotX: this.model.start_pose.hombroDrotX,
        hombroIrotX: this.model.start_pose.hombroIrotX,
        musloDrotX: this.model.start_pose.musloDrotX,
        musloIrotX: this.model.start_pose.musloIrotX,
      },
      finish_pose: {
        antebrazoDrotX: this.model.finish_pose.antebrazoDrotX,
        antebrazoIrotX: this.model.finish_pose.antebrazoIrotX,
        brazoDrotX: this.model.finish_pose.brazoDrotX,
        brazoIrotX: this.model.finish_pose.brazoIrotX,
        hombroDrotX: this.model.finish_pose.hombroDrotX,
        hombroIrotX: this.model.finish_pose.hombroIrotX,
        musloDrotX: this.model.finish_pose.musloDrotX,
        musloIrotX: this.model.finish_pose.musloIrotX,
      },
      pose: this.model.pose,

      n_rep: this.model.n_rep,
      segundos: this.model.segundos,
      puntos: this.model.puntos,
    };
    var dataStr =
      'data:text/json;charset=utf-8,' +
      encodeURIComponent(JSON.stringify(data));
    var downloadJSON = document.createElement('a');
    downloadJSON?.setAttribute('href', dataStr);
    downloadJSON?.setAttribute('download', 'exergame.json');
    downloadJSON?.click();
  }

  createPanel() {
    const folderPoses = this.panel.addFolder('Posición del paciente');
    const folderBI = this.panel.addFolder('Brazo izquierdo');
    const folderBD = this.panel.addFolder('Brazo derecho');
    const folderPI = this.panel.addFolder('Pierna izquierda');
    const folderPD = this.panel.addFolder('Pierna derecha');
    const folderEjercicio = this.panel.addFolder('Detalles del ejercicio');

    var ejercicio = {
      'nº de repeticiones': 5,
      segundos: 10,
      puntos: 1000,
    };

    var poses_value = { pose: 'De pie' };
    const poses = ['De pie', 'Tumbado', 'Sentado'];

    var exergame_value = { exergame: 'Inicio' };
    const exergame = ['Inicio', 'Final'];

    var partes = {
      'brazo derecho rot x': this.model.brazoD.rotation.x,
      'brazo izquierdo rot x': this.model.brazoI.rotation.x,
      'antebrazo derecho rot x': this.model.antebrazoD.rotation.x,
      'antebrazo izquierdo rot x': this.model.antebrazoI.rotation.x,
      'pierna derecha rot x': this.model.piernaD.rotation.x,
      'pierna izquierda rot x': this.model.piernaI.rotation.x,
      'muslo derecho rot x': this.model.musloD.rotation.x,
      'muslo izquierdo rot x': this.model.musloI.rotation.x,
      'hombro derecho rot x': this.model.hombroD.rotation.x,
      'hombro izquierdo rot x': this.model.hombroI.rotation.x,
    };

    var posesModelo = folderPoses.add(poses_value, 'pose').options(poses);
    var exergame_moment = folderPoses
      .add(exergame_value, 'exergame')
      .options(exergame);

    var antebrazoDRotX = folderBD
      .add(partes, 'antebrazo derecho rot x')
      .min(0.5)
      .max(3)
      .step(0.1);
    var antebrazoIRotX = folderBI
      .add(partes, 'antebrazo izquierdo rot x')
      .min(0.5)
      .max(3)
      .step(0.1);
    var brazoDRotX = folderBD
      .add(partes, 'brazo derecho rot x')
      .min(-1)
      .max(1)
      .step(0.1);
    var brazoIRotX = folderBI
      .add(partes, 'brazo izquierdo rot x')
      .min(-1)
      .max(1)
      .step(0.1);
    var piernaDRotX = folderPD
      .add(partes, 'pierna derecha rot x')
      .min(0.5)
      .max(3.1)
      .step(0.1);
    var piernaIRotX = folderPI
      .add(partes, 'pierna izquierda rot x')
      .min(0.5)
      .max(3.1)
      .step(0.1);
    var hombroDRotX = folderBD
      .add(partes, 'hombro derecho rot x')
      .min(3.7)
      .max(10)
      .step(0.1);
    var hombroIRotX = folderBI
      .add(partes, 'hombro izquierdo rot x')
      .min(3.7)
      .max(10)
      .step(0.1);
    var musloDRotX = folderPD
      .add(partes, 'muslo derecho rot x')
      .min(7.5)
      .max(10.5)
      .step(0.1);
    var musloIRotX = folderPI
      .add(partes, 'muslo izquierdo rot x')
      .min(7.5)
      .max(10.5)
      .step(0.1);

    var n_rep = folderEjercicio
      .add(ejercicio, 'nº de repeticiones')
      .min(1)
      .max(20)
      .step(1);
    var segundos = folderEjercicio
      .add(ejercicio, 'segundos')
      .min(5)
      .max(30)
      .step(1);
    var puntos = folderEjercicio
      .add(ejercicio, 'puntos')
      .min(100)
      .max(1000)
      .step(50);

    folderBD.open();
    folderBI.open();
    folderPD.open();
    folderPI.open();
    folderEjercicio.open();
    folderPoses.open();
    console.log(this.model.finish_pose);
    antebrazoDRotX.onChange((value) => {
      this.model.antebrazoD.rotation.x = value;

      switch (this.model.exergame_moment) {
        case 'Inicio':
          this.model.start_pose.antebrazoDrotX = value;
          break;
        case 'Final':
          this.model.finish_pose.antebrazoDrotX = value;
      }
    });
    antebrazoIRotX.onChange((value) => {
      this.model.antebrazoI.rotation.x = value;

      switch (this.model.exergame_moment) {
        case 'Inicio':
          this.model.start_pose.antebrazoIrotX = value;
          break;
        case 'Final':
          this.model.finish_pose.antebrazoIrotX = value;
      }
    });
    brazoDRotX.onChange((value) => {
      this.model.brazoD.rotation.x = value;

      switch (this.model.exergame_moment) {
        case 'Inicio':
          this.model.start_pose.brazoDrotX = value;
          break;
        case 'Final':
          this.model.finish_pose.brazoDrotX = value;
      }
    });
    brazoIRotX.onChange((value) => {
      this.model.brazoI.rotation.x = value;

      switch (this.model.exergame_moment) {
        case 'Inicio':
          this.model.start_pose.brazoIrotX = value;
          break;
        case 'Final':
          this.model.finish_pose.brazoIrotX = value;
      }
    });
    piernaDRotX.onChange((value) => {
      this.model.piernaD.rotation.x = value;

      switch (this.model.exergame_moment) {
        case 'Inicio':
          this.model.start_pose.piernaDrotX = value;
          break;
        case 'Final':
          this.model.finish_pose.piernaDrotX = value;
      }
    });
    piernaIRotX.onChange((value) => {
      this.model.piernaI.rotation.x = value;

      switch (this.model.exergame_moment) {
        case 'Inicio':
          this.model.start_pose.piernaIrotX = value;
          break;
        case 'Final':
          this.model.finish_pose.piernaIrotX = value;
      }
    });
    hombroDRotX.onChange((value) => {
      this.model.hombroD.rotation.x = value;

      switch (this.model.exergame_moment) {
        case 'Inicio':
          this.model.start_pose.hombroDrotX = value;
          break;
        case 'Final':
          this.model.finish_pose.hombroDrotX = value;
      }
    });
    hombroIRotX.onChange((value) => {
      this.model.hombroI.rotation.x = value;

      switch (this.model.exergame_moment) {
        case 'Inicio':
          this.model.start_pose.hombroIrotX = value;
          break;
        case 'Final':
          this.model.finish_pose.hombroIrotX = value;
      }
    });
    musloDRotX.onChange((value) => {
      this.model.musloD.rotation.x = value;

      switch (this.model.exergame_moment) {
        case 'Inicio':
          this.model.start_pose.musloDrotX = value;
          break;
        case 'Final':
          this.model.finish_pose.musloDrotX = value;
      }
    });
    musloIRotX.onChange((value) => {
      this.model.musloI.rotation.x = value;
      switch (this.model.exergame_moment) {
        case 'Inicio':
          this.model.start_pose.musloIrotX = value;
          break;
        case 'Final':
          this.model.finish_pose.musloIrotX = value;
      }
    });
    n_rep.onChange((value) => {
      this.model.n_rep = value;
    });
    segundos.onChange((value) => {
      this.model.segundos = value;
    });
    puntos.onChange((value) => {
      this.model.puntos = value;
    });
    posesModelo.onChange((value) => {
      this.model.pose = value;
      switch (this.model.exergame_moment) {
        case 'Inicio':
          this.model.changePose(value, this.model.start_pose);

          break;
        case 'Final':
          this.model.changePose(value, this.model.finish_pose);
      }
    });
    exergame_moment.onChange((value) => {
      this.model.exergame_moment = value;
      //this.changeMoment(value); //luego lo meto aqui cuando lo tenga el component esqueleto y exergame
      switch (value) {
        case 'Inicio':
          antebrazoDRotX.setValue(this.model.start_pose.antebrazoDrotX);
          antebrazoIRotX.setValue(this.model.start_pose.antebrazoIrotX);
          brazoDRotX.setValue(this.model.start_pose.brazoDrotX);
          brazoIRotX.setValue(this.model.start_pose.brazoIrotX);
          piernaDRotX.setValue(this.model.start_pose.piernaDrotX);
          piernaIRotX.setValue(this.model.start_pose.piernaIrotX);
          hombroDRotX.setValue(this.model.start_pose.hombroDrotX);
          hombroIRotX.setValue(this.model.start_pose.hombroIrotX);
          musloDRotX.setValue(this.model.start_pose.musloDrotX);
          musloIRotX.setValue(this.model.start_pose.musloIrotX);
          posesModelo.setValue(this.model.pose);
          break;
        case 'Final':
          antebrazoDRotX.setValue(this.model.finish_pose.antebrazoDrotX);
          antebrazoIRotX.setValue(this.model.finish_pose.antebrazoIrotX);
          brazoDRotX.setValue(this.model.finish_pose.brazoDrotX);
          brazoIRotX.setValue(this.model.finish_pose.brazoIrotX);
          piernaDRotX.setValue(this.model.finish_pose.piernaDrotX);
          piernaIRotX.setValue(this.model.finish_pose.piernaIrotX);
          hombroDRotX.setValue(this.model.finish_pose.hombroDrotX);
          hombroIRotX.setValue(this.model.finish_pose.hombroIrotX);
          musloDRotX.setValue(this.model.finish_pose.musloDrotX);
          musloIRotX.setValue(this.model.finish_pose.musloIrotX);
          posesModelo.setValue(this.model.pose);

          break;
      }
    });
  }
}
