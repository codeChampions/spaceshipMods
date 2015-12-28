(function() {
  'use strict';

  angular
  .module('space')
  .factory('SpaceService', function($http, $location){


          var player;
          var aliens;
          var bullets;
          var bulletTime = 0;
          var cursors;
          var fireButton;
          var explosions;
          var starfield;
          var firingTimer = 0;
          var stateText;
          var livingEnemies = [];

        var preload = function() {


              game.load.image('sky', 'assets/Gamedevtuts_Free_Shmup_Sprites/Backgrounds/farback.gif');
              game.load.image('ship', 'assets/SpaceShipSmall.png', 32, 48);
              game.load.image('aliens', 'assets/ship (16).png', 40, 44);
              game.load.image('bullet', 'assets/projectile1.svg', 32, 32);
              game.load.image('kaboom', 'assets/exload01_2.png', 10, 10);
          }

          var create = function() {

          game.physics.startSystem(Phaser.Physics.ARCADE);

          game.add.sprite(0, 0, 'sky');

          player = game.add.sprite(32, game.world.height - 150, 'ship');

          game.physics.arcade.enable(player);

          bullets = game.add.group();
          bullets.enableBody = true;
          bullets.physicsBodyType = Phaser.Physics.ARCADE;
          bullets.createMultiple(30, 'bullet');
          bullets.setAll('anchor.x', 0.5);
          bullets.setAll('anchor.y', 1);
          bullets.setAll('outOfBoundsKill', true);
          bullets.setAll('checkWorldBounds', true);


          //  Player physics properties.
          player.body.bounce.y = 0.2;
          player.body.gravity.y = 300;
          player.body.collideWorldBounds = true;

          //  Our animations of walking
          // player.animations.add('left', [0, 1, 2, 3], true);
          // player.animations.add('right', [5, 6, 7, 8], true);
          // player.animations.add('up', [0, 1, 2, 3], true);
          // player.animations.add('down', [5, 6, 7, 8], true);

          aliens = game.add.group();
          aliens.enableBody = true;
          aliens.physicsBodyType = Phaser.Physics.ARCADE;

             createAliens();

          explosions = game.add.group();
          explosions.createMultiple(100, 'kaboom');
          explosions.forEach(setupInvader, this);


          cursors = this.input.keyboard.createCursorKeys();
          // fireButton = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);


          }

          var createAliens = function() {

              for (var y = 0; y < 1; y++)
              {
                  for (var x = 0; x < 3; x++)
                  {
                      var alien = aliens.create(x * 200, y * 200, 'aliens');
                      alien.anchor.setTo(0.5, 0.5);
                      // alien.animations.add('fly', [ 0, 1, 2, 3 ], true);
                      alien.play('fly', 10, true);
                      alien.body.moves = false;
                  }
              }

              aliens.x = 50;
              aliens.y = 50;

              //  All this does is basically start the invaders moving. Notice we're moving the Group they belong to, rather than the invaders directly.
              // var tween = game.add.tween(aliens).to( { x: 200 }, 2000, Phaser.Easing.Linear.None, true, 0, 1000, true);

              //  When the tween loops it calls descend
              // tween.onLoop.add(descend, this);
          }

        var setupInvader = function(invader) {

            invader.anchor.x = 0.5;
            invader.anchor.y = 0.5;
            // invader.animations.add('kaboom');

        }

        var descend = function() {

            aliens.y += 10;

        }

        var fireBullet = function() {

           //  To avoid them being allowed to fire too fast we set a time limit
           if (game.time.now > bulletTime)
           {
               //  Grab the first bullet we can from the pool
               var bullet = bullets.getFirstExists(false);

               if (bullet)
               {
                   //  And fire it
                   bullet.reset(player.x, player.y + 8);
                   bullet.body.velocity.y = -400;
                   bulletTime = game.time.now + 200;
               }
           }


        }

    var collisionHandler = function(bullet, alien, explosion) {

            //  When a bullet hits an alien we kill them both
            bullet.kill();
            alien.kill();

          var explosion = explosions.getFirstExists(false);
           explosion.reset(alien.body.x, alien.body.y);
           explosion.play('kaboom', 100, false, true);

           explosion.kill();
         }



      var resetBullet = function(bullet) {

            //  Called if the bullet goes out of the screen
            bullet.kill();

        }

      var moveLeft = function(){
        player.body.velocity.x = -150;
      }

      var moveRight = function(){
          player.body.velocity.x = 1000;
      }

      var moveUp = function(){
        player.body.velocity.y = -150;
      }

      var moveDown = function(){
         player.body.velocity.y = 150;
      }

      var update = function() {

          player.body.velocity.x = 0;
          player.body.velocity.y = 0;
          for(var i = 0; i < aliens.length; i++){
            if(player.body.x < aliens.getAt(i).body.x + 1 && player.body.x > aliens.getAt(i).body.x - 1){
              fireBullet();
            }
          }

          // if (cursors.left.isDown)
          // {
          //     //  Move to the left
          //     player.body.velocity.x = -150;
          //
          //     // player.animations.play('left', 10, true);
          // }
          // else if (cursors.right.isDown)
          // {
          //     //  Move to the right
          //     player.body.velocity.x = 150;
          //
          //     // player.animations.play('right', 10, true);
          // }
          //
          // else if (cursors.up.isDown)
          // {
          //    //  Move to the Up
          //    player.body.velocity.y = -150;
          //
          //   //  player.animations.play('up', 10, true);
          // }
          //
          //    else if (cursors.down.isDown)
          // {
          //    //  Move to the Down
          //    player.body.velocity.y = 150;
          //
          //   //  player.animations.play('down', 10, true);
          // }

          // if (fireButton.isDown)
          //      {
          //          fireBullet();
          //      }



          game.physics.arcade.overlap(bullets, aliens, collisionHandler, null, this);

        }
var game = new Phaser.Game(600, 400, Phaser.AUTO, 'game', { preload: preload, create: create, createAliens: createAliens, setupInvader: setupInvader, descend: descend, update: update, fireBullet: fireBullet, collisionHandler: collisionHandler, resetBullet: resetBullet });

    var run = function(input){
      // var game = new Phaser.Game(600, 400, Phaser.AUTO, 'game', { preload: preload, create: create, createAliens: createAliens, setupInvader: setupInvader, descend: descend, update: update, fireBullet: fireBullet, collisionHandler: collisionHandler, resetBullet: resetBullet });

    eval(input);
  }
      return {
        run: run
      };
  });

}());
