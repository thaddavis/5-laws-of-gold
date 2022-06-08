import MetalText from "Experience/World/WorldObjectClasses/MetalText";
import { Vector3 } from "three";
import { INSTANCE_NAMES } from "../../../../Utils/Enums";
import Intro from "../../../WorldObjectClasses/Scenes/Intro";

export default {
  theClass: Intro,
  initialProperties: {
    instanceName: INSTANCE_NAMES.INTRO,
  },
};
