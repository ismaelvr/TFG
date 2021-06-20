import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { waitForAsync } from '@angular/core/testing';
import gsap from 'gsap';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GUIComponent } from './gui/gui.component';
import { ModelComponent } from './model/model.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  inAnimation: boolean = false;
  exergame_1: File = require('../assets/default_exergames/Estension_pierna_izq.json');
  exergame_2: File = require('../assets/default_exergames/Estension_pierna_der.json');
  exergame_3: File = require('../assets/default_exergames/Extension_rodilla_izq.json');
  exergame_4: File = require('../assets/default_exergames/Extension_rodilla_der.json');
  exergame_5: File = require('../assets/default_exergames/Abduccion_brazo_izq.json');
  exergame_6: File = require('../assets/default_exergames/Abduccion_brazo_der.json');
  exergame_7: File = require('../assets/default_exergames/Extension_antebrazo_izq.json');
  exergame_8: File = require('../assets/default_exergames/Extension_antebrazo_der.json');
  exergame_9: File = require('../assets/default_exergames/Levantamiento_brazo_izq.json');
  exergame_10: File = require('../assets/default_exergames/Levantamiento_brazo_der.json');

  name = 'TFG';

  checkbox_show: any;

  model: ModelComponent = new ModelComponent();
  gui: GUIComponent = new GUIComponent(this.model);

  clock = new THREE.Clock();

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

  raycaster = new THREE.Raycaster(); // create once
  mouse = new THREE.Vector2(); // create once
  intersects: any;
  examples: any;
  fileString: string = '';

  constructor() {
    window.addEventListener('resize', this.onWindowResize.bind(this), false);

    /*this.renderer.domElement.addEventListener(
      'mouseup',
      this.onMouseDown,
      false
    );*/
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

    this.camera.position.set(0, 200, 800); // Set position like this
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

    this.controls.update();

    //Etc

    this.model.loadModel(this.scene);

    this.loadPanel();

    this.animate();
  }

  onWindowResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  loadPanel() {
    setTimeout(() => {
      this.gui.createPanel();
    }, 2000);
  }

  savePanel() {
    this.gui.savePanel();
  }

  importDefaultExergame(exergame_file: File) {
    this.loadExergame(exergame_file);

    document.getElementById('exergameLoaded')!.style.display = 'block';

    setTimeout(function () {
      document.getElementById('exergameLoaded')!.style.display = 'none';
    }, 1500);
  }

  importPanel(event: any) {
    let file: File = event.target.files[0];

    var reader = new FileReader();
    reader.readAsText(file);

    reader.onloadend = (e) => {
      this.fileString = reader.result as string;
      try {
        this.loadExergame(JSON.parse(this.fileString));

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

  defaultPose() {
    this.gui.defaultPosePanel();
    this.model.startValues();
    this.model.startPoses();
  }

  show_default_exercises() {
    this.checkbox_show = document.getElementById('checkbox_show');
    this.examples = document.getElementById('examples');
    if (this.examples) {
      if (this.checkbox_show.checked) {
        this.examples.style.display = 'block';
      } else {
        this.examples.style.display = 'none';
      }
    }
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

  /* onMouseDown(event: MouseEvent) {
    // calculate mouse position in normalized device coordinates
    // (-1 to +1) for both components
    console.log(this);
    this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  }*/

  loadExergame(exergame: any) {
    this.gui.loadExergameGUI(exergame);
  }

  animateExergame() {
    if (this.gui.exergameMoment.getValue() == 'Inicio') {
      (<HTMLInputElement>document.getElementById('myRange')).value = '0';
    } else if (this.gui.exergameMoment.getValue() == 'Final') {
      (<HTMLInputElement>document.getElementById('myRange')).value = '100';
    }

    this.model.antebrazoD.rotation.x = this.model.start_pose.antebrazoDrotX;
    this.model.antebrazoI.rotation.x = this.model.start_pose.antebrazoIrotX;
    this.model.brazoD.rotation.x = this.model.start_pose.brazoDrotX;
    this.model.brazoI.rotation.x = this.model.start_pose.brazoIrotX;
    this.model.piernaD.rotation.x = this.model.start_pose.piernaDrotX;
    this.model.piernaI.rotation.x = this.model.start_pose.piernaIrotX;
    this.model.hombroD.rotation.x = this.model.start_pose.hombroDrotX;
    this.model.hombroI.rotation.x = this.model.start_pose.hombroIrotX;
    this.model.musloD.rotation.x = this.model.start_pose.musloDrotX;
    this.model.musloI.rotation.x = this.model.start_pose.musloIrotX;

    setTimeout(() => {
      this.inAnimation = !this.inAnimation;

      this.doAnimation(this.model.finish_pose);
    }, 300);
    setTimeout(() => {
      this.doAnimation(this.model.start_pose);
    }, 2000);

    setTimeout(() => {
      this.inAnimation = !this.inAnimation;
      if (this.gui.exergameMoment.getValue() == 'Final') {
        this.model.antebrazoD.rotation.x =
          this.model.finish_pose.antebrazoDrotX;
        this.model.antebrazoI.rotation.x =
          this.model.finish_pose.antebrazoIrotX;
        this.model.brazoD.rotation.x = this.model.finish_pose.brazoDrotX;
        this.model.brazoI.rotation.x = this.model.finish_pose.brazoIrotX;
        this.model.piernaD.rotation.x = this.model.finish_pose.piernaDrotX;
        this.model.piernaI.rotation.x = this.model.finish_pose.piernaIrotX;
        this.model.hombroD.rotation.x = this.model.finish_pose.hombroDrotX;
        this.model.hombroI.rotation.x = this.model.finish_pose.hombroIrotX;
        this.model.musloD.rotation.x = this.model.finish_pose.musloDrotX;
        this.model.musloI.rotation.x = this.model.finish_pose.musloIrotX;
      }
    }, 3700);
  }

  doAnimation(pose: any) {
    gsap.to(this.model.antebrazoD.rotation, {
      duration: 1.5,
      x: pose.antebrazoDrotX,
    });
    gsap.to(this.model.antebrazoI.rotation, {
      duration: 1.5,
      x: pose.antebrazoIrotX,
    });

    gsap.to(this.model.brazoD.rotation, {
      duration: 1.5,
      x: pose.brazoDrotX,
    });
    gsap.to(this.model.brazoI.rotation, {
      duration: 1.5,
      x: pose.brazoIrotX,
    });

    gsap.to(this.model.musloD.rotation, {
      duration: 1.5,
      x: pose.musloDrotX,
    });
    gsap.to(this.model.musloI.rotation, {
      duration: 1.5,
      x: pose.musloIrotX,
    });

    gsap.to(this.model.piernaD.rotation, {
      duration: 1.5,
      x: pose.piernaDrotX,
    });
    gsap.to(this.model.piernaI.rotation, {
      duration: 1.5,
      x: pose.piernaIrotX,
    });

    gsap.to(this.model.hombroD.rotation, {
      duration: 1.5,
      x: pose.hombroDrotX,
    });
    gsap.to(this.model.hombroI.rotation, {
      duration: 1.5,
      x: pose.hombroIrotX,
    });
  }

  sliderChange(event: any) {
    var value = event.target.value;

    gsap
      .fromTo(
        this.model.piernaD.rotation,
        { x: this.model.start_pose.piernaDrotX },
        {
          x: this.model.finish_pose.piernaDrotX,
          paused: true,
        }
      )
      .progress(value / 100);
    gsap
      .fromTo(
        this.model.piernaI.rotation,
        { x: this.model.start_pose.piernaIrotX },
        {
          x: this.model.finish_pose.piernaIrotX,
          paused: true,
        }
      )
      .progress(value / 100);
    gsap
      .fromTo(
        this.model.musloD.rotation,
        { x: this.model.start_pose.musloDrotX },
        {
          x: this.model.finish_pose.musloDrotX,
          paused: true,
        }
      )
      .progress(value / 100);
    gsap
      .fromTo(
        this.model.musloI.rotation,
        { x: this.model.start_pose.musloIrotX },
        {
          x: this.model.finish_pose.musloIrotX,
          paused: true,
        }
      )
      .progress(value / 100);
    gsap
      .fromTo(
        this.model.antebrazoD.rotation,
        { x: this.model.start_pose.antebrazoDrotX },
        {
          x: this.model.finish_pose.antebrazoDrotX,
          paused: true,
        }
      )
      .progress(value / 100);
    gsap
      .fromTo(
        this.model.antebrazoI.rotation,
        { x: this.model.start_pose.antebrazoIrotX },
        {
          x: this.model.finish_pose.antebrazoIrotX,
          paused: true,
        }
      )
      .progress(value / 100);
    gsap
      .fromTo(
        this.model.brazoD.rotation,
        { x: this.model.start_pose.brazoDrotX },
        {
          x: this.model.finish_pose.brazoDrotX,
          paused: true,
        }
      )
      .progress(value / 100);
    gsap
      .fromTo(
        this.model.brazoI.rotation,
        { x: this.model.start_pose.brazoIrotX },
        {
          x: this.model.finish_pose.brazoIrotX,
          paused: true,
        }
      )
      .progress(value / 100);
    gsap
      .fromTo(
        this.model.hombroD.rotation,
        { x: this.model.start_pose.hombroDrotX },
        {
          x: this.model.finish_pose.hombroDrotX,
          paused: true,
        }
      )
      .progress(value / 100);
    gsap
      .fromTo(
        this.model.hombroI.rotation,
        { x: this.model.start_pose.hombroIrotX },
        {
          x: this.model.finish_pose.hombroIrotX,
          paused: true,
        }
      )
      .progress(value / 100);
  }
}
