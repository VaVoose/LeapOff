import Phaser from 'phaser';
import logoImg from './assets/logo.png';
import starImg from './assets/star.png';
import obstacleImg from './assets/obstacle.png';
import protagImg from './assets/protagonist.png';

var pLine, protagonist, sun;

class MyGame extends Phaser.Scene
{
    constructor ()
    {
        super();
    }

    preload ()
    {
        this.load.image('logo', logoImg);
        this.load.image('star', starImg);
        this.load.image('obstacle', obstacleImg);
        this.load.image('protagonist', protagImg);
    }
      
    create ()
    {
        //const logo = this.add.image(400, 150, 'logo');
      
        this.matter.enableAttractorPlugin();

        this.matter.world.setBounds();

        // this.matter.add.imageStack('logo', null, 0, 500, 50, 2, 0, 0, {
        //     mass: 1,
        //     ignorePointer: true
        // });

        this.matter.add.imageStack('obstacle', null, 0, 500, 5, 5, 0, 0, {
            mass: 0,
            shape: {
                type: 'circle',
                radius: '15'
            }
        });

        protagonist = this.matter.add.image(400, 200, 'protagonist', null, {
            mass: 0,
            shape: {
                type: 'circle',
                radius: 15
            }
        })

        

        sun = this.matter.add.image(400, 400, 'star', null, {
            isStatic: true,
            shape: {
                type: 'circle',
                radius: 60,
            },
            plugin: {
                attractors: [
                    function (bodyA, bodyB) {
                        return {
                            x: (bodyA.position.x - bodyB.position.x) * 0.000001,
                            y: (bodyA.position.y - bodyB.position.y) * 0.000001
                        };
                    }
                ]
            }
        });

        this.matter.add.mouseSpring();

        pLine = this.add.line(protagonist.x, protagonist.y, sun.x, sun.y, 140, 0, 0x6666ff);

        // this.tweens.add({
        //     targets: logo,
        //     y: 450,
        //     duration: 2000,
        //     ease: "Power2",
        //     yoyo: true,
        //     loop: -1
        // });
    }

    update(){
        pLine.setTo(protagonist.x, protagonist.y, sun.x, sun.y);

    }
}

const config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 800,
    height: 800,
    scene: MyGame,
    backgroundColor: '#000000',
    physics: {
        default: 'matter',
        matter: {
            gravity: {
                scale: 0
            },
            plugins: {
                attractors: true
            }
        }
    }
};

const game = new Phaser.Game(config);
