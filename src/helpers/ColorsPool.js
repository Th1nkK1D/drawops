class ColorPool {
  constructor() {
    this.availableColor = ['#f44336', '#9C27B0', '#2196F3', '#4CAF50', '#FF9800'];
    this.assignedColor = {};
  }

  assign(id) {
    const randomColorIndex = Math.floor(Math.random() * this.availableColor.length);

    [ this.assignedColor[id] ] = this.availableColor.splice(randomColorIndex, 1);

    return this.getColor(id);
  }

  getColor(id) {
    return this.assignedColor[id];
  }
}

export default ColorPool;
