import { v4 as uuidv4 } from "uuid";
import { EFFECTS } from "Experience/Utils/Enums";
import { INSTANCE_NAMES } from "Experience/Utils/Enums";
import { Interpolation } from "Experience/Utils/Interpolation";

export function lightLoop(timeline, clock, from, to, duration) {
  console.log("___ _LIGHT LOOP_ ___");

  console.log(timeline, clock, from, to, duration);

  timeline[uuidv4()] = {
    isGlobal: true,
    isLoop: true,
    instanceName: INSTANCE_NAMES.DIRECTIONAL_LIGHT_1,
    effects: [
      {
        name: EFFECTS.GLOBAL_FROM_TO,
        properties: [
          {
            path: "light.position",
            interpolationMode: Interpolation.MODES.EASE_IN,
            from: {
              x: from.x,
              y: from.y,
              z: from.z,
            },
            to: {
              x: to.x,
              y: to.y,
              z: to.z,
            },
          },
        ],
        startAt: clock.current,
        endAt: clock.current + duration,
      },
    ],
    started: false,
    startAt: clock.current,
    endAt: clock.current + duration,
  };
}
