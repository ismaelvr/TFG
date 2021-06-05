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
  antebrazoDRotX: any;
  antebrazoIRotX: any;
  brazoDRotX: any;
  brazoIRotX: any;
  piernaDRotX: any;
  piernaIRotX: any;
  hombroDRotX: any;
  hombroIRotX: any;
  musloDRotX: any;
  musloIRotX: any;
  posesModelo: any;
  exergameMoment: any;

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
        piernaDrotX: this.model.start_pose.piernaDrotX,
        piernaIrotX: this.model.start_pose.piernaIrotX,
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
        piernaDrotX: this.model.finish_pose.piernaDrotX,
        piernaIrotX: this.model.finish_pose.piernaIrotX,
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

    this.posesModelo = folderPoses.add(poses_value, 'pose').options(poses);
    this.exergameMoment = folderPoses
      .add(exergame_value, 'exergame')
      .options(exergame);

    this.antebrazoDRotX = folderBD
      .add(partes, 'antebrazo derecho rot x')
      .min(0.5)
      .max(3)
      .step(0.1);
    this.antebrazoIRotX = folderBI
      .add(partes, 'antebrazo izquierdo rot x')
      .min(0.5)
      .max(3)
      .step(0.1);
    this.brazoDRotX = folderBD
      .add(partes, 'brazo derecho rot x')
      .min(-1)
      .max(1)
      .step(0.1);
    this.brazoIRotX = folderBI
      .add(partes, 'brazo izquierdo rot x')
      .min(-1)
      .max(1)
      .step(0.1);
    this.piernaDRotX = folderPD
      .add(partes, 'pierna derecha rot x')
      .min(0.5)
      .max(3.1)
      .step(0.1);
    this.piernaIRotX = folderPI
      .add(partes, 'pierna izquierda rot x')
      .min(0.5)
      .max(3.1)
      .step(0.1);
    this.hombroDRotX = folderBD
      .add(partes, 'hombro derecho rot x')
      .min(3.7)
      .max(10)
      .step(0.1);
    this.hombroIRotX = folderBI
      .add(partes, 'hombro izquierdo rot x')
      .min(3.7)
      .max(10)
      .step(0.1);
    this.musloDRotX = folderPD
      .add(partes, 'muslo derecho rot x')
      .min(7.5)
      .max(10.5)
      .step(0.1);
    this.musloIRotX = folderPI
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

    this.antebrazoDRotX.onChange((value: number) => {
      this.model.antebrazoD.rotation.x = value;

      switch (this.model.exergame_moment) {
        case 'Inicio':
          this.model.start_pose.antebrazoDrotX = value;
          break;
        case 'Final':
          this.model.finish_pose.antebrazoDrotX = value;
      }
    });
    this.antebrazoIRotX.onChange((value: number) => {
      this.model.antebrazoI.rotation.x = value;

      switch (this.model.exergame_moment) {
        case 'Inicio':
          this.model.start_pose.antebrazoIrotX = value;

          break;
        case 'Final':
          this.model.finish_pose.antebrazoIrotX = value;
      }
    });
    this.brazoDRotX.onChange((value: number) => {
      this.model.brazoD.rotation.x = value;

      switch (this.model.exergame_moment) {
        case 'Inicio':
          this.model.start_pose.brazoDrotX = value;
          break;
        case 'Final':
          this.model.finish_pose.brazoDrotX = value;
      }
    });
    this.brazoIRotX.onChange((value: number) => {
      this.model.brazoI.rotation.x = value;

      switch (this.model.exergame_moment) {
        case 'Inicio':
          this.model.start_pose.brazoIrotX = value;
          break;
        case 'Final':
          this.model.finish_pose.brazoIrotX = value;
      }
    });
    this.piernaDRotX.onChange((value: number) => {
      this.model.piernaD.rotation.x = value;

      switch (this.model.exergame_moment) {
        case 'Inicio':
          this.model.start_pose.piernaDrotX = value;
          break;
        case 'Final':
          this.model.finish_pose.piernaDrotX = value;
      }
    });
    this.piernaIRotX.onChange((value: number) => {
      this.model.piernaI.rotation.x = value;

      switch (this.model.exergame_moment) {
        case 'Inicio':
          this.model.start_pose.piernaIrotX = value;
          break;
        case 'Final':
          this.model.finish_pose.piernaIrotX = value;
      }
    });
    this.hombroDRotX.onChange((value: number) => {
      this.model.hombroD.rotation.x = value;

      switch (this.model.exergame_moment) {
        case 'Inicio':
          this.model.start_pose.hombroDrotX = value;
          break;
        case 'Final':
          this.model.finish_pose.hombroDrotX = value;
      }
    });
    this.hombroIRotX.onChange((value: number) => {
      this.model.hombroI.rotation.x = value;

      switch (this.model.exergame_moment) {
        case 'Inicio':
          this.model.start_pose.hombroIrotX = value;
          break;
        case 'Final':
          this.model.finish_pose.hombroIrotX = value;
      }
    });
    this.musloDRotX.onChange((value: number) => {
      this.model.musloD.rotation.x = value;

      switch (this.model.exergame_moment) {
        case 'Inicio':
          this.model.start_pose.musloDrotX = value;
          break;
        case 'Final':
          this.model.finish_pose.musloDrotX = value;
      }
    });
    this.musloIRotX.onChange((value: number) => {
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

    this.posesModelo.onChange((value: string) => {
      this.model.pose = value;

      switch (value) {
        case 'Tumbado':
          this.musloDRotX.setValue(this.model.MUSLOSTARTVALUE);
          this.musloIRotX.setValue(this.model.MUSLOSTARTVALUE);
          this.piernaDRotX.setValue(this.model.PIERNASTARTVALUE);
          this.piernaIRotX.setValue(this.model.PIERNASTARTVALUE);
          break;
        case 'Sentado':
          this.musloDRotX.setValue(this.model.MUSLOSENTADOSTARTVALUE);
          this.musloIRotX.setValue(this.model.MUSLOSENTADOSTARTVALUE);
          this.piernaDRotX.setValue(this.model.PIERNASENTADOSTARTVALUE);
          this.piernaIRotX.setValue(this.model.PIERNASENTADOSTARTVALUE);
          break;
        case 'De pie':
          this.musloDRotX.setValue(this.model.MUSLOSTARTVALUE);
          this.musloIRotX.setValue(this.model.MUSLOSTARTVALUE);
          this.piernaDRotX.setValue(this.model.PIERNASTARTVALUE);
          this.piernaIRotX.setValue(this.model.PIERNASTARTVALUE);
          break;
      }
      this.model.changePose(value);
    });

    this.exergameMoment.onChange((value: string) => {
      this.model.exergame_moment = value;
      switch (value) {
        case 'Inicio':
          // this.posesModelo.setValue(this.model.pose);
          this.antebrazoDRotX.setValue(this.model.start_pose.antebrazoDrotX);
          this.antebrazoIRotX.setValue(this.model.start_pose.antebrazoIrotX);
          this.brazoDRotX.setValue(this.model.start_pose.brazoDrotX);
          this.brazoIRotX.setValue(this.model.start_pose.brazoIrotX);
          this.piernaDRotX.setValue(this.model.start_pose.piernaDrotX);
          this.piernaIRotX.setValue(this.model.start_pose.piernaIrotX);
          this.hombroDRotX.setValue(this.model.start_pose.hombroDrotX);
          this.hombroIRotX.setValue(this.model.start_pose.hombroIrotX);
          this.musloDRotX.setValue(this.model.start_pose.musloDrotX);
          this.musloIRotX.setValue(this.model.start_pose.musloIrotX);
          break;
        case 'Final':
          // this.posesModelo.setValue(this.model.pose);
          this.antebrazoDRotX.setValue(this.model.finish_pose.antebrazoDrotX);
          this.antebrazoIRotX.setValue(this.model.finish_pose.antebrazoIrotX);
          this.brazoDRotX.setValue(this.model.finish_pose.brazoDrotX);
          this.brazoIRotX.setValue(this.model.finish_pose.brazoIrotX);
          this.piernaDRotX.setValue(this.model.finish_pose.piernaDrotX);
          this.piernaIRotX.setValue(this.model.finish_pose.piernaIrotX);
          this.hombroDRotX.setValue(this.model.finish_pose.hombroDrotX);
          this.hombroIRotX.setValue(this.model.finish_pose.hombroIrotX);
          this.musloDRotX.setValue(this.model.finish_pose.musloDrotX);
          this.musloIRotX.setValue(this.model.finish_pose.musloIrotX);
          break;
      }
    });
  }
  defaultPosePanel() {
    this.antebrazoDRotX.setValue(this.model.ANTEBRAZOSTARTVALUE);
    this.antebrazoIRotX.setValue(this.model.ANTEBRAZOSTARTVALUE);
    this.brazoDRotX.setValue(this.model.BRAZOSTARTVALUE);
    this.brazoIRotX.setValue(this.model.BRAZOSTARTVALUE);
    this.piernaDRotX.setValue(this.model.PIERNASTARTVALUE);
    this.piernaIRotX.setValue(this.model.PIERNASTARTVALUE);
    this.hombroDRotX.setValue(this.model.HOMBROSTARTVALUE);
    this.hombroIRotX.setValue(this.model.HOMBROSTARTVALUE);
    this.musloDRotX.setValue(this.model.MUSLOSTARTVALUE);
    this.musloIRotX.setValue(this.model.MUSLOSTARTVALUE);
    this.posesModelo.setValue('De pie');

    // this.panel.__folders.folderPoses.__controllers[0].updateDisplay();
    /* for (var i = 0; i < Object.keys(this.panel.__folders).length; i++) {
      var key = Object.keys(this.panel.__folders)[i];
      for (var j = 0; j < this.panel.__folders[key].__controllers.length; j++) {
        this.panel.__folders[key].__controllers[j].updateDisplay();
      }
    }*/
  }

  legExtension() {
    this.antebrazoDRotX.setValue(this.model.ANTEBRAZOSTARTVALUE);
    this.antebrazoIRotX.setValue(this.model.ANTEBRAZOSTARTVALUE);
    this.brazoDRotX.setValue(this.model.BRAZOSTARTVALUE);
    this.brazoIRotX.setValue(this.model.BRAZOSTARTVALUE);
    this.hombroIRotX.setValue(this.model.HOMBROSTARTVALUE);
    this.hombroDRotX.setValue(this.model.HOMBROSTARTVALUE);
    this.posesModelo.setValue('Sentado');
    console.log(this.exergameMoment.getValue());
    if (this.exergameMoment.getValue() == 'Final') {
      this.piernaDRotX.setValue(this.model.PIERNASTARTVALUE);
    }

    // this.model.pose = "Sentado"
    /*this.piernaDRotX.setValue(this.model.PIERNASENTADOSTARTVALUE);
    this.piernaIRotX.setValue(this.model.PIERNASENTADOSTARTVALUE);
    this.musloDRotX.setValue(this.model.MUSLOSENTADOSTARTVALUE);
    this.musloIRotX.setValue(this.model.MUSLOSENTADOSTARTVALUE);*/
  }
}
