import { set, get } from "lodash";

import { EFFECTS, GLOBAL_UPDATABLES } from "./Enums";

export function executeInitializeEffects(object, effects, timeObject) {
  if (get(object, "instanceName") === "CAMERA") {
    // debugger;
  }

  const elapsed = timeObject.elapsed;

  for (let effect of effects) {
    if (effect.startAt < elapsed && elapsed < effect.endAt) {
      for (let property of effect.properties) {
        const value = get(object, property.path);
        if (typeof value === "number") {
          let initialValue = property.from;
          // let updatedValue =
          //   value +
          //   (property.to - property.from) *
          //     ((timeObject.current - timelineMetadata.effect.startAt) / // calculate the delta
          //       // delta /
          //       (timelineMetadata.effect.endAt -
          //         timelineMetadata.effect.startAt));
          set(object, property.path, initialValue);
          object.needsUpdate = true;
        } else if (
          (typeof value === "object" && value.isVector3) || // covers animating position and scal
          (typeof value === "object" &&
            value.hasOwnProperty("_x") &&
            value.hasOwnProperty("_y") &&
            value.hasOwnProperty("_z")) // covers animating rotation
        ) {
          let initialValue = {};

          for (let dimension of ["x", "y", "z"]) {
            initialValue[dimension] = property.from[dimension];
          }

          value.set(initialValue.x, initialValue.y, initialValue.z);

          // debugger

          object.needsUpdate = true;
        }
      }
    }
  }
}
