import { Component } from '@angular/core';
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

    this.renderer.setSize(
      window.innerWidth - window.innerWidth * 0.01,
      window.innerHeight - window.innerHeight * 0.02
    );
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

    this.renderer.setSize(
      window.innerWidth - window.innerWidth * 0.01,
      window.innerHeight - window.innerHeight * 0.02
    );
  }

  loadPanel() {
    setTimeout(() => {
      this.gui.createPanel();
    }, 2000);
  }

  savePanel() {
    this.gui.savePanel();
  }

  defaultPose() {
    this.model.startValues();
    this.model.startPoses();
    this.gui.defaultPosePanel();
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

  legExtension() {
    this.gui.legExtension();
    this.model.legExtension();
  }
}
