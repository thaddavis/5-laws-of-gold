import MetalText from "Experience/World/WorldObjectClasses/MetalText";
import { Vector3 } from "three";
import { INSTANCE_NAMES } from "../../../Utils/Enums";

export default {
  theClass: MetalText,
  initialProperties: {
    instanceName: INSTANCE_NAMES.THE_FIVE_LAWS_OF_GOLD,
    text: "The 5 Laws Of Gold",
    position: new Vector3(1, 1, 1),
    scale: new Vector3(1, 1, 1),
  },
};
