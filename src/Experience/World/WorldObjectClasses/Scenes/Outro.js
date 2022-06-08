import * as THREE from "three";
import Experience from "Experience/Experience.js";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";

import MetalText from "Experience/World/WorldObjectClasses/MetalText";

import { INSTANCE_NAMES } from "Experience/Utils/Enums";

import { executeEffects } from "Experience/Utils/ExecuteEffects.js";
import { executeInitializeEffects } from "Experience/Utils/ExecuteInitializeEffects.js";

import { Config } from "Experience/Config/index.js";
import { get } from "lodash";

import BackgroundWall from "../BackgroundWall";

export default class Outro {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;

    console.log("--- Outro ---");

    this.group = new THREE.Group();

    this.background = new BackgroundWall({
      instanceName: INSTANCE_NAMES.BACKGROUND_WALL,
      position: new THREE.Vector3(0, 0, 0),
      // scale: new THREE.Vector3(1.2, 1.2, 1.2),
    });

    this.group.add(this.background.mesh);

    // this.text1 = new MetalText({
    //   instanceName: INSTANCE_NAMES.FROM,
    //   text: "---",
    //   position: new THREE.Vector3(0, 4, 2),
    //   scale: new THREE.Vector3(1.2, 1.2, 1.2),
    // });

    // this.group.add(this.text1.mesh);

    this.part1 = new MetalText({
      instanceName: INSTANCE_NAMES.PART_1_OF_OUTRO,
      text: "THE RICHEST MAN IN BABYLON",
      position: new THREE.Vector3(0, 2, 2),
      scale: new THREE.Vector3(1, 1, 1),
    });

    this.group.add(this.part1.mesh);

    this.part2 = new MetalText({
      instanceName: INSTANCE_NAMES.PART_2_OF_OUTRO,
      text: "George S. Clason",
      position: new THREE.Vector3(0, 0, 2),
      scale: new THREE.Vector3(1, 1, 1),
    });

    this.group.add(this.part2.mesh);

    // this.part3 = new MetalText({
    //   instanceName: INSTANCE_NAMES.PART_3_OF_OUTRO,
    //   text: "---",
    //   position: new THREE.Vector3(0, -2, 2),
    //   scale: new THREE.Vector3(1, 1, 1),
    // });

    // this.group.add(this.part3.mesh);

    this.group.position.set(0, 0, -120);

    this.scene.add(this.group);
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

  //   moveOffStage() {
  //     const offStagePlacement = get(Config, "offStage");

  //     this.mesh.position.set(
  //       offStagePlacement.x,
  //       offStagePlacement.y,
  //       offStagePlacement.z
  //     );
  //   }

  destroy() {
    const object = this.scene.getObjectByProperty("uuid", this.mesh.uuid);
    object.geometry.dispose();
    object.material.dispose();
    this.scene.remove(object);
  }
}
