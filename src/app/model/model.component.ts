import { Component, OnInit } from '@angular/core';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';
import gsap from 'gsap';

import * as THREE from 'three';
import { Scene } from 'three';
import { ExergameGUIComponent } from '../exergamegui/exergamegui.component';

@Component({
  selector: 'app-model',
  templateUrl: './model.component.html',
  styleUrls: ['./model.component.scss'],
})
export class ModelComponent implements OnInit {
  exergamegui: any;

  esqueleto = new THREE.Group();
  antebrazoD: any;
  antebrazoI: any;
  brazoD: any;
  brazoI: any;
  piernaI: any;
  piernaD: any;
  musloI: any;
  musloD: any;
  hombroI: any;
  hombroD: any;

  pose: string = 'De pie';

  start_pose = {
    antebrazoDrotX: 0,
    antebrazoIrotX: 0,
    brazoDrotX: 0,
    brazoIrotX: 0,
    hombroDrotX: 0,
    hombroIrotX: 0,
    piernaDrotX: 0,
    piernaIrotX: 0,
    musloDrotX: 0,
    musloIrotX: 0,
  };

  finish_pose = {
    antebrazoDrotX: 0,
    antebrazoIrotX: 0,
    brazoDrotX: 0,
    brazoIrotX: 0,
    hombroDrotX: 0,
    hombroIrotX: 0,
    piernaDrotX: 0,
    piernaIrotX: 0,
    musloDrotX: 0,
    musloIrotX: 0,
  };
  inAnimation: boolean = false;

  exergame_moment: string = 'Inicio';
  n_rep: number = 5;
  puntos: number = 1000;
  segundos: number = 10;

  readonly ANTEBRAZOSTARTVALUE = 3;
  readonly BRAZOSTARTVALUE = -0.2;
  readonly PIERNASTARTVALUE = 3.1;
  readonly PIERNASENTADOSTARTVALUE = 1.5;
  readonly HOMBROSTARTVALUE = 10;
  readonly MUSLOSTARTVALUE = 9.5;
  readonly MUSLOSENTADOSTARTVALUE = 7.9;

  constructor() {}

  ngOnInit(): void {}

  loadModel(scene: Scene) {
    const loader = new FBXLoader();
    loader.load(
      '../../assets/paciente.fbx',
      (obj) => {
        this.esqueleto = obj;
        scene.add(obj);
        this.antebrazoD = scene.getObjectByName('armr');
        this.antebrazoI = scene.getObjectByName('arml');
        this.brazoD = scene.getObjectByName('uperarmr');
        this.brazoI = scene.getObjectByName('uperarml');
        this.piernaD = scene.getObjectByName('legr');
        this.piernaI = scene.getObjectByName('legl');
        this.hombroD = scene.getObjectByName('shoulderr');
        this.hombroI = scene.getObjectByName('shoulderl');
        this.musloD = scene.getObjectByName('uperlegr');
        this.musloI = scene.getObjectByName('uperlegl');

        this.antebrazoD.rotation.x = this.ANTEBRAZOSTARTVALUE;
        this.antebrazoI.rotation.x = this.ANTEBRAZOSTARTVALUE;
        this.brazoD.rotation.x = this.BRAZOSTARTVALUE;
        this.brazoI.rotation.x = this.BRAZOSTARTVALUE;
        this.piernaD.rotation.x = this.PIERNASTARTVALUE;
        this.piernaI.rotation.x = this.PIERNASTARTVALUE;
        this.hombroD.rotation.x = this.HOMBROSTARTVALUE;
        this.hombroI.rotation.x = this.HOMBROSTARTVALUE;
        this.musloD.rotation.x = this.MUSLOSTARTVALUE;
        this.musloI.rotation.x = this.MUSLOSTARTVALUE;

        this.startPoses();
      },

      function (xhr) {
        console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
      },

      function (error) {
        console.log('An error happened: ' + error);
      }
    );
  }

  startPoses() {
    this.changePose('De pie');

    this.start_pose.antebrazoDrotX = this.finish_pose.antebrazoDrotX =
      this.antebrazoD.rotation.x;
    this.start_pose.antebrazoIrotX = this.finish_pose.antebrazoIrotX =
      this.antebrazoI.rotation.x;

    this.start_pose.brazoDrotX = this.finish_pose.brazoDrotX =
      this.brazoD.rotation.x;
    this.start_pose.brazoIrotX = this.finish_pose.brazoIrotX =
      this.brazoI.rotation.x;

    this.start_pose.hombroDrotX = this.finish_pose.hombroDrotX =
      this.hombroD.rotation.x;
    this.start_pose.hombroIrotX = this.finish_pose.hombroIrotX =
      this.hombroI.rotation.x;

    this.start_pose.piernaDrotX = this.finish_pose.piernaDrotX =
      this.piernaD.rotation.x;
    this.start_pose.piernaIrotX = this.finish_pose.piernaIrotX =
      this.piernaI.rotation.x;

    this.start_pose.musloDrotX = this.finish_pose.musloDrotX =
      this.musloD.rotation.x;
    this.start_pose.musloIrotX = this.finish_pose.musloIrotX =
      this.musloI.rotation.x;
  }

  changePose(value: string) {
    if (value == 'Tumbado') {
      this.esqueleto.rotation.x = -1.64;
      this.esqueleto.position.y = 50;
      this.esqueleto.position.z = 180;

      this.start_pose.piernaDrotX = this.finish_pose.piernaDrotX =
        this.PIERNASTARTVALUE;
      this.start_pose.piernaIrotX = this.finish_pose.piernaIrotX =
        this.PIERNASTARTVALUE;
      this.start_pose.musloDrotX = this.finish_pose.musloDrotX =
        this.MUSLOSTARTVALUE;
      this.start_pose.musloIrotX = this.finish_pose.musloIrotX =
        this.MUSLOSTARTVALUE;
    }
    if (value == 'De pie') {
      this.esqueleto.rotation.x = 0;
      this.esqueleto.position.y = 0;
      this.esqueleto.position.z = 0;
      this.piernaD.rotation.x = this.PIERNASTARTVALUE;
      this.piernaI.rotation.x = this.PIERNASTARTVALUE;
      this.musloD.rotation.x = this.MUSLOSTARTVALUE;
      this.musloI.rotation.x = this.MUSLOSTARTVALUE;

      this.start_pose.piernaDrotX = this.finish_pose.piernaDrotX =
        this.PIERNASTARTVALUE;
      this.start_pose.piernaIrotX = this.finish_pose.piernaIrotX =
        this.PIERNASTARTVALUE;
      this.start_pose.musloDrotX = this.finish_pose.musloDrotX =
        this.MUSLOSTARTVALUE;
      this.start_pose.musloIrotX = this.finish_pose.musloIrotX =
        this.MUSLOSTARTVALUE;
    }
    if (value == 'Sentado') {
      this.piernaD.rotation.x = this.PIERNASENTADOSTARTVALUE;
      this.piernaI.rotation.x = this.PIERNASENTADOSTARTVALUE;
      this.esqueleto.position.y = -75;
      this.esqueleto.rotation.x = 0;
      this.esqueleto.position.z = 0;
      this.musloD.rotation.x = this.MUSLOSENTADOSTARTVALUE;
      this.musloI.rotation.x = this.MUSLOSENTADOSTARTVALUE;
      this.hombroD.rotation.x = this.HOMBROSTARTVALUE;
      this.hombroI.rotation.x = this.HOMBROSTARTVALUE;
      this.antebrazoD.rotation.x = this.ANTEBRAZOSTARTVALUE;
      this.antebrazoI.rotation.x = this.ANTEBRAZOSTARTVALUE;
      this.brazoD.rotation.x = this.BRAZOSTARTVALUE;
      this.brazoI.rotation.x = this.BRAZOSTARTVALUE;

      this.start_pose.piernaDrotX = this.finish_pose.piernaDrotX =
        this.PIERNASENTADOSTARTVALUE;
      this.start_pose.piernaIrotX = this.finish_pose.piernaIrotX =
        this.PIERNASENTADOSTARTVALUE;
      this.start_pose.musloDrotX = this.finish_pose.musloDrotX =
        this.MUSLOSENTADOSTARTVALUE;
      this.start_pose.musloIrotX = this.finish_pose.musloIrotX =
        this.MUSLOSENTADOSTARTVALUE;
    }
  }

  loadExergameModel(exergame: any) {
    this.start_pose.hombroDrotX = exergame.start_pose.hombroDrotX;
    this.finish_pose.hombroDrotX = exergame.finish_pose.hombroDrotX;
    this.start_pose.hombroIrotX = exergame.start_pose.hombroIrotX;
    this.finish_pose.hombroIrotX = exergame.finish_pose.hombroIrotX;

    this.start_pose.antebrazoDrotX = exergame.start_pose.antebrazoDrotX;
    this.finish_pose.antebrazoDrotX = exergame.finish_pose.antebrazoDrotX;
    this.start_pose.antebrazoIrotX = exergame.start_pose.antebrazoIrotX;
    this.finish_pose.antebrazoIrotX = exergame.finish_pose.antebrazoIrotX;

    this.start_pose.brazoDrotX = exergame.start_pose.brazoDrotX;
    this.finish_pose.brazoDrotX = exergame.finish_pose.brazoDrotX;
    this.start_pose.brazoIrotX = exergame.start_pose.brazoIrotX;
    this.finish_pose.brazoIrotX = exergame.finish_pose.brazoIrotX;

    this.start_pose.piernaDrotX = exergame.start_pose.piernaDrotX;
    this.finish_pose.piernaDrotX = exergame.finish_pose.piernaDrotX;
    this.start_pose.piernaIrotX = exergame.start_pose.piernaIrotX;
    this.finish_pose.piernaIrotX = exergame.finish_pose.piernaIrotX;

    this.start_pose.musloDrotX = exergame.start_pose.musloDrotX;
    this.finish_pose.musloDrotX = exergame.finish_pose.musloDrotX;
    this.start_pose.musloIrotX = exergame.start_pose.musloIrotX;
    this.finish_pose.musloIrotX = exergame.finish_pose.musloIrotX;
  }

  loadGUIonModel(exergameGUI: ExergameGUIComponent) {
    this.exergamegui = exergameGUI;
  }
  defaultPose() {
    this.exergamegui.defaultPosePanel();
    this.startPoses();
  }

  animateExergame() {
    if (this.exergamegui.exergameMoment.getValue() == 'Inicio') {
      (<HTMLInputElement>document.getElementById('myRange')).value = '0';
    } else if (this.exergamegui.exergameMoment.getValue() == 'Final') {
      (<HTMLInputElement>document.getElementById('myRange')).value = '100';
    }

    this.antebrazoD.rotation.x = this.start_pose.antebrazoDrotX;
    this.antebrazoI.rotation.x = this.start_pose.antebrazoIrotX;
    this.brazoD.rotation.x = this.start_pose.brazoDrotX;
    this.brazoI.rotation.x = this.start_pose.brazoIrotX;
    this.piernaD.rotation.x = this.start_pose.piernaDrotX;
    this.piernaI.rotation.x = this.start_pose.piernaIrotX;
    this.hombroD.rotation.x = this.start_pose.hombroDrotX;
    this.hombroI.rotation.x = this.start_pose.hombroIrotX;
    this.musloD.rotation.x = this.start_pose.musloDrotX;
    this.musloI.rotation.x = this.start_pose.musloIrotX;

    setTimeout(() => {
      this.inAnimation = !this.inAnimation;

      this.doAnimation(this.finish_pose);
    }, 300);
    setTimeout(() => {
      this.doAnimation(this.start_pose);
    }, 2000);

    setTimeout(() => {
      this.inAnimation = !this.inAnimation;
      if (this.exergamegui.exergameMoment.getValue() == 'Final') {
        this.exergamegui.recoverPose(this.finish_pose);
      }
    }, 3700);
  }

  doAnimation(pose: any) {
    gsap.to(this.antebrazoD.rotation, {
      duration: 1.5,
      x: pose.antebrazoDrotX,
    });
    gsap.to(this.antebrazoI.rotation, {
      duration: 1.5,
      x: pose.antebrazoIrotX,
    });

    gsap.to(this.brazoD.rotation, {
      duration: 1.5,
      x: pose.brazoDrotX,
    });
    gsap.to(this.brazoI.rotation, {
      duration: 1.5,
      x: pose.brazoIrotX,
    });

    gsap.to(this.musloD.rotation, {
      duration: 1.5,
      x: pose.musloDrotX,
    });
    gsap.to(this.musloI.rotation, {
      duration: 1.5,
      x: pose.musloIrotX,
    });

    gsap.to(this.piernaD.rotation, {
      duration: 1.5,
      x: pose.piernaDrotX,
    });
    gsap.to(this.piernaI.rotation, {
      duration: 1.5,
      x: pose.piernaIrotX,
    });

    gsap.to(this.hombroD.rotation, {
      duration: 1.5,
      x: pose.hombroDrotX,
    });
    gsap.to(this.hombroI.rotation, {
      duration: 1.5,
      x: pose.hombroIrotX,
    });
  }

  sliderChange(event: any) {
    var value = event.target.value;

    gsap
      .fromTo(
        this.piernaD.rotation,
        { x: this.start_pose.piernaDrotX },
        {
          x: this.finish_pose.piernaDrotX,
          paused: true,
        }
      )
      .progress(value / 100);
    gsap
      .fromTo(
        this.piernaI.rotation,
        { x: this.start_pose.piernaIrotX },
        {
          x: this.finish_pose.piernaIrotX,
          paused: true,
        }
      )
      .progress(value / 100);
    gsap
      .fromTo(
        this.musloD.rotation,
        { x: this.start_pose.musloDrotX },
        {
          x: this.finish_pose.musloDrotX,
          paused: true,
        }
      )
      .progress(value / 100);
    gsap
      .fromTo(
        this.musloI.rotation,
        { x: this.start_pose.musloIrotX },
        {
          x: this.finish_pose.musloIrotX,
          paused: true,
        }
      )
      .progress(value / 100);
    gsap
      .fromTo(
        this.antebrazoD.rotation,
        { x: this.start_pose.antebrazoDrotX },
        {
          x: this.finish_pose.antebrazoDrotX,
          paused: true,
        }
      )
      .progress(value / 100);
    gsap
      .fromTo(
        this.antebrazoI.rotation,
        { x: this.start_pose.antebrazoIrotX },
        {
          x: this.finish_pose.antebrazoIrotX,
          paused: true,
        }
      )
      .progress(value / 100);
    gsap
      .fromTo(
        this.brazoD.rotation,
        { x: this.start_pose.brazoDrotX },
        {
          x: this.finish_pose.brazoDrotX,
          paused: true,
        }
      )
      .progress(value / 100);
    gsap
      .fromTo(
        this.brazoI.rotation,
        { x: this.start_pose.brazoIrotX },
        {
          x: this.finish_pose.brazoIrotX,
          paused: true,
        }
      )
      .progress(value / 100);
    gsap
      .fromTo(
        this.hombroD.rotation,
        { x: this.start_pose.hombroDrotX },
        {
          x: this.finish_pose.hombroDrotX,
          paused: true,
        }
      )
      .progress(value / 100);
    gsap
      .fromTo(
        this.hombroI.rotation,
        { x: this.start_pose.hombroIrotX },
        {
          x: this.finish_pose.hombroIrotX,
          paused: true,
        }
      )
      .progress(value / 100);
  }
}
