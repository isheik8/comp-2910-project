"use strict";

function Affiliate() {

    this.scene = new PIXI.Container();

    //Background
    this.bg = new PIXI.Graphics();
    this.bg.beginFill(0x66d2fb);
    this.bg.drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    this.bg.endFill();

    //Food Fall
    this.foodFallLogo = new PIXI.Sprite(PIXI.loader.resources["images/foodfalllogo.jpg"].texture);
    this.foodFallLogo.position.set();
    this.foodFallLogo.interactive = this.foodFallLogo.buttonMode = true;


    this.foodFallLogo.pointertap = () => {

        window.location.href = "http://foodfall.ca/";

    };


    //Race to Zero
    this.raceToZeroLogo = new PIXI.Sprite(PIXI.loader.resources["images/racetozerologo.png"].texture);
    this.raceToZeroLogo.position.set(200, 0);
    this.raceToZeroLogo.interactive = this.raceToZeroLogo.buttonMode = true;

    this.raceToZeroLogo.pointertap = () => {

        window.location.href = "";

    };

    //Captain Plan-it
    this.captainPlanLogo = new PIXI.Sprite(PIXI.loader.resources["images/cp2.png"].texture);
    this.captainPlanLogo.position.set(450, 0);
    this.captainPlanLogo.interactive = this.captainPlanLogo.buttonMode = true;

    this.captainPlanLogo.pointertap = () => {

        window.location.href = "";

    };



    //Add to scene
    this.scene.addChild(this.bg);
    this.scene.addChild(this.foodFallLogo);
    this.scene.addChild(this.raceToZeroLogo);
    this.scene.addChild(this.captainPlanLogo);


    this.update = () => {};
}


Affiliate.open = () => {

    if(Affiliate.instance == null) {
        Affiliate.instance = new Affiliate();
    }

    SCENE = Affiliate.instance.scene;
    STATE = Affiliate.instance.update;
}