import { createRafDriver, getProject } from "@theatre/core";
import state from "./intro.theatre.json";
const project = getProject("Perllynn Perspective", { state });
let instance = 0;
const defaults = { slide: 0 };
/** Scroll scrubs the authored Theatre.js sequence in either direction. */
export function createIntro(apply: (values: typeof defaults) => void) {
  const sheet = project.sheet("Introduction", String(instance++));
  const driver = createRafDriver({ name: "Perllynn scroll" });
  const object = sheet.object("Perspective", defaults);
  const unsubscribe = object.onValuesChange(apply, driver);
  return {
    seek(position: number) {
      sheet.sequence.position = position;
      driver.tick(performance.now());
    },
    dispose() {
      unsubscribe();
      sheet.sequence.pause();
      sheet.detachObject("Perspective");
    },
  };
}
