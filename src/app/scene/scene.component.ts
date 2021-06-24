import { Component, OnInit } from '@angular/core';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { ModelComponent } from '../model/model.component';
@Component({
  selector: 'app-scene',
  templateUrl: './scene.component.html',
  styleUrls: ['./scene.component.scss'],
})
export class SceneComponent implements OnInit {
  lightColor = new THREE.Color('rgb(255,255,255)');
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    1,
    1000
  );
  renderer = new THREE.WebGLRenderer();
  controls = new OrbitControls(this.camera, this.renderer.domElement);

  light1 = new THREE.PointLight();
  light2 = new THREE.PointLight(this.lightColor, 0.5, 0);
  light3 = new THREE.PointLight(this.lightColor, 0.5, 0);
  light4 = new THREE.PointLight(this.lightColor, 0.5, 0);
  light5 = new THREE.PointLight(this.lightColor, 0.5, 0);
  light6 = new THREE.PointLight(this.lightColor, 0.5, 0);

  raycaster = new THREE.Raycaster();
  mouse = new THREE.Vector2();
  intersects: any;

  constructor(private model: ModelComponent) {
    window.addEventListener('resize', this.onWindowResize.bind(this), false);

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

    this.model.loadModel(this.scene);

    this.animate();
  }

  ngOnInit(): void {}

  onWindowResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  animate = () => {
    requestAnimationFrame(this.animate);

    // Pruebas raycast seleccionar parte del avatar.

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
}
