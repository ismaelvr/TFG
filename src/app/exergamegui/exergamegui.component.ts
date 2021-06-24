import Dat from 'dat.gui';
import { ModelComponent } from '../model/model.component';
import { Component, OnInit } from '@angular/core';
import * as THREE from 'three';

@Component({
  selector: 'app-gui',
  templateUrl: './exergamegui.component.html',
  styleUrls: ['./exergamegui.component.scss'],
})
export class ExergameGUIComponent implements OnInit {
  // model: ModelComponent = new ModelComponent();
  panel = new Dat.GUI({ width: 330 });
  antebrazoDrotX: any;
  antebrazoIrotX: any;
  brazoDrotX: any;
  brazoIrotX: any;
  piernaDrotX: any;
  piernaIrotX: any;
  hombroDrotX: any;
  hombroIrotX: any;
  musloDrotX: any;
  musloIrotX: any;
  posesModelo: any;
  exergameMoment: any;
  n_rep: any;
  segundos: any;
  puntos: any;

  constructor(private model: ModelComponent) {}

  ngOnInit(): void {}

  importPanel(event: any) {
    let file: File = event.target.files[0];

    var reader = new FileReader();
    reader.readAsText(file);

    reader.onloadend = (e) => {
      var fileString = reader.result as string;
      try {
        this.loadExergameGUI(JSON.parse(fileString));

        document.getElementById('exergameLoaded')!.style.display = 'block';

        setTimeout(function () {
          document.getElementById('exergameLoaded')!.style.display = 'none';
        }, 1500);
      } catch {
        document.getElementById('exergameFailed')!.style.display = 'block';

        setTimeout(function () {
          document.getElementById('exergameFailed')!.style.display = 'none';
        }, 1500);
      }
    };
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
  animateExergame() {}
  defaultPose() {}
  createPanel() {
    const folderPoses = this.panel.addFolder('Posición del paciente');
    const folderBI = this.panel.addFolder('Brazo izquierdo');
    const folderBD = this.panel.addFolder('Brazo derecho');
    const folderPI = this.panel.addFolder('Pierna izquierda');
    const folderPD = this.panel.addFolder('Pierna derecha');
    const folderEjercicio = this.panel.addFolder('Detalles del ejercicio');

    var ejercicio = {
      'Número de repeticiones': 5,
      Segundos: 10,
      Puntos: 1000,
    };

    var options = {
      'Animar ejercicio': (this.animateExergame = () => {
        this.model.animateExergame();
      }),
      'Pose por defecto': (this.defaultPose = () => {
        this.model.defaultPose();
      }),
    };
    var poses_value = { Posición: 'De pie' };
    const poses = ['De pie', 'Tumbado', 'Sentado'];

    var exergame_value = { 'Momento del ejercicio': 'Inicio' };
    const exergame = ['Inicio', 'Final'];

    var partes = {
      'Brazo derecho': this.model.brazoD.rotation.x,
      'Brazo izquierdo': this.model.brazoI.rotation.x,
      'Antebrazo derecho': this.model.antebrazoD.rotation.x,
      'Antebrazo izquierdo': this.model.antebrazoI.rotation.x,
      'Pierna derecha': this.model.piernaD.rotation.x,
      'Pierna izquierda': this.model.piernaI.rotation.x,
      'Muslo derecho': this.model.musloD.rotation.x,
      'Muslo izquierdo': this.model.musloI.rotation.x,
      'Hombro derecho': this.model.hombroD.rotation.x,
      'Hombro izquierdo': this.model.hombroI.rotation.x,
    };

    this.posesModelo = folderPoses.add(poses_value, 'Posición').options(poses);
    this.exergameMoment = folderPoses
      .add(exergame_value, 'Momento del ejercicio')
      .options(exergame);
    folderPoses.add(options, 'Animar ejercicio');

    folderPoses.add(options, 'Pose por defecto');

    this.antebrazoDrotX = folderBD
      .add(partes, 'Antebrazo derecho')
      .min(0.5)
      .max(3)
      .step(0.1);
    this.antebrazoIrotX = folderBI
      .add(partes, 'Antebrazo izquierdo')
      .min(0.5)
      .max(3)
      .step(0.1);
    this.brazoDrotX = folderBD
      .add(partes, 'Brazo derecho')
      .min(-1)
      .max(1)
      .step(0.1);
    this.brazoIrotX = folderBI
      .add(partes, 'Brazo izquierdo')
      .min(-1)
      .max(1)
      .step(0.1);
    this.piernaDrotX = folderPD
      .add(partes, 'Pierna derecha')
      .min(0.5)
      .max(3.1)
      .step(0.1);
    this.piernaIrotX = folderPI
      .add(partes, 'Pierna izquierda')
      .min(0.5)
      .max(3.1)
      .step(0.1);
    this.hombroDrotX = folderBD
      .add(partes, 'Hombro derecho')
      .min(5.6)
      .max(10)
      .step(0.1);
    this.hombroIrotX = folderBI
      .add(partes, 'Hombro izquierdo')
      .min(5.6)
      .max(10)
      .step(0.1);
    this.musloDrotX = folderPD
      .add(partes, 'Muslo derecho')
      .min(7.5)
      .max(10.5)
      .step(0.1);
    this.musloIrotX = folderPI
      .add(partes, 'Muslo izquierdo')
      .min(7.5)
      .max(10.5)
      .step(0.1);

    this.n_rep = folderEjercicio
      .add(ejercicio, 'Número de repeticiones')
      .min(1)
      .max(20)
      .step(1);
    this.segundos = folderEjercicio
      .add(ejercicio, 'Segundos')
      .min(5)
      .max(30)
      .step(1);
    this.puntos = folderEjercicio
      .add(ejercicio, 'Puntos')
      .min(100)
      .max(1000)
      .step(50);

    folderBD.open();
    folderBI.open();
    folderPD.open();
    folderPI.open();
    folderEjercicio.open();
    folderPoses.open();

    this.antebrazoDrotX.onChange((value: number) => {
      this.model.antebrazoD.rotation.x = value;

      switch (this.model.exergame_moment) {
        case 'Inicio':
          this.model.start_pose.antebrazoDrotX = value;
          break;
        case 'Final':
          this.model.finish_pose.antebrazoDrotX = value;
      }
    });
    this.antebrazoIrotX.onChange((value: number) => {
      this.model.antebrazoI.rotation.x = value;

      switch (this.model.exergame_moment) {
        case 'Inicio':
          this.model.start_pose.antebrazoIrotX = value;

          break;
        case 'Final':
          this.model.finish_pose.antebrazoIrotX = value;
      }
    });
    this.brazoDrotX.onChange((value: number) => {
      this.model.brazoD.rotation.x = value;

      switch (this.model.exergame_moment) {
        case 'Inicio':
          this.model.start_pose.brazoDrotX = value;
          break;
        case 'Final':
          this.model.finish_pose.brazoDrotX = value;
      }
    });
    this.brazoIrotX.onChange((value: number) => {
      this.model.brazoI.rotation.x = value;

      switch (this.model.exergame_moment) {
        case 'Inicio':
          this.model.start_pose.brazoIrotX = value;
          break;
        case 'Final':
          this.model.finish_pose.brazoIrotX = value;
      }
    });
    this.piernaDrotX.onChange((value: number) => {
      this.model.piernaD.rotation.x = value;
      switch (this.model.exergame_moment) {
        case 'Inicio':
          this.model.start_pose.piernaDrotX = value;
          break;
        case 'Final':
          this.model.finish_pose.piernaDrotX = value;
      }
    });
    this.piernaIrotX.onChange((value: number) => {
      this.model.piernaI.rotation.x = value;

      switch (this.model.exergame_moment) {
        case 'Inicio':
          this.model.start_pose.piernaIrotX = value;
          break;
        case 'Final':
          this.model.finish_pose.piernaIrotX = value;
      }
    });
    this.hombroDrotX.onChange((value: number) => {
      this.model.hombroD.rotation.x = value;

      switch (this.model.exergame_moment) {
        case 'Inicio':
          this.model.start_pose.hombroDrotX = value;
          break;
        case 'Final':
          this.model.finish_pose.hombroDrotX = value;
      }
    });
    this.hombroIrotX.onChange((value: number) => {
      this.model.hombroI.rotation.x = value;

      switch (this.model.exergame_moment) {
        case 'Inicio':
          this.model.start_pose.hombroIrotX = value;
          break;
        case 'Final':
          this.model.finish_pose.hombroIrotX = value;
      }
    });
    this.musloDrotX.onChange((value: number) => {
      this.model.musloD.rotation.x = value;

      switch (this.model.exergame_moment) {
        case 'Inicio':
          this.model.start_pose.musloDrotX = value;
          break;
        case 'Final':
          this.model.finish_pose.musloDrotX = value;
      }
    });
    this.musloIrotX.onChange((value: number) => {
      this.model.musloI.rotation.x = value;

      switch (this.model.exergame_moment) {
        case 'Inicio':
          this.model.start_pose.musloIrotX = value;
          break;
        case 'Final':
          this.model.finish_pose.musloIrotX = value;
      }
    });
    this.n_rep.onChange((value: number) => {
      this.model.n_rep = value;
    });
    this.segundos.onChange((value: number) => {
      this.model.segundos = value;
    });
    this.puntos.onChange((value: number) => {
      this.model.puntos = value;
    });

    this.posesModelo.onChange((value: string) => {
      this.model.pose = value;

      switch (value) {
        case 'Tumbado':
          this.musloDrotX.setValue(this.model.MUSLOSTARTVALUE);
          this.musloIrotX.setValue(this.model.MUSLOSTARTVALUE);
          this.piernaDrotX.setValue(this.model.PIERNASTARTVALUE);
          this.piernaIrotX.setValue(this.model.PIERNASTARTVALUE);
          break;
        case 'Sentado':
          this.musloDrotX.setValue(this.model.MUSLOSENTADOSTARTVALUE);
          this.musloIrotX.setValue(this.model.MUSLOSENTADOSTARTVALUE);
          this.piernaDrotX.setValue(this.model.PIERNASENTADOSTARTVALUE);
          this.piernaIrotX.setValue(this.model.PIERNASENTADOSTARTVALUE);
          break;
        case 'De pie':
          this.musloDrotX.setValue(this.model.MUSLOSTARTVALUE);
          this.musloIrotX.setValue(this.model.MUSLOSTARTVALUE);
          this.piernaDrotX.setValue(this.model.PIERNASTARTVALUE);
          this.piernaIrotX.setValue(this.model.PIERNASTARTVALUE);
          break;
      }
      this.model.changePose(value);
    });

    this.exergameMoment.onChange((value: string) => {
      this.model.exergame_moment = value;
      switch (value) {
        case 'Inicio':
          (<HTMLInputElement>document.getElementById('myRange')).value = '0';
          this.antebrazoDrotX.setValue(this.model.start_pose.antebrazoDrotX);
          this.antebrazoIrotX.setValue(this.model.start_pose.antebrazoIrotX);
          this.brazoDrotX.setValue(this.model.start_pose.brazoDrotX);
          this.brazoIrotX.setValue(this.model.start_pose.brazoIrotX);
          this.piernaDrotX.setValue(this.model.start_pose.piernaDrotX);
          this.piernaIrotX.setValue(this.model.start_pose.piernaIrotX);
          this.hombroDrotX.setValue(this.model.start_pose.hombroDrotX);
          this.hombroIrotX.setValue(this.model.start_pose.hombroIrotX);
          this.musloDrotX.setValue(this.model.start_pose.musloDrotX);
          this.musloIrotX.setValue(this.model.start_pose.musloIrotX);
          break;
        case 'Final':
          // this.posesModelo.setValue(this.model.pose);
          (<HTMLInputElement>document.getElementById('myRange')).value = '100';

          this.antebrazoDrotX.setValue(this.model.finish_pose.antebrazoDrotX);
          this.antebrazoIrotX.setValue(this.model.finish_pose.antebrazoIrotX);
          this.brazoDrotX.setValue(this.model.finish_pose.brazoDrotX);
          this.brazoIrotX.setValue(this.model.finish_pose.brazoIrotX);
          this.piernaDrotX.setValue(this.model.finish_pose.piernaDrotX);
          this.piernaIrotX.setValue(this.model.finish_pose.piernaIrotX);
          this.hombroDrotX.setValue(this.model.finish_pose.hombroDrotX);
          this.hombroIrotX.setValue(this.model.finish_pose.hombroIrotX);
          this.musloDrotX.setValue(this.model.finish_pose.musloDrotX);
          this.musloIrotX.setValue(this.model.finish_pose.musloIrotX);
          break;
      }
    });
  }
  defaultPosePanel() {
    this.antebrazoDrotX.setValue(this.model.ANTEBRAZOSTARTVALUE);
    this.antebrazoIrotX.setValue(this.model.ANTEBRAZOSTARTVALUE);
    this.brazoDrotX.setValue(this.model.BRAZOSTARTVALUE);
    this.brazoIrotX.setValue(this.model.BRAZOSTARTVALUE);
    this.piernaDrotX.setValue(this.model.PIERNASTARTVALUE);
    this.piernaIrotX.setValue(this.model.PIERNASTARTVALUE);
    this.hombroDrotX.setValue(this.model.HOMBROSTARTVALUE);
    this.hombroIrotX.setValue(this.model.HOMBROSTARTVALUE);
    this.musloDrotX.setValue(this.model.MUSLOSTARTVALUE);
    this.musloIrotX.setValue(this.model.MUSLOSTARTVALUE);
    this.posesModelo.setValue('De pie');
  }

  loadExergameGUI(exergame: any) {
    this.posesModelo.setValue(exergame.pose);

    if (this.exergameMoment.getValue() == 'Inicio') {
      this.antebrazoDrotX.setValue(exergame.start_pose.antebrazoDrotX);
      this.antebrazoIrotX.setValue(exergame.start_pose.antebrazoIrotX);
      this.brazoDrotX.setValue(exergame.start_pose.brazoDrotX);
      this.brazoIrotX.setValue(exergame.start_pose.brazoIrotX);
      this.hombroDrotX.setValue(exergame.start_pose.hombroDrotX);
      this.hombroIrotX.setValue(exergame.start_pose.hombroIrotX);
      this.piernaDrotX.setValue(exergame.start_pose.piernaDrotX);
      this.piernaIrotX.setValue(exergame.start_pose.piernaIrotX);
      this.musloDrotX.setValue(exergame.start_pose.musloDrotX);
      this.musloIrotX.setValue(exergame.start_pose.musloIrotX);

      this.model.loadExergameModel(exergame);
    } else if (this.exergameMoment.getValue() == 'Final') {
      this.antebrazoDrotX.setValue(exergame.finish_pose.antebrazoDrotX);
      this.antebrazoIrotX.setValue(exergame.finish_pose.antebrazoIrotX);
      this.brazoDrotX.setValue(exergame.finish_pose.brazoDrotX);
      this.brazoIrotX.setValue(exergame.finish_pose.brazoIrotX);
      this.hombroDrotX.setValue(exergame.finish_pose.hombroDrotX);
      this.hombroIrotX.setValue(exergame.finish_pose.hombroIrotX);
      this.piernaDrotX.setValue(exergame.finish_pose.piernaDrotX);

      this.piernaIrotX.setValue(exergame.finish_pose.piernaIrotX);
      this.musloDrotX.setValue(exergame.finish_pose.musloDrotX);
      this.musloIrotX.setValue(exergame.finish_pose.musloIrotX);

      this.model.loadExergameModel(exergame);
    }
    this.n_rep.setValue(exergame.n_rep);
    this.segundos.setValue(exergame.segundos);
    this.puntos.setValue(exergame.puntos);
  }

  recoverPose(lastPose: any) {
    this.antebrazoDrotX.setValue(lastPose.antebrazoDrotX);
    this.antebrazoIrotX.setValue(lastPose.antebrazoIrotX);
    this.brazoDrotX.setValue(lastPose.brazoDrotX);
    this.brazoIrotX.setValue(lastPose.brazoIrotX);
    this.hombroDrotX.setValue(lastPose.hombroDrotX);
    this.hombroIrotX.setValue(lastPose.hombroIrotX);
    this.piernaDrotX.setValue(lastPose.piernaDrotX);
    this.piernaIrotX.setValue(lastPose.piernaIrotX);
    this.musloDrotX.setValue(lastPose.musloDrotX);
    this.musloIrotX.setValue(lastPose.musloIrotX);
  }
}
