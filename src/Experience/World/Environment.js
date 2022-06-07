import * as THREE from "three";
import Experience from "../Experience.js";

export default class Environment {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.debug = this.experience.debug;

    // this.setLights()
    this.addGrid();
    // this.addFrame()
    // this.setEnvironmentMap()
  }

  // setLights()
  // {

  // }

  setEnvironmentMap() {
    this.environmentMap = {};
    this.environmentMap.intensity = 0.4;
    this.environmentMap.texture = this.resources.items.environmentMapTexture;
    this.environmentMap.texture.encoding = THREE.sRGBEncoding;

    this.scene.environment = this.environmentMap.texture;

    this.environmentMap.updateMaterials = () => {
      this.scene.traverse((child) => {
        if (
          child instanceof THREE.Mesh &&
          child.material instanceof THREE.MeshStandardMaterial
        ) {
          child.material.envMap = this.environmentMap.texture;
          child.material.envMapIntensity = this.environmentMap.intensity;
          child.material.needsUpdate = true;
        }
      });
    };
    this.environmentMap.updateMaterials();

    // Debug
    if (this.debug.active) {
      this.debugFolder
        .add(this.environmentMap, "intensity")
        .name("envMapIntensity")
        .min(0)
        .max(4)
        .step(0.001)
        .onChange(this.environmentMap.updateMaterials);
    }
  }

  addGrid() {
    // console.log('addGrid')
    // this.gridHelper = new THREE.GridHelper(10, 10);
    // this.gridHelper.rotation.x = -Math.PI * 0.5;
    // this.scene.add(this.gridHelper);
    // The X axis is red. The Y axis is green. The Z axis is blue.
    // const axesHelper = new THREE.AxesHelper(5);
    // this.scene.add(axesHelper);
  }

  addFrame() {
    // console.log('addFrame')

    const points = [];
    points.push(new THREE.Vector3(-16, -9, 0));
    points.push(new THREE.Vector3(-16, 9, 0));
    points.push(new THREE.Vector3(16, 9, 0));
    points.push(new THREE.Vector3(16, -9, 0));
    points.push(new THREE.Vector3(-16, -9, 0));

    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const material = new THREE.MeshBasicMaterial({
      color: "orange",
    });

    this.frame = new THREE.Line(geometry, material);
    this.scene.add(this.frame);
  }
}
