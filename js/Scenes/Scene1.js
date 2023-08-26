var languages = ["de", "en", "ph"];
var audioFiles = ["bgm", "cherry", "correct", "gem", "hurt", "jump", "question", "wrong"];
var envImageFiles = ["background", "bush", "middleground", "palm", "pine", "rock", "shrooms", "tree", "tree2"]
var platformImageFiles = ["grass1", "grass2", "grass3"]

class Scene1 extends Phaser.Scene {
    constructor() {
        super("bootGame");
    }

    preload() {
        // Localization
        for (var i = 0; i < languages.length; i++) {
            this.load.json("questions_" + languages[i], "loc/" + languages[i] + "/questions.json");
            this.loadImage("flags", languages[i]);
        }

        // Font
        this.load.bitmapFont("pixelFont", "assets/font/font.png", "assets/font/font.xml");

        // Audio
        for (var i = 0; i < audioFiles.length; i++) {
            this.loadAudio(audioFiles[i]);
        }

        // Environment
        for (var i = 0; i < envImageFiles.length; i++) {
            this.loadImage("environment", envImageFiles[i]);
        }
        // Platforms
        for (var i = 0; i < platformImageFiles.length; i++) {
            this.loadImage("platforms", platformImageFiles[i]);
        }

        // Player
        this.loadSpritesheets("player", ["idle", "run", "jump", "hurt"], 33, 32);

        // Enemies
        this.loadSpritesheets("enemy", ["eagle"], 40, 41);
        this.loadSpritesheets("enemy", ["frog-idle", "frog-jump"], 35, 32);
        this.loadSpritesheet("enemy", "possum", 36, 28);

        // Items
        this.loadSpritesheet("item", "cherry", 21, 21);
        this.loadSpritesheet("item", "gem", 15, 13);
    }

    create() {
        this.add.text(20, 20, "Loading game...");
        this.scene.start("titleScreen");
        // this.scene.start("playGame");

        // Animations
        this.createAnimations("item", ["cherry", "gem"], gameSettings.fps, -1);
        this.createAnimations("player", ["idle", "run"], gameSettings.fps, -1);
        this.createAnimations("player", ["jump"], gameSettings.fps / 4, 0);
        this.createAnimations("player", ["hurt"], gameSettings.fps * 2, 0);
        this.createAnimations("enemy", ["eagle", "frog-idle", "frog-jump", "possum"], gameSettings.fps / 2, -1);
    }

    loadAudio(name) {
        this.load.audio("audio_" + name, ["assets/sounds/" + name + ".ogg", "assets/sounds/" + name + ".mp3"]);
    }

    loadImage(subDir, name) {
        this.load.image(name, "assets/images/" + subDir + "/" + name + ".png");
    }

    loadSpritesheets(prefix, names, width, height) {
        for (var i = 0; i < names.length; i++) {
            this.loadSpritesheet(prefix, names[i], width, height);
        }
    }

    loadSpritesheet(prefix, name, width, height) {
        this.load.spritesheet(prefix + "-" + name, "assets/spritesheets/" + prefix + "/" + prefix + "-" + name + ".png",{
            frameWidth: width,
            frameHeight: height
        });
    }

    createAnimations(prefix, names, frameRate, repeat, shouldHideOnComplete) {
        for (var i = 0; i < names.length; i++) {
            this.createAnimation(prefix, names[i], frameRate, repeat);
        }
    }

    createAnimation(prefix, name, fps, repeat, shouldHideOnComplete = false) {
        this.anims.create({
            key: prefix + "-" + name + "_anim",
            frames: this.anims.generateFrameNumbers(prefix + "-" + name),
            frameRate: fps,
            repeat: repeat,
            hideOnComplete: shouldHideOnComplete
        });
    }
}