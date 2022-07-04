class Andar {
  constructor(base, door, window, roof) {
    this.base = base;
    this.door = door;
    this.window = window;
    this.roof = roof;
  }
  drawBg(pg) {
    pg.background(255);
    pg.image(imgBg, 0, 0, windowWidth, windowHeight);
  }

  drawOverlay(pg) {
    pg.fill(245, 245, 245, 3);
    pg.rect(0, 0, windowWidth, windowHeight);
  }

  drawBase(pg) {
    pg.image(
      this.base.shape.imagem,
      this.base.posX,
      this.base.posY,
      this.base.width,
      this.base.height
    );
  }
  drawJanelas(pg) {
    for (let i = 0; i < 6; i++) {
      pg.image(
        this.window.shape.imagem,
        this.base.posX + this.window.pos[i].posX,
        this.window.pos[i].posY,
        this.window.width,
        this.window.height
      );
    }
  }

  drawPortas(pg) {
    pg.image(
      this.door.shape.imagem,
      this.base.posX + this.door.posX,
      this.door.posY,
      this.door.width,
      this.door.height
    );
  }

  drawTelhados(pg) {
    pg.image(
      this.roof.shape.imagem,
      this.base.posX,
      this.base.posY + 5,
      this.roof.width,
      this.roof.height
    );
  }
}
