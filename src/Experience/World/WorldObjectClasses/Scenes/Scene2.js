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

export default class Scene2 {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;

    console.log("--- Scene2 ---");

    this.group = new THREE.Group();

    this.background = new BackgroundWall({
      instanceName: INSTANCE_NAMES.BACKGROUND_WALL,
      position: new THREE.Vector3(0, 0, 0),
      // scale: new THREE.Vector3(1.2, 1.2, 1.2),
    });

    this.group.add(this.background.mesh);

    this.text = new MetalText({
      instanceName: INSTANCE_NAMES.TWO,
      text: "2.",
      position: new THREE.Vector3(0, 4, 2),
      scale: new THREE.Vector3(1.2, 1.2, 1.2),
    });

    this.group.add(this.text.mesh);

    this.part1OfLaw2 = new MetalText({
      instanceName: INSTANCE_NAMES.PART_1_OF_LAW_2,
      text: "Gold works diligently",
      position: new THREE.Vector3(0, 2, 2),
      scale: new THREE.Vector3(1, 1, 1),
    });

    this.group.add(this.part1OfLaw2.mesh);

    this.part2OfLaw2 = new MetalText({
      instanceName: INSTANCE_NAMES.PART_2_OF_LAW_2,
      text: "for those who invest it wisely.",
      position: new THREE.Vector3(0, 0, 2),
      scale: new THREE.Vector3(1, 1, 1),
    });

    this.group.add(this.part2OfLaw2.mesh);

    this.group.position.set(0, 0, -40);

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
