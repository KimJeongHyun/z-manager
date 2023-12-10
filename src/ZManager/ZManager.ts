import { v4 } from "uuid";

export class ZManager {
  private layers: { id: string; zIndex: number }[] = [];

  constructor() {
    this.layers = [];
  }

  zIndex() {
    return this.layers.length;
  }

  onMount() {
    const layerId = v4();

    this.layers.push({
      id: layerId,
      zIndex:
        this.layers.length > 0
          ? Math.max(...this.layers.map((layer) => layer.zIndex)) + 1
          : 0,
    });

    return layerId;
  }

  onUnMount(layerId: string) {
    this.layers = this.layers.filter((layer) => layer.id !== layerId);
  }
}
