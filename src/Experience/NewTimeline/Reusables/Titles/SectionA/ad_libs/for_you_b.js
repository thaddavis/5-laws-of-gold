import Text from "Experience/World/Reusables/Text";
import { Vector3 } from "three";
import { INSTANCE_NAMES } from "Experience/Utils/Enums";

export default {
  theClass: Text,
  initialProperties: {
    instanceName: INSTANCE_NAMES.SECTION_A_AD_LIBS_FOR_YOU_B,
    text: "For you",
    position: new Vector3(1, 1, 1),
    scale: new Vector3(1, 1, 1),
  },
};
