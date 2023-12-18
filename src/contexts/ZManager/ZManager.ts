import { v4 } from "uuid";

export interface ZIndexBaseType {
  BASE: number;
  NAV: number;
  AUTH: number;
  MAINTAIN: number;
  SYSTEM: number;
}

const ZIndexConsts: ZIndexBaseType = Object.freeze({
  BASE: 0,
  NAV: 1,
  AUTH: 5000,
  MAINTAIN: 9000,
  SYSTEM: 9999,
});

export class ZManager {
  private layers: { id: string; zIndex: number }[] = [];

  constructor() {
    this.layers = [];
  }

  private checkIndexValidate(index: number) {
    if (this.layers.length === 0) return true;

    return (
      Math.max(...this.layers.map((layer) => layer.zIndex)) > index &&
      index > ZIndexConsts.AUTH
    );
  }

  zIndex(layerId?: string) {
    return this.layers.find((layer) => layer.id === layerId)?.zIndex ?? 0;
  }

  onMount({ isIncrement = true }: { isIncrement?: boolean }) {
    const layerId = v4();

    this.layers.push({
      id: layerId,
      zIndex:
        this.layers.length > 0
          ? Math.max(...this.layers.map((layer) => layer.zIndex)) +
            Number(isIncrement)
          : 0,
    });

    return layerId;
  }

  onUnMount(layerId: string) {
    this.layers = this.layers.filter((layer) => layer.id !== layerId);
  }

  onBasePush(base: keyof ZIndexBaseType, index: number) {
    const layerId = v4();

    const nextZIndex = ZIndexConsts[`${base}`] + index;

    if (this.checkIndexValidate(nextZIndex)) {
      this.layers.push({
        id: layerId,
        zIndex: ZIndexConsts[`${base}`] + index,
      });
      return layerId;
    }

    console.warn(
      "onBasePush : index validation failed. 2 Argument 'index' might be lower than max index or over than top z-index.\n\nZ-index will be returned by onMount({isIncrement:true})."
    );

    return this.onMount({ isIncrement: true });
  }
}
