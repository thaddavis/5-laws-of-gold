import * as THREE from "three";
import Experience from "Experience/Experience.js";

import { Vector2 } from "three";

import { executeEffects } from "Experience/Utils/ExecuteEffects.js";
import { executeInitializeEffects } from "Experience/Utils/ExecuteInitializeEffects.js";

import { get } from "lodash";
import { Config } from "Experience/Config";

export default class SkinPlane1 {
  constructor(initialProperties) {
    // this.timelineMetadata = timelineMetadata;
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.instanceName = initialProperties.instanceName;

    this.setGeometry();
    this.setTextures();
    this.setMaterial();
    this.setMesh();
  }

  setGeometry() {
    this.geometry = new THREE.PlaneGeometry(20, 20, 10, 10);
  }

  setTextures() {
    this.textures = {};

    this.textures.color = this.resources.items.skin1ColorTexture;
    this.textures.color.encoding = THREE.sRGBEncoding;

    this.textures.normal = this.resources.items.skin1NormalTexture;
    this.textures.aoMap = this.resources.items.skin1AoMapTexture;
    this.textures.height = this.resources.items.skin1HeightTexture;
  }

  setMaterial() {
    this.material = new THREE.MeshStandardMaterial({
      map: this.textures.color,
      normalMap: this.textures.normal,
      normalScale: new Vector2(0.5, 0.5),
      aoMap: this.textures.aoMap,
      aoMapIntensity: 1,
      displacementMap: this.textures.height,
      displacementScale: 0.05,
      transparent: true,
    });
  }

  setMesh() {
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.receiveShadow = get(Config, "shadows.receiveShadows", false);
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
