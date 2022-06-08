import * as THREE from "three";
import Experience from "../../Experience.js";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";

import { executeEffects } from "Experience/Utils/ExecuteEffects.js";
import { executeInitializeEffects } from "Experience/Utils/ExecuteInitializeEffects.js";

import { Config } from "Experience/Config/index.js";
import { get } from "lodash";

export default class MetalText {
  constructor(initialProperties) {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;

    this.instanceName = initialProperties.instanceName;

    this.setGeometry(initialProperties);
    this.setMaterial();
    this.setMesh(initialProperties);
  }

  setGeometry(initialProperties) {
    this.geometry = new TextGeometry(initialProperties.text, {
      // font: this.experience.resources.items["helvetikerFont"],
      font: this.experience.resources.items["helvetikerBoldFont"],
      // font: this.experience.resources.items["gentilisFont"],
      size: 1.0,
      height: 0.2,
      curveSegments: 64,
      bevelEnabled: false,
      bevelThickness: 0.02,
      bevelSize: 0.02,
      bevelOffset: 0,
      bevelSegments: 32,
    });
  }

  setMaterial() {
    this.material = new THREE.MeshStandardMaterial({
      color: 0xffdf4f,
      metalness: 0.9,
      roughness: 0,
      emissive: 0xffdf4f,
      emissiveIntensity: 0.1,
    });
  }

  setMesh(initialProperties) {
    this.geometry.center();
    this.mesh = new THREE.Mesh(this.geometry, this.material);

    this.mesh.position.set(
      initialProperties.position.x,
      initialProperties.position.y,
      initialProperties.position.z
    );
    this.mesh.scale.set(
      initialProperties.scale.x,
      initialProperties.scale.y,
      initialProperties.scale.z
    );

    this.mesh.name = initialProperties.instanceName;

    this.mesh.castShadow = true;
    this.scene.add(this.mesh);
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
