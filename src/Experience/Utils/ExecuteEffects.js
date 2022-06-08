import { set, get } from "lodash";
import { Vector3 } from "three";
import { Interpolation } from "Experience/Utils/Interpolation";

export function executeEffects(object, effects, delta, elapsed) {
  // console.log("executeEffects");
  // console.log("object", object);
  // console.log("effects", effects);

  for (let effect of effects) {
    // console.log("effect", effect);

    if (effect.startAt < elapsed && elapsed < effect.endAt) {
      // ONLY EXECUTE CURRENT EFFECTS
      for (let property of effect.properties) {
        const value = get(object, property.path);

        // console.log("value", value);
        // console.log("typeof value", typeof value);

        // debugger;

        if (typeof value === "number") {
          // covers animating scalars
          let updatedValue =
            value +
            (property.to - property.from) *
              // (timeObject.current - timelineMetadata.effect.startAt) / ( // calculate the delta
              (delta / (effect.endAt - effect.startAt));
          set(object, property.path, updatedValue);
          object.needsUpdate = true;
        } else if (
          (typeof value === "object" && value.isVector3) || // covers animating position and scal
          (typeof value === "object" &&
            value.hasOwnProperty("_x") &&
            value.hasOwnProperty("_y") &&
            value.hasOwnProperty("_z")) // covers animating rotation
        ) {
          // debugger;
          // handle property `rotation`

          // if (object.instanceName === INSTANCE_NAMES.CROSS) {
          //   debugger;
          // }

          let updatedValue = {};
          for (let dimension of ["x", "y", "z"]) {
            // if (effect.id === "test" && dimension === "x") {
            //   console.log("elapsed", elapsed);

            //   console.log("value[dimension]", value[dimension]);
            //   console.log("property.to[dimension]", property.to[dimension]);
            //   console.log("property.from[dimension]", property.from[dimension]);
            //   console.log(
            //     "property.to[dimension] < property.from[dimension]",
            //     property.to[dimension] < property.from[dimension]
            //   );
            //   console.log("delta", delta);
            //   console.log(
            //     "(effect.endAt - effect.startAt)",
            //     effect.endAt - effect.startAt
            //   );
            // }
            // debugger;
            switch (property.interpolationMode) {
              case Interpolation.MODES.EASE_IN:
                updatedValue[dimension] = Interpolation.EaseIn(
                  property.from[dimension],
                  property.to[dimension],
                  (elapsed - effect.startAt) / (effect.endAt - effect.startAt)
                );
                break;
              case Interpolation.MODES.EASE_OUT:
                // debugger;
                updatedValue[dimension] = Interpolation.EaseOut(
                  property.from[dimension],
                  property.to[dimension],
                  (elapsed - effect.startAt) / (effect.endAt - effect.startAt)
                );
                break;
              case Interpolation.MODES.SPIKE:
                // debugger;
                updatedValue[dimension] = Interpolation.Spike(
                  property.from[dimension],
                  property.to[dimension],
                  (elapsed - effect.startAt) / (effect.endAt - effect.startAt)
                );
                break;
              default: // Interpolation.MODES.LINEAR
                updatedValue[dimension] = Interpolation.Lerp(
                  property.from[dimension],
                  property.to[dimension],
                  (elapsed - effect.startAt) / (effect.endAt - effect.startAt)
                );
            }

            // updatedValue[dimension] =
            //   value[dimension] +
            //   (property.to[dimension] - property.from[dimension]) *
            //     (delta / (effect.endAt - effect.startAt));
          }

          value.set(updatedValue.x, updatedValue.y, updatedValue.z);

          // if (get(object, "instanceName") === "CAMERA") {
          //   console.log(updatedValue);
          // }
          // if (effect.id === "test") {
          //   debugger;
          //   console.log("updatedValue", updatedValue);
          // }

          // if (get(object, "instanceName") === "SECTION_B_PHRASE_2") {
          //   console.log("updatedValue", updatedValue);
          // }

          // if (object.instanceName === INSTANCE_NAMES.GLOBE) {
          //   debugger;
          // }

          // debugger;
          object.needsUpdate = true;
        } else if (
          typeof value === "object" &&
          // "PerspectiveCamera" === value.type
          get(value, "constructor.name") === "OrbitControls"
        ) {
          // debugger;

          let updatedValue = {};
          for (let dimension of ["x", "y", "z"]) {
            switch (property.interpolationMode) {
              default: // Interpolation.MODES.LINEAR
                updatedValue[dimension] = Interpolation.Lerp(
                  property.from[dimension],
                  property.to[dimension],
                  (elapsed - effect.startAt) / (effect.endAt - effect.startAt)
                );
            }
          }

          // console.log("lookAt", updatedValue.x, updatedValue.y, updatedValue.z);

          value.target = new Vector3(
            updatedValue.x,
            updatedValue.y,
            updatedValue.z
          );
        }
      }
    }
  }
}
