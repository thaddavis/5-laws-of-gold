import * as THREE from "three";
import Experience from "Experience/Experience.js";

import { executeEffects } from "Experience/Utils/ExecuteEffects.js";
import { executeInitializeEffects } from "Experience/Utils/ExecuteInitializeEffects.js";

import { Config } from "Experience/Config";
import { get } from "lodash";

import GUI from "lil-gui";

function makeXYZGUI(gui, vector3, name, onChangeFn) {
  const folder = gui.addFolder(name);
  folder.add(vector3, "x", -10, 10).onChange(onChangeFn);
  folder.add(vector3, "y", -10, 10).onChange(onChangeFn);
  folder.add(vector3, "z", -10, 10).onChange(onChangeFn);
  folder.open();
}

export default class DirectionalLight1 {
  constructor(initialProperties) {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.instanceName = initialProperties.instanceName;

    // this.gui = new GUI();

    this.setLight(initialProperties.position, initialProperties.target);
  }

  setLight(position, target) {
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1, 1);
    directionalLight.name = this.instanceName;
    this.light = directionalLight;

    directionalLight.position.set(position.x, position.y, position.z);
    directionalLight.target.position.set(target.x, target.y, target.z);

    this.scene.add(directionalLight);
    this.scene.add(directionalLight.target);
    const directionalLightCameraHelper = new THREE.DirectionalLightHelper(
      directionalLight
    );

    directionalLightCameraHelper.name = this.instanceName + "_HELPER";

    this.lightHelper = directionalLightCameraHelper;
    // directionalLightCameraHelper.visible = true;
    this.scene.add(directionalLightCameraHelper);

    // makeXYZGUI(this.gui, this.light.position, "position", () => {
    //   console.log("___ ___ ___");

    //   const sceneChild1 = window.experience.scene.children.find(
    //     (i) => i.name === "DIRECTIONAL_LIGHT_1"
    //   );
    //   sceneChild1.target.updateMatrixWorld();

    //   const sceneChild2 = window.experience.scene.children.find(
    //     (i) => i.name === "DIRECTIONAL_LIGHT_1_HELPER"
    //   );
    //   sceneChild2.update();
    // });

    // makeXYZGUI(this.gui, this.light.target.position, "target", () => {
    //   const sceneChild1 = window.experience.scene.children.find(
    //     (i) => i.name === "DIRECTIONAL_LIGHT_1"
    //   );
    //   sceneChild1.target.updateMatrixWorld();

    //   const sceneChild2 = window.experience.scene.children.find(
    //     (i) => i.name === "DIRECTIONAL_LIGHT_1_HELPER"
    //   );
    //   sceneChild2.update();
    // });
  }

  updateLight() {
    console.log("DirectionalLight1 updateLight");
    console.log(this.light);

    this.light.target.updateMatrixWorld();
    this.lightHelper.update();
  }

  initializeEffects(effects) {
    executeInitializeEffects(this, effects, this.experience.time);
  }

  update(effects) {
    console.log("DirectionalLight1 update(effects)", effects);

    executeEffects(
      this,
      effects,
      this.experience.time.delta,
      this.experience.time.elapsed
    );
  }

  updateLoop() {
    console.log("updatingLoop");

    // this.experience.time.elapsed

    // const newX = 1 * Math.sin(this.experience.time.elapsed);
    // const newY = 1 * Math.sin(this.experience.time.elapsed);

    const ghost3Angle = -this.experience.time.elapsed * 0.18;
    const newX =
      Math.cos(ghost3Angle) *
      (7 + Math.sin(this.experience.time.elapsed * 0.32));
    const newZ =
      Math.sin(ghost3Angle) *
        (7 + Math.sin(this.experience.time.elapsed * 0.5)) +
      20;
    const newY =
      Math.sin(this.experience.time.elapsed * 4) +
      Math.sin(this.experience.time.elapsed * 2.5);

    this.light.position.set(newX, newY, newZ);
  }

  moveOffStage() {
    console.log("moveOffStage");

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
