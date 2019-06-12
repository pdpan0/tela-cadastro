        window.onload = function () {

            let stage = document.getElementById('stage');
            let ctx = stage.getContext("2d");

            document.addEventListener("keydown", keyPush);
            setInterval(game, 80);

            const vel = 1;

            let vx = vy = 0;
            let px = 10;
            let py = 15;
            let tp = 30;
            let qp = 20;
            let ax = ay = 15;
            let score = 0;
            let record = 0;
            let trail = [];
            tail = 5;

            function game() {
                // quebra do cenário
                score1.innerHTML = score;
                px += vx;
                py += vy;
                if (px < 0) {
                    px = qp - 1;
                }
                if (px > qp - 1) {
                    px = 0;
                }
                if (py < 0) {
                    py = qp - 1
                }
                if (py > qp - 1) {
                    py = 0
                }
                //Cenário
                ctx.fillStyle = "black";
                ctx.fillRect(0, 0, stage.width, stage.height);
                //Maçã
                ctx.fillStyle = "red";
                ctx.fillRect(ax * tp, ay * tp, tp, tp);
                //Cobra
                ctx.fillStyle = "green";
                for (let i = 0; i < trail.length; i++) {

                    ctx.fillRect(trail[i].x * tp, trail[i].y * tp, tp - 1, tp - 1);

                    if (trail[i].x == px && trail[i].y == py) {

                        vx = vy = 0;
                        tail = 5;
                        if (score > record) {
                            record = score;
                            record1.innerHTML = record;
                            requestRank(score);
                        }
                        score = 0;


                        // alert('Game Over');
                    }
                }

                trail.push({ x: px, y: py });

                while (trail.length > tail) {
                    trail.shift();
                }
                if (ax == px && ay == py) {
                    tail++;
                    score++;
    
                    ax = Math.floor(Math.random() * qp);
                    ay = Math.floor(Math.random() * qp);
                    for(i=0;i<trail.length;i++){
                    if(ax==trail[i].x && ay == trail[i].y){
                        ax = Math.floor(Math.random() * qp);
                    ay = Math.floor(Math.random() * qp);
                    }
                }
                }
            }
            function keyPush(event) {
                switch (event.keyCode) {
                    case 37: //Left
                        vx = -vel;
                        vy = 0;
                        break;
                    case 38: //Up
                        vx = 0;
                        vy = -vel;
                        break;
                    case 39: //Right
                        vx = vel;
                        vy = 0;
                        break;
                    case 40: //Down
                        vx = 0;
                        vy = vel;
                        break;
                    default:
                        break;
                }
            }
        }