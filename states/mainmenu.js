"use strict";

function MainMenu() {
    this.scene = new PIXI.Container();

    // Make Background
    this.background = new PIXI.Container();
    this.bgTriangle1 = new PIXI.Graphics();
    this.bgTriangle1.beginFill(0x00ff6b);
    this.bgTriangle1.drawPolygon([0,RENDERER.height, 0,0, RENDERER.width,0]);
    this.bgTriangle1.endFill();

    this.bgTriangle2 = new PIXI.Graphics();
    this.bgTriangle2.beginFill(0x00ccff);
    this.bgTriangle2.drawPolygon([
        0,RENDERER.height,
        RENDERER.width,RENDERER.height,
        RENDERER.width,0]);
    this.bgTriangle2.endFill();

    this.bgLine = new PIXI.Graphics();
    this.bgLine.lineStyle(8, 0x222222, 1);
    this.bgLine.moveTo(0, RENDERER.height);
    this.bgLine.lineTo(RENDERER.width, 0);

    this.background.addChild(this.bgTriangle1);
    this.background.addChild(this.bgTriangle2);
    this.background.addChild(this.bgLine);

    // Make Buttons
    this.distFromEdge = 200;
    this.buttonWidth = RENDERER.width / 2 - this.distFromEdge - 20; // 20 between buttons
    this.buttonHeight = RENDERER.height / 2;
    this.playButton = makeSimpleButton(this.buttonWidth, this.buttonHeight,
        "play", 0xb3ecec, this.buttonHeight / 2, 4);
    this.optionsButton = makeSimpleButton(this.buttonWidth, this.buttonHeight,
        "options", 0x94b8b8, this.buttonHeight / 2, 4);

    this.playButton.position.set(this.distFromEdge,
        RENDERER.height / 2 - this.playButton.height / 2);
    this.optionsButton.position.set(RENDERER.width - this.optionsButton.width - this.distFromEdge,
        RENDERER.height / 2 - this.optionsButton.height / 2);

    // Play button moves to stage select
    this.playButton.on("pointertap", function () {
        OptionsMenu.close();
        StageSelect.open();
    });

    // Options button opens an options panel
    this.optionsButton.on("pointertap", OptionsMenu.open);

    // Add to scene
    this.scene.addChild(this.background);
    this.scene.addChild(this.playButton);
    this.scene.addChild(this.optionsButton);

    // Update function to be called by the main game loop
    this.update = function() {}.bind(this);
}

MainMenu.open = function() {
    if(MainMenu.instance == null) {
        MainMenu.instance = new MainMenu();
    }

    SCENE = MainMenu.instance.scene;
    STATE = MainMenu.instance.update;
}
