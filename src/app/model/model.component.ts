import { Component, OnInit } from '@angular/core';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';

import * as THREE from 'three';
import { Scene } from 'three';

@Component({
  selector: 'app-model',
  templateUrl: './model.component.html',
  styleUrls: ['./model.component.scss'],
})
export class ModelComponent implements OnInit {
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

  pose: string = 'De pie'; //quitar?

  exergame1 = {
    start_pose: {
      antebrazoDrotX: 3,
      antebrazoIrotX: 3,
      brazoDrotX: -0.2,
      brazoIrotX: -0.2,
      hombroDrotX: 10,
      hombroIrotX: 10,
      musloDrotX: 7.9,
      musloIrotX: 7.9,
      piernaDrotX: 1.5,
      piernaIrotX: 1.5,
    },

    finish_pose: {
      antebrazoDrotX: 3,
      antebrazoIrotX: 3,
      brazoDrotX: -0.2,
      brazoIrotX: -0.2,
      hombroDrotX: 10,
      hombroIrotX: 10,
      musloDrotX: 7.9,
      musloIrotX: 7.9,
      piernaDrotX: 3.1,
      piernaIrotX: 1.5,
    },
    pose: 'Sentado',
    n_rep: 5,
    segundos: 20,
    puntos: 1000,
  };

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

  exergame_moment: string = 'Inicio';
  n_rep: number = 5;
  puntos: number = 1000;
  segundos: number = 10;

  ANTEBRAZOSTARTVALUE = 3;
  BRAZOSTARTVALUE = -0.2;
  PIERNASTARTVALUE = 3.1;
  PIERNASENTADOSTARTVALUE = 1.5;
  HOMBROSTARTVALUE = 10;
  MUSLOSTARTVALUE = 9.5;
  MUSLOSENTADOSTARTVALUE = 7.9;

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

        /*var skinColor = new THREE.Color('rgb(252,208,180)');

        obj.traverse(function (child) {
          console.log(child.children.toString);
           if (child.mater && child.material.name === 'materialName') {
              child.material = new THREE.MeshBasicMaterial({ wireframe: true });
            }
        });
        console.log(scene.toJSON().materials[1]);
        this.esqueleto.getObjectById;*/
        this.startValues();

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

  startValues() {
    this.changePose('De pie');
  }

  startPoses() {
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
}
