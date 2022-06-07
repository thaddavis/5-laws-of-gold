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

export function timeline_the_5_laws_of_gold(timeline) {
  timeline[uuidv4()] = {
    instanceName: INSTANCE_NAMES.THE_FIVE_LAWS_OF_GOLD,
    effects: [
      {
        name: EFFECTS.FROM_TO,
        properties: [
          {
            path: "mesh.position",
            interpolationMode: Interpolation.MODES.EASE_OUT,
            from: {
              x: 0,
              y: 0,
              z: 0,
            },
            to: {
              x: 0,
              y: 0,
              z: 0,
            },
          },
          {
            path: "mesh.scale",
            interpolationMode: Interpolation.MODES.EASE_OUT,
            from: {
              x: 1.4,
              y: 1.4,
              z: 1.4,
            },
            to: {
              x: 1.4,
              y: 1.4,
              z: 1.4,
            },
          },
        ],
        startAt: 0,
        endAt: 70,
      },
    ],
    started: false,
    startAt: 0.0,
    endAt: 70,
  };

  // timeline[uuidv4()] = {
  //   instanceName: INSTANCE_NAMES.DIRECTIONAL_LIGHT_1,
  //   effects: [
  //     {
  //       name: EFFECTS.FROM_TO,
  //       properties: [
  //         {
  //           path: "light.position",
  //           from: {
  //             x: 0,
  //             y: 0,
  //             z: 8,
  //           },
  //           to: {
  //             x: 0,
  //             y: 0,
  //             z: 8,
  //           },
  //         },
  //       ],
  //       startAt: 0,
  //       endAt: 70,
  //     },
  //   ],
  //   started: false,
  //   startAt: 0,
  //   endAt: 70,
  // };
}
