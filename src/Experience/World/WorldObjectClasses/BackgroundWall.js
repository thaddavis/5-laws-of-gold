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
    this.setTextures();
    this.setMaterial(initialProperties);
    this.setMesh(initialProperties);
  }

  setGeometry() {
    this.geometry = new THREE.PlaneGeometry(40, 40, 10, 10);
  }

  setTextures() {
    this.textures = {};

    // brick
    // this.textures.color = this.resources.items.brickColorTexture;
    // this.textures.color.encoding = THREE.sRGBEncoding;
    // this.textures.normal = this.resources.items.brickNormalTexture;
    // this.textures.aoMap = this.resources.items.brickAoMapTexture;
    // this.textures.height = this.resources.items.brickHeightTexture;

    // brickTerracota
    // this.textures.color = this.resources.items.brickTerracotaColorTexture;
    // this.textures.color.encoding = THREE.sRGBEncoding;
    // this.textures.normal = this.resources.items.brickTerracotaNormalTexture;
    // this.textures.aoMap = this.resources.items.brickTerracotaAoMapTexture;
    // this.textures.height = this.resources.items.brickTerracotaHeightTexture;

    // brickPlainHeightTexture
    this.textures.color = this.resources.items.brickPlainColorTexture;
    this.textures.color.encoding = THREE.sRGBEncoding;
    this.textures.normal = this.resources.items.brickPlainNormalTexture;
    this.textures.aoMap = this.resources.items.brickPlainAoMapTexture;
    this.textures.height = this.resources.items.brickPlainHeightTexture;
  }

  setMaterial(initialProperties) {
    const color = initialProperties.color || "#ad976f";

    this.material = new THREE.MeshStandardMaterial({
      // color: color,
      map: this.textures.color,
      normalMap: this.textures.normal,
      normalScale: new THREE.Vector2(0.2, 0.2),
      aoMap: this.textures.aoMap,
      aoMapIntensity: 1,
      displacementMap: this.textures.height,
      displacementScale: 0.3,
      transparent: true,
    });

    // this.material = new THREE.MeshStandardMaterial({
    //   color: "black",
    // });
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
    console.log("!#$!#$!#$");

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
