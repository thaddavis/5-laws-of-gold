import DirectionalLight1 from "Experience/World/WorldObjectClasses/DirectionalLight1";
import { Vector3 } from "three";
import { INSTANCE_NAMES } from "../../Utils/Enums";

export default {
  isGlobal: true,
  theClass: DirectionalLight1,
  initialProperties: {
    instanceName: INSTANCE_NAMES.DIRECTIONAL_LIGHT_1,
    position: new Vector3(0, 0, 2),
    target: new Vector3(0, 0, -2),
  },
};
