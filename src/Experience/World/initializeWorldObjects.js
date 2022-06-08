import JimboIntroTitle from "Experience/World/WorldObjectInstances/Titles/JimboIntroTitle";
import i_told_you_i_meant_it from "Experience/World/WorldObjectInstances/Titles/SectionA/1-i-told-you-i-meant-it";
import i_told_you_i_swept_it from "Experience/World/WorldObjectInstances/Titles/SectionA/2-i-told-you-i-swept-it";
import i_told_you_ill_spend_it_for_you from "Experience/World/WorldObjectInstances/Titles/SectionA/3-i-told-you-ill-spend-it-for-you";

import emotions_got_blended from "Experience/World/WorldObjectInstances/Titles/SectionA/4-emotions-got-blended";
import its_time_that_i_sent_it from "Experience/World/WorldObjectInstances/Titles/SectionA/5-its-time-that-i-sent-it";
import i_told_you_ill_rep_you_for_you from "Experience/World/WorldObjectInstances/Titles/SectionA/6-i-told-you-ill-rep-you-for-you";
import i_told_you_ill_rep_it_all_for_you from "Experience/World/WorldObjectInstances/Titles/SectionA/7-i-told-you-ill-rep-it-all-for-you";

import for_you_a from "Experience/World/WorldObjectInstances/Titles/SectionA/ad_libs/for_you_a";
import for_you_b from "Experience/World/WorldObjectInstances/Titles/SectionA/ad_libs/for_you_b";

import Flag from "Experience/World/WorldObjectInstances/Flag";

import BackgroundSkin1 from "Experience/World/WorldObjectInstances/BackgroundSkin1";
import BackgroundSkin2 from "Experience/World/WorldObjectInstances/BackgroundSkin2";

import i_just_wanna_feel_your_skin from "Experience/World/WorldObjectInstances/Titles/SectionB/1-i-just-wanna-feel-your-skin";
import up_on_mine from "Experience/World/WorldObjectInstances/Titles/SectionB/2-up-on-mine";

import Camera from "Experience/World/WorldObjectInstances/Camera";
import Light1 from "Experience/World/WorldObjectInstances/Light1";
import DirectionalLight from "Experience/World/WorldObjectInstances/DirectionalLight1";
import Globe from "Experience/World/WorldObjectInstances/Globe";
import Background from "Experience/World/WorldObjectInstances/Background";
import Cross from "Experience/World/WorldObjectInstances/Cross";
import WitherberryLogo from "./WorldObjectInstances/WitherberryLogo";

import Line1 from "Experience/World/WorldObjectInstances/Line1";
import Line2 from "Experience/World/WorldObjectInstances/Line2";

import { INSTANCE_NAMES } from "../Utils/Enums";

import { get } from "lodash";

import { Fire } from "./WorldObjectClasses/Fire";
import AmbientLight from "./WorldObjectInstances/TheRichestManInBabylon/AmbientLight";

// import The5LawsOfGold from "Experience/World/WorldObjectInstances/TheRichestManInBabylon/The5LawsOfGold";

import Intro from "Experience/World/WorldObjectInstances/TheRichestManInBabylon/Scenes/Intro";
import Scene1 from "Experience/World/WorldObjectInstances/TheRichestManInBabylon/Scenes/Scene1";
import Scene2 from "./WorldObjectInstances/TheRichestManInBabylon/Scenes/Scene2";
import Scene3 from "./WorldObjectInstances/TheRichestManInBabylon/Scenes/Scene3";
import Scene4 from "./WorldObjectInstances/TheRichestManInBabylon/Scenes/Scene4";
import Scene5 from "./WorldObjectInstances/TheRichestManInBabylon/Scenes/Scene5";
import Outro from "./WorldObjectInstances/TheRichestManInBabylon/Scenes/Outro";

export function initializeWorldObjects(reusables) {
  // reusables[INSTANCE_NAMES.JIMBO_INTRO_TITLE] = JimboIntroTitle;
  // reusables[INSTANCE_NAMES.LIGHT_1] = Light1;
  reusables[INSTANCE_NAMES.DIRECTIONAL_LIGHT_1] = DirectionalLight;
  // reusables[INSTANCE_NAMES.AMBIENT_LIGHT] = AmbientLight;
  // reusables[INSTANCE_NAMES.GLOBE] = Globe;
  // reusables[INSTANCE_NAMES.BACKGROUND] = Background;
  // reusables[INSTANCE_NAMES.CROSS] = Cross;
  // reusables[INSTANCE_NAMES.WITHERBERRY_LOGO] = WitherberryLogo;

  reusables[INSTANCE_NAMES.CAMERA] = Camera;
  reusables[INSTANCE_NAMES.INTRO] = Intro;
  reusables[INSTANCE_NAMES.OUTRO] = Outro;
  reusables[INSTANCE_NAMES.SCENE_ONE] = Scene1;
  reusables[INSTANCE_NAMES.SCENE_TWO] = Scene2;
  reusables[INSTANCE_NAMES.SCENE_THREE] = Scene3;
  reusables[INSTANCE_NAMES.SCENE_FOUR] = Scene4;
  reusables[INSTANCE_NAMES.SCENE_FIVE] = Scene5;

  // A Section

  // reusables[INSTANCE_NAMES.SECTION_A_PHRASE_1] = i_told_you_i_meant_it;
  // reusables[INSTANCE_NAMES.SECTION_A_PHRASE_2] = i_told_you_i_swept_it;
  // reusables[INSTANCE_NAMES.SECTION_A_PHRASE_3] =
  //   i_told_you_ill_spend_it_for_you;

  // reusables[INSTANCE_NAMES.SECTION_A_PHRASE_4] = emotions_got_blended;
  // reusables[INSTANCE_NAMES.SECTION_A_PHRASE_5] = its_time_that_i_sent_it;
  // reusables[INSTANCE_NAMES.SECTION_A_PHRASE_6] = i_told_you_ill_rep_you_for_you;
  // reusables[INSTANCE_NAMES.SECTION_A_PHRASE_7] =
  //   i_told_you_ill_rep_it_all_for_you;

  // reusables[INSTANCE_NAMES.SECTION_A_AD_LIBS_FOR_YOU_A] = for_you_a;
  // reusables[INSTANCE_NAMES.SECTION_A_AD_LIBS_FOR_YOU_B] = for_you_b;

  // B Section

  // reusables[INSTANCE_NAMES.FLAG] = Flag;

  // reusables[INSTANCE_NAMES.BACKGROUND_SKIN_1] = BackgroundSkin1;
  // reusables[INSTANCE_NAMES.BACKGROUND_SKIN_2] = BackgroundSkin2;

  // reusables[INSTANCE_NAMES.SECTION_B_PHRASE_1] = i_just_wanna_feel_your_skin;
  // reusables[INSTANCE_NAMES.SECTION_B_PHRASE_2] = up_on_mine;

  // BRIDGE

  // reusables[INSTANCE_NAMES.LINE_1] = Line1;
  // reusables[INSTANCE_NAMES.LINE_2] = Line2;

  // reusables[INSTANCE_NAMES.FIRE] = Fire;

  for (let r in reusables) {
    console.log("r", r);
    if ([INSTANCE_NAMES.CAMERA].includes(r)) {
      // Global animatable
      reusables[r] = get(window.experience, "camera");
    } else if (
      [
        INSTANCE_NAMES.INTRO,
        INSTANCE_NAMES.SCENE_ONE,
        INSTANCE_NAMES.SCENE_TWO,
        INSTANCE_NAMES.SCENE_THREE,
        INSTANCE_NAMES.SCENE_FOUR,
        INSTANCE_NAMES.SCENE_FIVE,
        INSTANCE_NAMES.OUTRO,
      ].includes(r)
    ) {
      reusables[r] = new reusables[r].theClass(reusables[r].initialProperties);
    } else {
      reusables[r] = new reusables[r].theClass(reusables[r].initialProperties);
      reusables[r].moveOffStage();
    }
  }
}
