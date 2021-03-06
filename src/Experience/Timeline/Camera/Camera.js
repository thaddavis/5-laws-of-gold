import { v4 as uuidv4 } from "uuid";

import { EFFECTS, GLOBAL_UPDATABLES } from "Experience/Utils/Enums";
import { INSTANCE_NAMES } from "../../Utils/Enums";

export function timeline_camera(timeline) {
  // --- --- --- --- --- --- --- --- GLOBE INTRO

  timeline[uuidv4()] = {
    isGlobal: true,
    instanceName: INSTANCE_NAMES.CAMERA,
    effects: [
      {
        // id: "test",
        name: EFFECTS.GLOBAL_FROM_TO,
        properties: [
          {
            path: "instance.position",
            from: {
              x: 0,
              y: 0,
              z: 20,
            },
            to: {
              x: 0,
              y: 0,
              z: 20,
            },
          },
        ],
        startAt: 0,
        endAt: 16.9,
      },
    ],
    started: false,
    // startAt: 0,
    // endAt: 1.25,
    startAt: 0,
    endAt: 16.9,
  };

  // --- --- --- --- --- --- --- --- Section A - 1st Stanza

  timeline[uuidv4()] = {
    isGlobal: true,
    instanceName: INSTANCE_NAMES.CAMERA,
    effects: [
      {
        name: EFFECTS.GLOBAL_FROM_TO,
        properties: [
          {
            path: "instance.position",
            from: {
              //   x: -3,
              x: -4,
              y: 0,
              z: 20,
            },
            to: {
              x: 4,
              y: 0,
              z: 20,
            },
          },
        ],
        // startAt: 0,
        // endAt: 1250
        // startAt: 0,
        // endAt: 1.25,
        startAt: 16.9,
        endAt: 25.9,
      },
    ],
    started: false,
    // startAt: 0,
    // endAt: 1.25,
    startAt: 16.9,
    endAt: 25.9,
  };

  // --- --- --- --- --- --- --- --- Section A - 1st Stanza

  timeline[uuidv4()] = {
    isGlobal: true,
    instanceName: INSTANCE_NAMES.CAMERA,
    effects: [
      {
        id: "test",
        name: EFFECTS.GLOBAL_FROM_TO,
        properties: [
          {
            path: "instance.position",
            from: {
              //   x: -3,
              x: 0,
              y: 10,
              z: 20,
            },
            to: {
              //   x: 3,
              x: 0,
              y: -10,
              z: 20,
            },
          },
        ],
        // startAt: 0,
        // endAt: 1250
        // startAt: 0,
        // endAt: 1.25,
        startAt: 25.9,
        endAt: 30.5,
      },
    ],
    started: false,
    // startAt: 0,
    // endAt: 1.25,
    startAt: 25.9,
    endAt: 30.5,
  };

  // --- --- --- --- --- --- --- ---

  timeline[uuidv4()] = {
    isGlobal: true,
    instanceName: INSTANCE_NAMES.CAMERA,
    effects: [
      {
        name: EFFECTS.GLOBAL_FROM_TO,
        properties: [
          {
            path: "instance.position",
            from: {
              x: -3,
              y: 0,
              z: 18,
            },
            to: {
              x: 3,
              y: 0,
              z: 18,
            },
          },
        ],
        // startAt: 0,
        // endAt: 1250
        // startAt: 0,
        // endAt: 1.25,
        startAt: 30.5,
        endAt: 44.7,
      },
    ],
    started: false,
    // startAt: 0,
    // endAt: 1.25,
    startAt: 30.5,
    endAt: 44.7,
  };

  // --- --- --- --- --- --- --- ---

  timeline[uuidv4()] = {
    isGlobal: true,
    instanceName: INSTANCE_NAMES.CAMERA,
    effects: [
      {
        name: EFFECTS.GLOBAL_FROM_TO,
        properties: [
          {
            path: "instance.position",
            from: {
              x: 0,
              y: 0,
              z: 2,
            },
            to: {
              x: 0,
              y: 0,
              z: 2,
            },
          },
        ],
        // startAt: 0,
        // endAt: 1250
        // startAt: 0,
        // endAt: 1.25,
        startAt: 44.7,
        endAt: 45.7,
      },
    ],
    started: false,
    // startAt: 0,
    // endAt: 1.25,
    startAt: 44.7,
    endAt: 45.7,
  };

  // --- --- --- --- --- --- --- ---

  timeline[uuidv4()] = {
    isGlobal: true,
    instanceName: INSTANCE_NAMES.CAMERA,
    effects: [
      {
        name: EFFECTS.GLOBAL_FROM_TO,
        properties: [
          {
            path: "instance.position",
            from: {
              x: 0,
              y: 0,
              z: 18,
            },
            to: {
              x: 0,
              y: 0,
              z: 18,
            },
          },
        ],
        startAt: 45.7,
        endAt: 57.7,
      },
    ],
    started: false,
    // startAt: 0,
    // endAt: 1.25,
    startAt: 45.7,
    endAt: 57.7,
  };

  // --- --- --- --- --- --- --- ---

  timeline[uuidv4()] = {
    isGlobal: true,
    instanceName: INSTANCE_NAMES.CAMERA,
    effects: [
      {
        name: EFFECTS.GLOBAL_FROM_TO,
        properties: [
          {
            path: "instance.position",
            from: {
              x: 0,
              y: 0,
              z: 2,
            },
            to: {
              x: 0,
              y: 0,
              z: 2,
            },
          },
        ],
        startAt: 57.7,
        endAt: 59.3,
      },
    ],
    started: false,
    // startAt: 0,
    // endAt: 1.25,
    startAt: 57.7,
    endAt: 59.3,
  };

  // --- --- --- --- --- --- --- --- BRIDGE

  timeline[uuidv4()] = {
    isGlobal: true,
    instanceName: INSTANCE_NAMES.CAMERA,
    effects: [
      {
        name: EFFECTS.GLOBAL_FROM_TO,
        properties: [
          {
            path: "instance.position",
            from: {
              x: 0,
              y: 0,
              z: 20,
            },
            to: {
              x: 0,
              y: 0,
              z: 20,
            },
          },
        ],
        startAt: 59.4,
        endAt: 72.8,
      },
    ],
    started: false,
    startAt: 59.4,
    endAt: 72.8,
  };

  // --- --- --- --- --- --- --- ---

  timeline[uuidv4()] = {
    isGlobal: true,
    instanceName: INSTANCE_NAMES.CAMERA,
    effects: [
      {
        name: EFFECTS.GLOBAL_FROM_TO,
        properties: [
          {
            path: "instance.position",
            from: {
              x: 0,
              y: 0,
              z: 20,
            },
            to: {
              x: 0,
              y: 0,
              z: 20,
            },
          },
        ],
        startAt: 72.8,
        endAt: 179,
      },
    ],
    started: false,
    startAt: 72.8,
    endAt: 179,
  };

  // timeline[uuidv4()] = {
  //   isGlobal: true,
  //   instanceName: INSTANCE_NAMES.CAMERA,
  //   effects: [
  //     {
  //       name: EFFECTS.GLOBAL_FROM_TO,
  //       properties: [
  //         {
  //           path: "instance.position",
  //           from: {
  //             x: 0,
  //             y: 0,
  //             z: 20,
  //           },
  //           to: {
  //             x: 0,
  //             y: 0,
  //             z: 20,
  //           },
  //         },
  //       ],
  //       startAt: 114.0,
  //       endAt: 179,
  //     },
  //   ],
  //   started: false,
  //   startAt: 114.0,
  //   endAt: 179,
  // };
}
