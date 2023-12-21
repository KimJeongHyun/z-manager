type BaseZIndexKey =
  | "BACKGROUND"
  | "CONTENT"
  | "COMPONENT"
  | "OVERLAY"
  | "MODAL";

type BaseZIndex = {
  [x in BaseZIndexKey]: number;
};

const BASE_Z_INDEX: BaseZIndex = Object.freeze({
  BACKGROUND: 0,
  CONTENT: 1000,
  COMPONENT: 2000,
  OVERLAY: 3000,
  MODAL: 4000,
});

class ZIndexBuilder {
  zIndexStore: { [x in string]: number } = {};

  add(base: BaseZIndexKey, depths: string[]) {
    depths.forEach((depth, index) => {
      this.zIndexStore[depth] = BASE_Z_INDEX[base] + index;
    });

    return this;
  }

  build() {
    return this;
  }

  getAll() {
    return this.zIndexStore;
  }
}

const StoreBuilder = new ZIndexBuilder();

const ZIndexStore = StoreBuilder.add("BACKGROUND", ["BASE_LV_1", "BASE_LV_2"])
  .add("COMPONENT", ["COMPONENT_LV_1", "COMPONENT_LV_2"])
  .add("CONTENT", ["CONTENT_LV_1", "CONTENT_LV_2"])
  .add("MODAL", ["MODAL_LV_1", "MODAL_LV_2", "MODAL_LV_3"])
  .add("OVERLAY", ["OVERLAY_LV_1"])
  .build()
  .getAll();

export default ZIndexStore;
