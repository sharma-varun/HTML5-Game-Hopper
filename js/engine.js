/* Engine.js
 * This file provides the game loop functionality (update entities and render),
 * draws the initial game board on the screen, and then calls the update and
 * render methods on your player and enemy objects defined in app.js
 * This engine is available globally via the Engine variable and it also makes
 * the canvas' context (ctx) object globally available.
 */

var Engine = (function(global) {

    var doc = global.document,
        win = global.window,
        canvas = doc.createElement('canvas'),
        ctx = canvas.getContext('2d'),
        lastTime;

    canvas.width = 910;
    canvas.height = 650;
    doc.body.appendChild(canvas);

    //  This function serves as the kickoff point for the game loop itself
    //  and handles properly calling the update and render methods.
    function main() {

        var now = Date.now(),
            dt = (now - lastTime) / 1000.0;

        // Call to update and render functions
        update(dt);
        render();

        lastTime = now;

        win.requestAnimationFrame(main);
    }

    function init() {
        lastTime = Date.now();
        main();
    }


    function update(dt) {
        updateEntities(dt);
      }

    // A function which calls update function associated with each of the different entities
    function updateEntities(dt) {
        allEnemies.forEach(function(enemy) {
            enemy.update(dt);
        });
        jewel.update();
        rock.update();
      }

    // This render function can call everytime the image needs to be rendered on the
    // canvas element
    function render() {

        var rowImages = [
                'images/water-block.png',   // Top row is water
                'images/stone-block.png',   // Row 1 of 3 of stone
                'images/stone-block.png',   // Row 2 of 3 of stone
                'images/stone-block.png',   // Row 3 of 3 of stone
                'images/stone-block.png',   // Row 1 of 2 of grass
                'images/grass-block.png'    // Row 2 of 2 of grass
            ],
            numRows = 6,
            numCols = 9,
            row, col;

        // Looping through rowImages to render the tiles
        for (row = 0; row < numRows; row++) {
            for (col = 0; col < numCols; col++) {
                ctx.drawImage(Resources.get(rowImages[row]), col * 101, row * 83);
            }
        }
        renderEntities();
    }

    // A function which calls render function associated with each of the different entities
    function renderEntities() {

        allEnemies.forEach(function(enemy) {
            enemy.render();
        });

        if(gamescore.score % 10 === 0 && gamescore.score > 0 ){
            jewel.render();
        }
        else{
          rock.render();
        }
        player.render();
        gamescore.render();
        life.render();

        if(life.numLives < 1){
          ctx.beginPath();
          ctx.fillStyle = "#008080";
          ctx.fillRect(0, 0, canvas.width, 600);
          ctx.fillStyle = "#FF8C00";
          ctx.font = '100px Cursive';
          ctx.textAlign = "center";
          ctx.fillText("Game Over", canvas.width/2, 200);
          ctx.fillText("You Scored: "+gamescore.score, canvas.width/2, 400);
        }
    }




    //  load all of the images we know we're going to need to
    //  draw our game level. Then set init as the callback method, so that when
    //  all of these images are properly loaded our game will start.
    Resources.load([
        'images/stone-block.png',
        'images/water-block.png',
        'images/grass-block.png',
        'images/enemy-bug.png',
        'images/Rock.png',
        'images/char-boy.png',
        'images/char-cat-girl.png',
        'images/char-horn-girl.png',
        'images/char-pink-girl.png',
        'images/char-princess-girl.png',
        'images/Gem Blue.png',
        'images/Gem Green.png',
        'images/Gem Orange.png',
        'images/Char_hip_boy.png',
        'images/Life.png',
    ]);
    Resources.onReady(init);

    /* Assign the canvas' context object to the global variable (the window
     * object when run in a browser) so that developer's can use it more easily
     * from within their app.js files.
     */
    global.ctx = ctx;
})(this);
