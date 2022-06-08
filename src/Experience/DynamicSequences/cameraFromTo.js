import { v4 as uuidv4 } from "uuid";
import { EFFECTS } from "Experience/Utils/Enums";
import { INSTANCE_NAMES } from "Experience/Utils/Enums";
import { Interpolation } from "Experience/Utils/Interpolation";

// 01:33:14 ->
// 01:34:23 ->
// 01:35:25 ->

// 00:03:00 ->    14/30 = .46    0
// 00:04:09 ->    23/30 = .76    .3
// 00:05:11 ->    25/30 = .83    .36

export function cameraFromTo(timeline, clock, from, to, duration) {
  console.log("___ _UKRAINE_ ___");

  console.log(timeline, clock, from, to, duration);

  timeline[uuidv4()] = {
    isGlobal: true,
    instanceName: INSTANCE_NAMES.CAMERA,
    effects: [
      {
        name: EFFECTS.GLOBAL_FROM_TO,
        properties: [
          {
            path: "instance.position",
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

  timeline[uuidv4()] = {
    isGlobal: true,
    instanceName: INSTANCE_NAMES.CAMERA,
    effects: [
      {
        // id: "test",
        name: EFFECTS.GLOBAL_FROM_TO,
        properties: [
          {
            path: "controls",
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
    // startAt: 0,
    // endAt: 1.25,
    startAt: clock.current,
    endAt: clock.current + duration,
  };
}
