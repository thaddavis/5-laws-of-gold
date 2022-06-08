import { v4 as uuidv4 } from "uuid";
import { EFFECTS } from "Experience/Utils/Enums";
import { INSTANCE_NAMES } from "Experience/Utils/Enums";
import { Interpolation } from "Experience/Utils/Interpolation";

export function fadeBackground(
  timeline,
  clock,
  from,
  to,
  duration,
  instanceName
) {
  console.log("___ _FADE BACKGROUND_ ___");

  console.log(timeline, clock, from, to, duration);

  timeline[uuidv4()] = {
    isGlobal: true,
    isScene: true,
    instanceName: instanceName,
    effects: [
      {
        name: EFFECTS.GLOBAL_FROM_TO,
        properties: [
          {
            path: "background.material.opacity",
            interpolationMode: Interpolation.MODES.EASE_IN,
            from: from,
            to: 0,
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

  timeline[uuidv4()] = {
    isGlobal: true,
    instanceName: INSTANCE_NAMES.CAMERA,
    effects: [
      {
        // id: "test",
        name: EFFECTS.GLOBAL_FROM_TO,
        properties: [
          {
            path: "background.material.opacity",
            interpolationMode: Interpolation.MODES.EASE_IN,
            from: {
              x: from.x,
              y: from.y,
              z: from.z - 5,
            },
            to: {
              x: to.x,
              y: to.y,
              z: to.z - 5,
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
