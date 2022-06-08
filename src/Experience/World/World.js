import Experience from "Experience/Experience.js";
import Environment from "Experience/World/Environment.js";

// vvv Timeline vvv
import { initializeWorldObjects } from "./initializeWorldObjects";
import { timeline_intro } from "Experience/Timeline/Sections/Intro/Intro";
import { timeline_a_section_background } from "Experience/Timeline/Sections/A_Section/Background";

import { timeline_a_section_1_stanza } from "Experience/Timeline/Sections/A_Section/1_Stanza";
import { timeline_a_section_ad_lib_1_for_you_for_you } from "Experience/Timeline/Sections/A_Section/ad_libs/1_for_you_for_you";
import { timeline_a_section_2_stanza } from "Experience/Timeline/Sections/A_Section/2_Stanza";
import { timeline_a_section_ad_lib_2_for_you_for_you } from "Experience/Timeline/Sections/A_Section/ad_libs/2_for_you_for_you";
import { timeline_a_section_3_stanza } from "Experience/Timeline/Sections/A_Section/3_Stanza";
import { timeline_a_section_ad_lib_3_for_you } from "Experience/Timeline/Sections/A_Section/ad_libs/3_for_you";
import { timeline_a_section_4_stanza } from "Experience/Timeline/Sections/A_Section/4_Stanza";
import { timeline_b_section_cutaway_1_flag } from "Experience/Timeline/Sections/B_Section/Cutaways/1_Flag";
// import { timeline_b_section_backgrounds } from "Experience/Timeline/Sections/B_Section/Backgrounds";
import { timeline_light_1 } from "Experience/Timeline/Lights/Light1";
// import { timeline_light_2 } from "Experience/Timeline/Lights/Light2";

import { timeline_b_section_1_stanza } from "Experience/Timeline/Sections/B_Section/1_Stanza";
import { timeline_b_section_2_stanza } from "Experience/Timeline/Sections/B_Section/2_Stanza";

import { timeline_bridge_cross } from "Experience/Timeline/Sections/Bridge/Cross";
import { timeline_bridge_white_background } from "Experience/Timeline/Sections/Bridge/Background";

import { timeline_bridge_line_1 } from "Experience/Timeline/Sections/Bridge/Line1";
import { timeline_bridge_line_2 } from "Experience/Timeline/Sections/Bridge/Line2";

// import { timeline_cross_to_english_cross } from "Experience/Sequences/CrossToEnglishCross";

// GLOBALS
import { timeline_camera } from "../Timeline/Camera/Camera";

// ^^^ Timeline ^^^

import { get } from "lodash";
import { INSTANCE_NAMES } from "../Utils/Enums";

import { lightLoop } from "Experience/DynamicSequences/lightLoop";

export default class World {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    // this.audio = this.experience.audio
    this.timelineOfEvents = {};
    this.updatables = {};
    this.reusables = {};

    // Wait for resources
    this.resources.on("ready", () => {
      // Setup
      // // vvv NEW TIMELINE vvv
      initializeWorldObjects(this.reusables);

      // timeline_intro(this.timelineOfEvents);
      // // timeline_a_section_background(this.timelineOfEvents);
      // timeline_a_section_1_stanza(this.timelineOfEvents);
      // timeline_a_section_ad_lib_1_for_you_for_you(this.timelineOfEvents);
      // timeline_a_section_2_stanza(this.timelineOfEvents);
      // // timeline_a_section_ad_lib_2_for_you_for_you(this.timelineOfEvents);
      // timeline_a_section_3_stanza(this.timelineOfEvents);
      // // timeline_a_section_ad_lib_3_for_you(this.timelineOfEvents);
      // timeline_a_section_4_stanza(this.timelineOfEvents);

      // timeline_light_1(this.timelineOfEvents);
      // /* v can't handle this v */
      // // timeline_light_2(this.timelineOfEvents);
      // /* ^ ^ */
      // timeline_camera(this.timelineOfEvents);

      // timeline_b_section_cutaway_1_flag(this.timelineOfEvents);
      // // timeline_b_section_backgrounds(this.timelineOfEvents);
      // timeline_b_section_1_stanza(this.timelineOfEvents);
      // timeline_b_section_2_stanza(this.timelineOfEvents);

      // // timeline_bridge_cross(this.timelineOfEvents);
      // timeline_bridge_white_background(this.timelineOfEvents);

      // timeline_bridge_line_1(this.timelineOfEvents);
      // timeline_bridge_line_2(this.timelineOfEvents);
      // // ^^^ NEW TIMELINE ^^^

      // vvv Alt Sequence vvv
      // timeline_cross_to_english_cross(this.timelineOfEvents);
      // ^^^ Alt Sequence ^^^

      console.log("calling lightLoop");
      lightLoop(
        window.experience.world.timelineOfEvents,
        window.experience.time,
        window.experience.directionalLight.light.position,
        { x: 30, y: 0, z: 0 },
        3
      );

      this.environment = new Environment();
    });
  }

  update() {
    console.log("update");

    for (let updatableId in this.timelineOfEvents) {
      // debugger;

      const updatable = this.timelineOfEvents[updatableId];

      if (
        // !updatable.isGlobal &&
        updatable.started === false &&
        updatable.startAt < this.experience.time.elapsed &&
        this.experience.time.elapsed < updatable.endAt
      ) {
        // if clip is active
        updatable.started = true;
        this.updatables[updatableId] = this.reusables[updatable.instanceName];
        this.updatables[updatableId].initializeEffects(updatable.effects);
        // -^-^- -^-^- -^-^- -^-^-
      } else if (
        this.experience.time.elapsed > updatable.endAt &&
        updatable.started === true &&
        !updatable.isLoop
      ) {
        // debugger;

        if (!updatable.isGlobal) {
          console.log("*** moveOffStage ***");
          this.updatables[updatableId].moveOffStage();
        }
        this.timelineOfEvents[updatableId].started = false;
        delete this.updatables[updatableId];
      } else if (updatable.isLoop) {
        console.log("LEAVE IT");
      }
    }

    for (let updatableId in this.updatables) {
      // debugger;

      const updatable = this.timelineOfEvents[updatableId];
      if ([INSTANCE_NAMES.CAMERA].includes(updatable.instanceName)) {
        // * ANIMATE GLOBAL CAMERA * //
        window.experience.camera.updateCamera(updatable.effects);
      } else if (
        [INSTANCE_NAMES.DIRECTIONAL_LIGHT_1].includes(updatable.instanceName)
      ) {
        if (!updatable.isLoop) {
          window.experience.directionalLight.update(updatable.effects);
        } else {
          console.log("update Light loop");
          window.experience.directionalLight.updateLoop();
        }
      } else {
        debugger;

        this.updatables[updatableId].update(updatable.effects);
      }
    }
  }

  reset() {}
}
