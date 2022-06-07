import * as THREE from "three";
import Stats from "stats.js";

import Debug from "./Utils/Debug.js";
import Sizes from "./Utils/Sizes.js";
import Time from "./Utils/Time.js";
import Camera from "./Camera.js";
import DirectionalLight1 from "Experience/World/WorldObjectClasses/DirectionalLight1";
import Renderer from "./Renderer.js";
import World from "./World/World.js";
import Resources from "./Utils/Resources.js";
import { Config } from "./Config";

import { INSTANCE_NAMES } from "./Utils/Enums.js";

import sources from "./sources.js";
import EffectComposerClass from "./EffectComposerClass.js";

// import AudioClass from "./World/AudioClass.js";

import { get } from "lodash";

// import Capturer from "./Capturer.js";

let instance = null; // Experience singleton

if (get(Config, "exportMode")) {
  var capturer = null;
  var sCB = document.getElementById("start-capturing-button"),
    dVB = document.getElementById("download-video-button");

  sCB.addEventListener(
    "click",
    function (e) {
      let options = {
        framerate: 30,
      };

      capturer = new CCapture({
        verbose: true,
        display: true,
        framerate: options.framerate,
        motionBlurFrames: (960 / options.framerate) * 0,
        quality: 99,
        format: "webm", // webm || gif || png || jpg || webm-mediarecorder
        workersPath: "../../src/",
        // timeLimit: 140,
        // timeLimit: 75,
        timeLimit: 8,
        frameLimit: 0,
        autoSaveTime: 0,
        onProgress: function (p) {
          console.log("PROGRESSION");
        },
      });

      capturer.start();
      this.style.display = "none";
      dVB.style.display = "block";
      e.preventDefault();
    },
    false
  );

  dVB.addEventListener(
    "click",
    function (e) {
      capturer.stop();
      this.style.display = "none";
      // this.setAttribute( 'href',  );
      capturer.save();
    },
    false
  );
} else {
  let sCB = document.getElementById("start-capturing-button"),
    dVB = document.getElementById("download-video-button");

  let peaksOverview = document.getElementById("overview-container");
  let peaksZoomview = document.getElementById("zoomview-container");

  sCB.style.display = "none";
  dVB.style.display = "none";
  if (peaksOverview) peaksOverview.style.opacity = 100;
  if (peaksZoomview) peaksZoomview.style.opacity = 100;
}

export default class Experience {
  constructor(_canvas, playerInstance) {
    // debugger
    // Singleton
    if (instance) {
      return instance;
    }
    instance = this;

    // Global access
    window.experience = this;

    // debugger

    // Options
    this.canvas = _canvas;

    // Setup
    this.debug = new Debug();
    this.sizes = new Sizes();
    this.time = new Time(playerInstance);
    this.playerInstance = playerInstance;
    this.scene = new THREE.Scene();

    this.resources = new Resources(sources);

    this.camera = new Camera();

    this.directionalLight = new DirectionalLight1({
      instanceName: INSTANCE_NAMES.DIRECTIONAL_LIGHT_1,
      position: new THREE.Vector3(0, 0, 2),
      target: new THREE.Vector3(0, 0, -2),
    });
    this.renderer = new Renderer();
    // this.capturer = new Capturer();

    if (get(Config, "useEffectComposer")) {
      this.effectComposer = new EffectComposerClass();
    }

    this.world = new World();

    this.stats = new Stats();
    this.stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
    document.body.appendChild(this.stats.dom);

    // Resize event
    this.sizes.on("resize", () => {
      this.resize();
    });

    // Time tick event
    this.time.on("tick", () => {
      // console.log('tick...')
      this.update();
    });
  }

  resize() {
    this.camera.resize();
    this.renderer.resize();
    if (get(Config, "useEffectComposer")) {
      this.effectComposer.resize();
    }
  }

  update() {
    this.stats.begin();

    // console.log("Experience.js update");

    this.camera.update();
    this.world.update();
    if (get(Config, "useEffectComposer")) {
      this.effectComposer.update();
    } else {
      this.renderer.update();
    }

    // * v CCapture HERE v *
    if (get(Config, "exportMode")) {
      console.log("HERE");
      if (capturer) capturer.capture(this.renderer.instance.domElement);
    }
    // debugger;
    // * ^ CCapture HERE ^ *

    this.stats.end();
  }

  destroy() {
    this.sizes.off("resize");
    this.time.off("tick");

    // Traverse the whole scene
    this.scene.traverse((child) => {
      // Test if it's a mesh
      if (child instanceof THREE.Mesh) {
        child.geometry.dispose();

        // Loop through the material properties
        for (const key in child.material) {
          const value = child.material[key];

          // Test if there is a dispose function
          if (value && typeof value.dispose === "function") {
            value.dispose();
          }
        }
      }
    });

    this.camera.controls.dispose();
    this.renderer.instance.dispose();

    instance = null;

    if (this.debug.active) this.debug.ui.destroy();
  }
}
