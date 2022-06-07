import * as THREE from "three";
import Experience from "Experience/Experience.js";

import { executeEffects } from "Experience/Utils/ExecuteEffects.js";
import { executeInitializeEffects } from "Experience/Utils/ExecuteInitializeEffects.js";

import { Config } from "Experience/Config";
import { get } from "lodash";

export default class Light {
  constructor(initialProperties) {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.instanceName = initialProperties.instanceName;

    this.setLight();
  }

  setLight() {
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1, 1);
    directionalLight.castShadow = get(Config, "shadows.castShadows", false);
    directionalLight.shadow.mapSize.width = get(
      Config,
      "shadows.mapSize.x",
      2048
    );
    directionalLight.shadow.mapSize.height = get(
      Config,
      "shadows.mapSize.y",
      2048
    );
    directionalLight.shadow.camera.near = 4;
    directionalLight.shadow.camera.far = 10;
    directionalLight.shadow.camera.top = 12;
    directionalLight.shadow.camera.right = 12;
    directionalLight.shadow.camera.bottom = -10;
    directionalLight.shadow.camera.left = -20;
    directionalLight.position.set(-2, 0, 0);

    const t = new THREE.Object3D();
    t.translateX(0);
    t.translateY(0);
    t.translateZ(0);
    directionalLight.target = t;

    this.light = directionalLight;

    this.scene.add(directionalLight);
    this.scene.add(directionalLight.target);
    const directionalLightCameraHelper = new THREE.DirectionalLightHelper(
      // directionalLight.shadow.camera
      directionalLight,
      5
    );
    directionalLightCameraHelper.visible = true;
    this.scene.add(directionalLightCameraHelper);
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
