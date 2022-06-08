import * as THREE from "three";
import Experience from "Experience/Experience.js";

import { executeEffects } from "Experience/Utils/ExecuteEffects.js";
import { executeInitializeEffects } from "Experience/Utils/ExecuteInitializeEffects.js";

import { Config } from "Experience/Config";
import { get } from "lodash";

export default class AmbientLight {
  constructor(initialProperties) {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.instanceName = initialProperties.instanceName;

    this.setLight();
  }

  setLight() {
    const ambientLight = new THREE.AmbientLight(0xad976f, 0.5);
    this.light = ambientLight;

    this.scene.add(this.light);
    // const directionalLightCameraHelper = new THREE.CameraHelper(
    //   directionalLight.shadow.camera
    // );
    // directionalLightCameraHelper.visible = false;
    // this.scene.add(directionalLightCameraHelper);
  }

  initializeEffects(effects) {
    executeInitializeEffects(this, effects, this.experience.time);
  }

  update(effects) {
    executeEffects(
      this,
      effects,
      this.experience.time.delta,
      this.experience.time.elapsed
    );
  }

  moveOffStage() {
    const offStagePlacement = get(Config, "offStage");

    this.light.position.set(
      offStagePlacement.x,
      offStagePlacement.y,
      offStagePlacement.z
    );
  }

  destroy() {
    const object = this.scene.getObjectByProperty("uuid", this.light.uuid);
    this.scene.remove(object);
  }
}
