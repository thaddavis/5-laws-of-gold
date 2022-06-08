import * as THREE from "three";
import Experience from "Experience/Experience.js";

import { executeEffects } from "Experience/Utils/ExecuteEffects.js";
import { executeInitializeEffects } from "Experience/Utils/ExecuteInitializeEffects.js";

import { get } from "lodash";
import { Config } from "Experience/Config";

export default class BackgroundWall {
  constructor(initialProperties) {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.instanceName = initialProperties.instanceName;

    this.setGeometry();
    this.setMaterial(initialProperties);
    this.setMesh(initialProperties);
  }

  setGeometry() {
    this.geometry = new THREE.PlaneGeometry(40, 40, 10, 10);
  }

  setMaterial(initialProperties) {
    const color = initialProperties.color || "white";

    this.material = new THREE.MeshStandardMaterial({
      color: color,
    });
  }

  setMesh(initialProperties) {
    this.mesh = new THREE.Mesh(this.geometry, this.material);

    console.log("BackgroundWall", initialProperties);

    this.mesh.position.set(
      initialProperties.position.x,
      initialProperties.position.y,
      initialProperties.position.z
    );

    this.mesh.receiveShadow = get(Config, "shadows.receiveShadows", false);
    this.scene.add(this.mesh);
  }

  initializeEffects(effects) {
    executeInitializeEffects(this, effects, this.experience.time);
  }

  update(effects) {
    // debugger;
    executeEffects(
      this,
      effects,
      this.experience.time.delta,
      this.experience.time.elapsed
    );
  }

  moveOffStage() {
    const offStagePlacement = get(Config, "offStage");

    this.mesh.position.set(
      offStagePlacement.x,
      offStagePlacement.y,
      offStagePlacement.z
    );
  }

  destroy() {
    const object = this.scene.getObjectByProperty("uuid", this.mesh.uuid);
    object.geometry.dispose();
    object.material.dispose();
    this.scene.remove(object);
  }
}
