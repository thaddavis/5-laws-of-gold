import * as THREE from "three";
import Experience from "./Experience.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

import { executeInitializeEffects } from "Experience/Utils/ExecuteInitializeEffects";
import { executeEffects } from "Experience/Utils/ExecuteEffects";
import { INSTANCE_NAMES } from "./Utils/Enums.js";

export default class Camera {
  constructor() {
    this.experience = new Experience();
    this.sizes = this.experience.sizes;
    this.scene = this.experience.scene;
    this.canvas = this.experience.canvas;
    this.instanceName = INSTANCE_NAMES.CAMERA; // Global

    this.setInstance();
    this.setControls();
  }

  setInstance() {
    this.instance = new THREE.PerspectiveCamera(
      60,
      this.sizes.width / this.sizes.height,
      0.1,
      100
    );
    this.instance.position.set(0, 0, 20);
    this.scene.add(this.instance);
  }

  setControls() {
    this.controls = new OrbitControls(this.instance, this.canvas);
    this.controls.enableDamping = true;
  }

  resize() {
    this.instance.aspect = this.sizes.width / this.sizes.height;
    this.instance.updateProjectionMatrix();
  }

  initializeEffects(effects) {
    console.log("initializeEffects CAMERA");
    // debugger;
    executeInitializeEffects(this, effects, this.experience.time);
  }

  update() {
    this.controls.update();
  }

  updateCamera(effects) {
    // console.log("updateCamera");
    // debugger;
    executeEffects(
      this,
      effects,
      this.experience.time.delta,
      this.experience.time.elapsed
    );
  }

  setCameraToInitialValue(timelineMetadata) {
    // debugger
    // initializeEffect(this.instance, timelineMetadata, this.experience.time)
    // debugger
  }
}
