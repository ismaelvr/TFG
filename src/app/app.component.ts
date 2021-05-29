import { Component } from '@angular/core';
import * as THREE from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';
import Dat from 'dat.gui';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  name = 'TFG';

  clock = new THREE.Clock();
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

  current_pose = {
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
  puntos: number = 10;
  segundos: number = 1000;

  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    1,
    1000
  );
  renderer = new THREE.WebGLRenderer();
  controls = new OrbitControls(this.camera, this.renderer.domElement);

  light1 = new THREE.PointLight(new THREE.Color('rgb(255,255,255)'), 0.5, 0);
  light2 = new THREE.PointLight(new THREE.Color('rgb(255,255,255)'), 0.5, 0);
  light3 = new THREE.PointLight(new THREE.Color('rgb(255,255,255)'), 0.5, 0);
  light4 = new THREE.PointLight(new THREE.Color('rgb(255,255,255)'), 0.5, 0);
  light5 = new THREE.PointLight(new THREE.Color('rgb(255,255,255)'), 0.5, 0);
  light6 = new THREE.PointLight(new THREE.Color('rgb(255,255,255)'), 0.5, 0);

  panel = new Dat.GUI({ width: 350 });

  raycaster = new THREE.Raycaster(); // create once
  mouse = new THREE.Vector2(); // create once
  intersects: any;

  constructor() {
    window.addEventListener('resize', this.onWindowResize.bind(this), false);

    this.renderer.domElement.addEventListener(
      'mouseup',
      this.onMouseDown,
      false
    );
    //Background color

    this.scene.background = new THREE.Color(0x333333);

    //Add lights

    this.light1.position.set(0, 0, -1000);
    this.scene.add(this.light1);
    this.light2.position.set(0, 0, 1000);
    this.scene.add(this.light2);
    this.light3.position.set(1000, 0, 0);
    this.scene.add(this.light3);
    this.light4.position.set(-1000, 0, 0);
    this.scene.add(this.light4);
    this.light5.position.set(0, 1000, 0);
    this.scene.add(this.light5);
    this.light6.position.set(0, -1000, 0);
    this.scene.add(this.light6);

    //Camera

    this.camera.position.set(0, 200, 400); // Set position like this
    this.camera.far = 4000;

    this.camera.updateProjectionMatrix();
    //Floor grid
    const gridHelper = new THREE.GridHelper(1000, 20);
    this.scene.add(gridHelper);

    //Renderer

    this.renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(this.renderer.domElement);

    //Controls

    this.controls.rotateSpeed = 0.5;
    this.controls.mouseButtons = {
      LEFT: THREE.MOUSE.ROTATE,
      MIDDLE: THREE.MOUSE.DOLLY,
      RIGHT: THREE.MOUSE.PAN,
    };
    this.controls.listenToKeyEvents(window.document.body); // optional
    // this.controls.keys = {
    //   LEFT: 'A', //left arrow
    //   UP: 'W', // up arrow
    //   RIGHT: 'D', // right arrow
    //   BOTTOM: 'S' // down arrow
    // }
    //this.controls.panSpeed = 0; //

    this.controls.update();

    //Etc

    this.loadModel(this.scene);

    this.loadPanel();

    this.animate();
  }

  loadModel(scene: any) {
    // console.log(this)

    const loader = new FBXLoader();
    loader.load(
      '../../assets/paciente.fbx',
      (obj) => {
        // console.log(this.esqueleto)
        // console.log(obj)
        // var skeleton = new THREE.SkeletonHelper(obj);
        // var mesh = skeleton.bones;
        // console.log(mesh)
        // skeleton.name = "Ske"
        // console.log(skeleton)

        scene.add(obj);
        this.antebrazoD = this.scene.getObjectByName('armr');
        this.antebrazoI = this.scene.getObjectByName('arml');
        this.brazoD = this.scene.getObjectByName('uperarmr');
        this.brazoI = this.scene.getObjectByName('uperarml');
        this.piernaD = this.scene.getObjectByName('legr');
        this.piernaI = this.scene.getObjectByName('legl');
        this.hombroD = this.scene.getObjectByName('shoulderr');
        this.hombroI = this.scene.getObjectByName('shoulderl');
        this.musloD = this.scene.getObjectByName('uperlegr');
        this.musloI = this.scene.getObjectByName('uperlegl');
        console.log(this.musloD.rotation.x);
        this.start_pose.antebrazoDrotX =
          this.finish_pose.antebrazoDrotX =
          this.current_pose.antebrazoDrotX =
            this.antebrazoD.rotation.x;
        this.start_pose.antebrazoIrotX =
          this.finish_pose.antebrazoIrotX =
          this.current_pose.antebrazoIrotX =
            this.antebrazoI.rotation.x;

        this.start_pose.brazoDrotX =
          this.finish_pose.brazoDrotX =
          this.current_pose.brazoDrotX =
            this.brazoD.rotation.x;
        this.start_pose.brazoIrotX =
          this.finish_pose.brazoIrotX =
          this.current_pose.brazoIrotX =
            this.brazoI.rotation.x;

        this.start_pose.hombroDrotX =
          this.finish_pose.hombroDrotX =
          this.current_pose.hombroDrotX =
            this.hombroD.rotation.x;
        this.start_pose.hombroIrotX =
          this.finish_pose.hombroIrotX =
          this.current_pose.hombroIrotX =
            this.hombroI.rotation.x;

        this.start_pose.piernaDrotX =
          this.finish_pose.piernaDrotX =
          this.current_pose.piernaDrotX =
            this.piernaD.rotation.x;
        this.start_pose.piernaIrotX =
          this.finish_pose.piernaIrotX =
          this.current_pose.piernaIrotX =
            this.piernaI.rotation.x;

        this.start_pose.musloDrotX =
          this.finish_pose.musloDrotX =
          this.current_pose.musloDrotX =
            this.musloD.rotation.x;
        this.start_pose.musloIrotX =
          this.finish_pose.musloIrotX =
          this.current_pose.musloIrotX =
            this.musloI.rotation.x;
      },

      function (xhr) {
        console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
      },

      function (error) {
        console.log('An error happened: ' + error);
      }
    );
  }

  onWindowResize() {
    console.log(document);
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  loadPanel() {
    setTimeout(() => {
      this.createPanel();
    }, 2000);
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
      'brazo derecho rot x': this.antebrazoD.rotation.x,
      'brazo izquierdo rot x': this.antebrazoI.rotation.x,
      'antebrazo derecho rot x': this.brazoD.rotation.x,
      'antebrazo izquierdo rot x': this.brazoI.rotation.x,
      'pierna derecha rot x': this.piernaD.rotation.x,
      'pierna izquierda rot x': this.piernaI.rotation.x,
      'muslo derecho rot x': this.musloD.rotation.x,
      'muslo izquierdo rot x': this.musloI.rotation.x,
      'hombro derecho rot x': this.hombroD.rotation.x,
      'hombro izquierdo rot x': this.hombroI.rotation.x,
    };

    var posesModelo = folderPoses.add(poses_value, 'pose').options(poses);
    var exergame_moment = folderPoses
      .add(exergame_value, 'exergame')
      .options(exergame);

    var antebrazoDRotX = folderBD
      .add(partes, 'brazo derecho rot x')
      .min(0.5)
      .max(3)
      .step(0.1);
    var antebrazoIRotX = folderBI
      .add(partes, 'brazo izquierdo rot x')
      .min(0.5)
      .max(3)
      .step(0.1);
    var brazoDRotX = folderBD
      .add(partes, 'antebrazo derecho rot x')
      .min(-1)
      .max(1)
      .step(0.1);
    var brazoIRotX = folderBI
      .add(partes, 'antebrazo izquierdo rot x')
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
    var musloDRotX = folderBD
      .add(partes, 'muslo derecho rot x')
      .min(7.5)
      .max(10.5)
      .step(0.1);
    var musloIRotX = folderBI
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
    //this.panel.remember(partes);

    antebrazoDRotX.onChange((value) => {
      this.antebrazoD.rotation.x = value;

      switch (this.exergame_moment) {
        case 'Inicio':
          this.start_pose.antebrazoDrotX = value;
          break;
        case 'Final':
          this.finish_pose.antebrazoDrotX = value;
      }
    });
    antebrazoIRotX.onChange((value) => {
      this.antebrazoI.rotation.x = value;

      switch (this.exergame_moment) {
        case 'Inicio':
          this.start_pose.antebrazoIrotX = value;
          break;
        case 'Final':
          this.finish_pose.antebrazoIrotX = value;
      }
    });
    brazoDRotX.onChange((value) => {
      this.brazoD.rotation.x = value;

      switch (this.exergame_moment) {
        case 'Inicio':
          this.start_pose.brazoDrotX = value;
          break;
        case 'Final':
          this.finish_pose.brazoDrotX = value;
      }
    });
    brazoIRotX.onChange((value) => {
      this.brazoI.rotation.x = value;

      switch (this.exergame_moment) {
        case 'Inicio':
          this.start_pose.brazoIrotX = value;
          break;
        case 'Final':
          this.finish_pose.brazoIrotX = value;
      }
    });
    piernaDRotX.onChange((value) => {
      this.piernaD.rotation.x = value;

      switch (this.exergame_moment) {
        case 'Inicio':
          this.start_pose.piernaDrotX = value;
          break;
        case 'Final':
          this.finish_pose.piernaDrotX = value;
      }
    });
    piernaIRotX.onChange((value) => {
      this.piernaI.rotation.x = value;

      switch (this.exergame_moment) {
        case 'Inicio':
          this.start_pose.piernaIrotX = value;
          break;
        case 'Final':
          this.finish_pose.piernaIrotX = value;
      }
    });
    hombroDRotX.onChange((value) => {
      this.hombroD.rotation.x = value;

      switch (this.exergame_moment) {
        case 'Inicio':
          this.start_pose.hombroDrotX = value;
          break;
        case 'Final':
          this.finish_pose.hombroDrotX = value;
      }
    });
    hombroIRotX.onChange((value) => {
      this.hombroI.rotation.x = value;

      switch (this.exergame_moment) {
        case 'Inicio':
          this.start_pose.hombroIrotX = value;
          break;
        case 'Final':
          this.finish_pose.hombroIrotX = value;
      }
    });
    musloDRotX.onChange((value) => {
      this.musloD.rotation.x = value;

      switch (this.exergame_moment) {
        case 'Inicio':
          this.start_pose.musloDrotX = value;
          break;
        case 'Final':
          this.finish_pose.musloDrotX = value;
      }
    });
    musloIRotX.onChange((value) => {
      this.musloI.rotation.x = value;
      switch (this.exergame_moment) {
        case 'Inicio':
          this.start_pose.musloIrotX = value;
          break;
        case 'Final':
          this.finish_pose.musloIrotX = value;
      }
    });
    n_rep.onChange((value) => {
      this.n_rep = value;
    });
    segundos.onChange((value) => {
      this.segundos = value;
    });
    puntos.onChange((value) => {
      this.puntos = value;
    });
    posesModelo.onChange((value) => {
      this.pose = value;
      this.changePose(value);
    });
    exergame_moment.onChange((value) => {
      this.exergame_moment = value;
      //this.changeMoment(value); //luego lo meto aqui cuando lo tenga el component esqueleto y exergame
      switch (value) {
        case 'Inicio':
          antebrazoDRotX.setValue(this.start_pose.antebrazoDrotX);
          antebrazoIRotX.setValue(this.start_pose.antebrazoIrotX);
          brazoDRotX.setValue(this.start_pose.brazoDrotX);
          brazoIRotX.setValue(this.start_pose.brazoIrotX);
          piernaDRotX.setValue(this.start_pose.piernaDrotX);
          piernaIRotX.setValue(this.start_pose.piernaIrotX);
          hombroDRotX.setValue(this.start_pose.hombroDrotX);
          hombroIRotX.setValue(this.start_pose.hombroIrotX);
          musloDRotX.setValue(this.start_pose.musloDrotX);
          musloIRotX.setValue(this.start_pose.musloIrotX);

          break;
        case 'Final':
          antebrazoDRotX.setValue(this.finish_pose.antebrazoDrotX);
          antebrazoIRotX.setValue(this.finish_pose.antebrazoIrotX);
          brazoDRotX.setValue(this.finish_pose.brazoDrotX);
          brazoIRotX.setValue(this.finish_pose.brazoIrotX);
          piernaDRotX.setValue(this.finish_pose.piernaDrotX);
          piernaIRotX.setValue(this.finish_pose.piernaIrotX);
          hombroDRotX.setValue(this.finish_pose.hombroDrotX);
          hombroIRotX.setValue(this.finish_pose.hombroIrotX);
          musloDRotX.setValue(this.finish_pose.musloDrotX);
          musloIRotX.setValue(this.finish_pose.musloIrotX);

          break;
      }
    });
  }

  changePose(value: string) {
    if (value == 'Tumbado') {
      this.esqueleto.rotation.x = -1.64;
      this.esqueleto.position.y = 50;
      this.esqueleto.position.z = 180;
      this.piernaD.rotation.x = 3.073;
      this.piernaI.rotation.x = 3.073;
      this.musloD.rotation.x = -3.097;
      this.musloI.rotation.x = -3.097;
    }
    if (value == 'De pie') {
      this.esqueleto.rotation.x = 0;
      this.esqueleto.position.y = 0;
      this.esqueleto.position.z = 0;
      this.piernaD.rotation.x = 3.073;
      this.piernaI.rotation.x = 3.073;
      this.musloD.rotation.x = -3.097;
      this.musloI.rotation.x = -3.097;
    }
    if (value == 'Sentado') {
      this.piernaD.rotation.x = 1.5;
      this.piernaI.rotation.x = 1.5;
      this.musloD.rotation.x = 1.6;
      this.musloI.rotation.x = 1.6;
      this.esqueleto.position.y = -75;
      this.esqueleto.rotation.x = 0;
      this.esqueleto.position.z = 0;
    }
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
        antebrazoDrotX: this.start_pose.antebrazoDrotX,
        antebrazoIrotX: this.start_pose.antebrazoIrotX,
        brazoDrotX: this.start_pose.brazoDrotX,
        brazoIrotX: this.start_pose.brazoIrotX,
        hombroDrotX: this.start_pose.hombroDrotX,
        hombroIrotX: this.start_pose.hombroIrotX,
        musloDrotX: this.start_pose.musloDrotX,
        musloIrotX: this.start_pose.musloIrotX,
      },
      finish_pose: {
        antebrazoDrotX: this.finish_pose.antebrazoDrotX,
        antebrazoIrotX: this.finish_pose.antebrazoIrotX,
        brazoDrotX: this.finish_pose.brazoDrotX,
        brazoIrotX: this.finish_pose.brazoIrotX,
        hombroDrotX: this.finish_pose.hombroDrotX,
        hombroIrotX: this.finish_pose.hombroIrotX,
        musloDrotX: this.finish_pose.musloDrotX,
        musloIrotX: this.finish_pose.musloIrotX,
      },
      pose: this.pose,

      n_rep: this.n_rep,
      segundos: this.segundos,
      puntos: this.puntos,
    };
    var dataStr =
      'data:text/json;charset=utf-8,' +
      encodeURIComponent(JSON.stringify(data));
    var downloadJSON = document.createElement('a');
    downloadJSON?.setAttribute('href', dataStr);
    downloadJSON?.setAttribute('download', 'exergame.json');
    downloadJSON?.click();
  }

  animate = () => {
    requestAnimationFrame(this.animate);

    // Pruebas raycast seleccionar parte del cuerpo. No va. F

    // this.raycaster.setFromCamera( this.mouse, this.camera );
    // // calculate objects intersecting the picking ray var intersects =
    // this.intersects = this.raycaster.intersectObjects( this.scene.children );
    // for (var i = 0; i < this.intersects.length; i++) {
    //   if (this.intersects[i].type == "Group")
    //     this.intersects[ i ].object.material.color.set( 0xff0000 );
    // }

    this.controls.update();
    this.renderer.render(this.scene, this.camera);
  };

  onMouseDown(event: MouseEvent) {
    // calculate mouse position in normalized device coordinates
    // (-1 to +1) for both components
    console.log(this);
    this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  }
}
