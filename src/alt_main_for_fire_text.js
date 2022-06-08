// import * as THREE from "three";

// import Stats from "stats.js";
// import { GUI } from "lil-gui";

import { Fire } from "./FireExperience/Fire_es5";
// import { Fire } from './jsm/objects/Fire.js';

import * as THREE from "./FireExperience/build/three.module.js";

import Stats from "./FireExperience/jsm/libs/stats.module.js";
import { GUI } from "./FireExperience/jsm/libs/dat.gui.module.js";

import { get } from "lodash";

import { Config } from "./Experience/Config";

// vvv vvv Exporter vvv vvv
var capturer = null;

if (get(Config, "exportMode")) {
  // debugger;
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
        timeLimit: 5,
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
      //this.setAttribute( 'href',  );
      capturer.save();
    },
    false
  );
} else {
  let sCB = document.getElementById("start-capturing-button"),
    dVB = document.getElementById("download-video-button");

  let peaksOverview = document.getElementById("overview-container");

  sCB.style.display = "none";
  dVB.style.display = "none";
  if (peaksOverview) peaksOverview.style.opacity = 100;
}
// ^^^ ^^^ Exporter ^^^ ^^^

var camera, scene, renderer, stats;
var fire;

// var params = {
//   color1: "#ffffff",
//   color2: "#ffa000",
//   color3: "#000000",
//   colorBias: 0.8,
//   burnRate: 0.35,
//   diffuse: 1.2,
//   viscosity: 0.25,
//   expansion: -0.25,
//   swirl: 40.0,
//   drag: 0.3,
//   airSpeed: 11,
//   windX: 0.0,
//   windY: 0.7,
//   speed: 600.0,
//   massConservation: true,
// };

var params = {
  color1: "#ffffff",
  color2: "#ffa000",
  color3: "#000000",
  colorBias: 0.8,
  burnRate: 0.35,
  diffuse: 0.59,
  viscosity: 0.8,
  expansion: -0.23,
  swirl: 15.61,
  drag: 0.3,
  airSpeed: 10,
  windX: 0.0,
  windY: 0.35,
  speed: 637.0,
  massConservation: true,
};

init();
animate();

function init() {
  var width = window.innerWidth;
  var height = window.innerHeight;

  camera = new THREE.PerspectiveCamera(70, width / height, 1, 1000);
  camera.position.z = 20;

  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x000000);

  var ambientLight = new THREE.AmbientLight(0xcccccc, 0.7);
  scene.add(ambientLight);

  var pointLight = new THREE.PointLight(0xffffff, 0.8);
  camera.add(pointLight);
  scene.add(camera);

  var plane = new THREE.PlaneBufferGeometry(120, 120);
  fire = new Fire(
    plane,
    {
      // textureWidth: 512,
      // textureHeight: 512,
      // textureWidth: 1024,
      // textureHeight: 1024,
      textureWidth: 2048,
      textureHeight: 2048,
      // textureWidth: 4096,
      // textureHeight: 4096,
      debug: false,
    },
    scene,
    camera
  );
  fire.position.z = -32;
  scene.add(fire);

  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.autoClear = false;
  document.body.appendChild(renderer.domElement);

  function updateColor1(value) {
    fire.color1.set(value);
  }

  function updateColor2(value) {
    fire.color2.set(value);
  }

  function updateColor3(value) {
    fire.color3.set(value);
  }

  function updateColorBias(value) {
    fire.colorBias = value;
  }

  function updateBurnRate(value) {
    fire.burnRate = value;
  }

  function updateDiffuse(value) {
    fire.diffuse = value;
  }

  function updateViscosity(value) {
    fire.viscosity = value;
  }

  function updateExpansion(value) {
    fire.expansion = value;
  }

  function updateSwirl(value) {
    fire.swirl = value;
  }

  function updateDrag(value) {
    fire.drag = value;
  }

  function updateAirSpeed(value) {
    fire.airSpeed = value;
  }

  function updateWindX(value) {
    fire.windVector.x = value;
  }

  function updateWindY(value) {
    fire.windVector.y = value;
  }

  function updateSpeed(value) {
    fire.speed = value;
  }

  function updateMassConservation(value) {
    fire.massConservation = value;
  }

  params.Single = function () {
    fire.clearSources();
    fire.addSource(0.5, 0.1, 0.1, 1.0, 0.0, 1.0);
  };

  params.Multiple = function () {
    fire.clearSources();
    fire.addSource(0.45, 0.1, 0.1, 0.5, 0.0, 1.0);
    fire.addSource(0.55, 0.1, 0.1, 0.5, 0.0, 1.0);
  };

  function draw3dText(context, text, x, y, textDepth) {
    var n;

    // draw bottom layers
    for (n = 0; n < textDepth; n++) {
      context.fillText(text, x - n, y - n);
    }

    // draw top layer with shadow casting over
    // bottom layers
    context.fillStyle = "#5E97FF";
    context.shadowColor = "black";
    context.shadowBlur = 10;
    context.shadowOffsetX = textDepth + 2;
    context.shadowOffsetY = textDepth + 2;
    context.fillText(text, x - n, y - n);
  }

  params.Text = function () {
    var text = "Hallelujah";
    var size = 100;
    var color = "#FF0040";
    // vvv vvv 2D
    // var canvas = document.createElement("canvas");
    // canvas.width = 1024;
    // canvas.height = 1024;
    // var context = canvas.getContext("2d");
    // context.font = size + "pt Arial";

    // context.strokeStyle = "black";
    // context.strokeRect(0, 0, canvas.width, canvas.height);
    // context.textAlign = "center";
    // context.textBaseline = "middle";
    // context.lineWidth = 5;
    // context.strokeStyle = color;
    // context.fillStyle = "black";

    // context.strokeText(text, canvas.width / 2, canvas.height * 0.75);
    // ^^^ ^^^
    // vvv vvv 2D
    // vvv vvv 2D Alternative
    var canvas = document.createElement("canvas");
    // canvas.width = 1920;
    // canvas.height = 1080;
    var context = canvas.getContext("2d");

    // context.font = "24pt Helvetica";
    context.font = "32pt Helvetica"; // For Final Hallelujah
    // context.fillStyle = "black";
    context.fillStyle = "rgba(255, 255, 255, 0.5)";
    // align text horizontally center
    context.textAlign = "center";
    // align text vertically center
    context.textBaseline = "middle";
    // draw3dText(context, "Hallejujah", canvas.width / 2, 120, 5);
    // draw3dText(context, "Hallejujah", canvas.width / 2, 1200, 50);
    // draw3dText(context, "It's time to say", canvas.width / 2, 64, 8);
    // draw3dText(context, "the things you've", canvas.width / 2, 96, 8);
    // draw3dText(context, "always wanted", canvas.width / 2, 96, 8);
    // draw3dText(context, "before you", canvas.width / 2, 96, 8);
    // draw3dText(context, "are forgotten", canvas.width / 2, 96, 8);

    // draw3dText(context, "Hallelujah", canvas.width / 2, 96, 8); // 3.5 seconds
    draw3dText(context, "Hallelujah", canvas.width / 2, 96, 8); //  Final Hallelujah // 4 seconds
    // ^^^ ^^^
    // ^^^ ^^^
    // vvv vvv 3D
    // var context = canvas.getContext("webgl");
    // var font;
    // var text = "Hello World";
    // var loader = new THREE.FontLoader();
    // loader.load(
    //   "fonts/helvetiker_regular.typeface.json",
    //   function (helvetiker) {
    //     font = helvetiker;
    //     var geometry = new THREE.TextGeometry(text, {
    //       font: font,
    //       size: 4,
    //       height: 4,
    //     });
    //     geometry.center();

    //     var material = new THREE.MeshStandardMaterial({
    //       color: "red",
    //     });

    //     var mesh = new THREE.Mesh(geometry, material);
    //     scene.add(mesh);
    //   }
    // );
    // ^^^ ^^^ ^^^ ^^^
    // vvv vvv 2D
    // context.font = size + "pt Arial";

    // context.strokeStyle = "black";
    // context.strokeRect(0, 0, canvas.width, canvas.height);
    // context.textAlign = "center";
    // context.textBaseline = "middle";
    // context.lineWidth = 5;
    // context.strokeStyle = color;
    // context.fillStyle = "black";

    // context.strokeText(text, canvas.width / 2, canvas.height * 0.75);
    // ^^^ ^^^

    var texture = new THREE.Texture(canvas);
    texture.needsUpdate = true;

    fire.setSourceMap(texture);
  };

  // dat.gui
  var gui = new GUI();

  gui.add(params, "Single");
  gui.add(params, "Multiple");
  gui.add(params, "Text");

  gui.addColor(params, "color1").onChange(updateColor1);
  gui.addColor(params, "color2").onChange(updateColor2);
  gui.addColor(params, "color3").onChange(updateColor3);
  gui.add(params, "colorBias", 0.0, 1.0).onChange(updateColorBias);
  gui.add(params, "burnRate", 0.0, 10.0).onChange(updateBurnRate);
  gui.add(params, "diffuse", 0.0, 5.0).step(0.01).onChange(updateDiffuse);
  gui.add(params, "viscosity", 0.0, 5.0).step(0.01).onChange(updateViscosity);
  gui.add(params, "expansion", -1.0, 1.0).step(0.01).onChange(updateExpansion);
  gui.add(params, "swirl", 0.0, 50.0).step(0.01).onChange(updateSwirl);
  gui.add(params, "drag", 0.0, 1.0).onChange(updateDrag);
  gui.add(params, "airSpeed", 0.0, 50.0).onChange(updateAirSpeed);
  gui.add(params, "windX", -5, 5).step(0.01).onChange(updateWindX);
  gui.add(params, "windY", -5, 5).step(0.01).onChange(updateWindY);
  gui.add(params, "speed", 0, 1000).onChange(updateSpeed);
  gui.add(params, "massConservation").onChange(updateMassConservation);

  function updateAll() {
    updateColor1(params.color1);
    updateColor2(params.color2);
    updateColor3(params.color3);
    updateColorBias(params.colorBias);
    updateBurnRate(params.burnRate);
    updateDiffuse(params.diffuse);
    updateViscosity(params.viscosity);
    updateExpansion(params.expansion);
    updateSwirl(params.swirl);
    updateDrag(params.drag);
    updateAirSpeed(params.airSpeed);
    updateWindX(params.windX);
    updateWindY(params.windY);
    updateSpeed(params.speed);
    updateMassConservation(params.massConservation);

    for (var i in gui.__controllers) {
      gui.__controllers[i].updateDisplay();
    }
  }

  params.Candle = function () {
    params.color1 = 0xffffff;
    params.color2 = 0xffa000;
    params.color3 = 0x000000;
    params.windX = 0.0;
    params.windY = 0.5;
    params.colorBias = 0.3;
    params.burnRate = 1.6;
    params.diffuse = 1.33;
    params.viscosity = 1.33;
    params.expansion = 0.0;
    params.swirl = 0.0;
    params.drag = 0.0;
    params.airSpeed = 8.0;
    params.speed = 500.0;
    params.massConservation = false;

    updateAll();
  };
  gui.add(params, "Candle");

  params.Torch = function () {
    params.color1 = 0xffdcaa;
    params.color2 = 0xffa000;
    params.color3 = 0x000000;
    params.windX = 0.0;
    params.windY = 0.75;
    params.colorBias = 0.9;
    params.burnRate = 1.0;
    params.diffuse = 1.33;
    params.viscosity = 0.25;
    params.expansion = 0.0;
    params.swirl = 50.0;
    params.drag = 0.35;
    params.airSpeed = 10.0;
    params.speed = 500.0;
    params.massConservation = false;

    updateAll();
  };
  gui.add(params, "Torch");

  params.Campfire = function () {
    params.color1 = 0xffffff;
    params.color2 = 0xffa000;
    params.color3 = 0x000000;
    params.windX = 0.0;
    params.windY = 0.75;
    params.colorBias = 0.8;
    params.burnRate = 0.3;
    params.diffuse = 1.33;
    params.viscosity = 0.25;
    params.expansion = -0.25;
    params.swirl = 50.0;
    params.drag = 0.35;
    params.airSpeed = 12.0;
    params.speed = 500.0;
    params.massConservation = false;

    updateAll();
  };
  gui.add(params, "Campfire");

  params.Fireball = function () {
    params.color1 = 0xffffff;
    params.color2 = 0xffa000;
    params.color3 = 0x000000;
    params.windX = 0.0;
    params.windY = 0.75;
    params.colorBias = 0.8;
    params.burnRate = 1.2;
    params.diffuse = 3.0;
    params.viscosity = 0.0;
    params.expansion = 0.0;
    params.swirl = 6.0;
    params.drag = 0.0;
    params.airSpeed = 20.0;
    params.speed = 500.0;
    params.massConservation = false;

    updateAll();
  };
  gui.add(params, "Fireball");

  params.Iceball = function () {
    params.color1 = 0x00bdf7;
    params.color2 = 0x1b3fb6;
    params.color3 = 0x001869;
    params.windX = 0.0;
    params.windY = -0.25;
    params.colorBias = 0.25;
    params.burnRate = 2.6;
    params.diffuse = 5.0;
    params.viscosity = 0.5;
    params.expansion = 0.75;
    params.swirl = 30.0;
    params.drag = 0.0;
    params.airSpeed = 40.0;
    params.speed = 500.0;
    params.massConservation = false;

    updateAll();
  };
  gui.add(params, "Iceball");

  params.Smoke = function () {
    params.color1 = 0xd2d2d2;
    params.color2 = 0xd7d7d7;
    params.color3 = 0x000000;
    params.windX = -0.05;
    params.windY = 0.15;
    params.colorBias = 0.95;
    params.burnRate = 0.0;
    params.diffuse = 1.5;
    params.viscosity = 0.25;
    params.expansion = 0.2;
    params.swirl = 3.75;
    params.drag = 0.4;
    params.airSpeed = 18.0;
    params.speed = 500.0;
    params.massConservation = false;

    updateAll();
  };
  gui.add(params, "Smoke");

  params.Cigar = function () {
    params.color1 = 0xc5c5c5;
    params.color2 = 0x787878;
    params.color3 = 0x000000;
    params.windX = 0.0;
    params.windY = 0.3;
    params.colorBias = 0.55;
    params.burnRate = 0.0;
    params.diffuse = 1.3;
    params.viscosity = 0.05;
    params.expansion = -0.05;
    params.swirl = 3.7;
    params.drag = 0.6;
    params.airSpeed = 6.0;
    params.speed = 500.0;
    params.massConservation = false;

    updateAll();
  };
  gui.add(params, "Cigar");

  gui.open();

  // params.Campfire();
  // params.Single();
  params.Text();

  stats = new Stats();
  // document.body.appendChild(stats.dom);

  window.addEventListener("resize", onWindowResize, false);
}

function onWindowResize() {
  var width = window.innerWidth;
  var height = window.innerHeight;

  camera.aspect = width / height;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
  // debugger;
  requestAnimationFrame(animate);

  renderer.clear();
  renderer.render(scene, camera);

  // * v CCapture HERE v *
  if (get(Config, "exportMode")) {
    // debugger;
    if (capturer) capturer.capture(renderer.domElement);
  }
  // debugger;

  // stats.update();
}
