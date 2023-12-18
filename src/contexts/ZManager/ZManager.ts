import { v4 } from "uuid";

interface ZIndexConstsType {
  BASE: number;
  NAV: number;
  AUTH: number;
  MAINTAIN: number;
  SYSTEM: number;
}

const ZIndexConsts: ZIndexConstsType = Object.freeze({
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
      Math.max(...this.layers.map((layer) => layer.zIndex)) < index &&
      index < ZIndexConsts.AUTH
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

  onPush(base: keyof ZIndexConstsType, index: number) {
    if (!Array.isArray(index)) {
      const layerId = v4();

      const nextZIndex = ZIndexConsts[`${base}`] + index;

      if (this.checkIndexValidate(nextZIndex)) {
        this.layers.push({
          id: layerId,
          zIndex: ZIndexConsts[`${base}`] + index,
        });
      }

      return layerId;
    }
  }
}
