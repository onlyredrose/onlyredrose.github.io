<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Heart Animation with Processing.js</title>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/processing.js/1.6.6/processing.min.js"></script>
</head>
<body>
    <!-- 定义一个canvas元素 -->
    <canvas id="processing-canvas"></canvas>

    <!-- 嵌入Processing代码 -->
    <script type="application/processing" data-processing-target="processing-canvas">
        // 定义Heart类和动画逻辑
        Heart h1, h2, h3;

        void setup() {
            size(640, 360);
            noStroke();
            h1 = new Heart(250, 16, 120);
            h2 = new Heart(164, 185, 80);  
            h3 = new Heart(420, 230, 220);
        }

        void draw() {
            background(102);
            
            h1.update(mouseX, mouseY);
            h2.update(mouseX, mouseY);
            h3.update(mouseX, mouseY);

            h1.display();
            h2.display();
            h3.display();
        }

        class Heart {
            int x, y;
            int size;
            float angle = 0.0;
            
            Heart(int tx, int ty, int ts) {
                x = tx;
                y = ty;
                size = ts;
            }

            void update(int mx, int my) {
                angle = atan2(my - y, mx - x);
            }
            
            void display() {
                pushMatrix();
                translate(x, y);
                rotate(angle);
                fill(255, 0, 0);
                drawHeart(0, 0, size);
                popMatrix();
            }
            
            void drawHeart(float x, float y, float s) {
                beginShape();
                vertex(x, y + s/4);
                bezierVertex(x, y, x - s/2, y, x - s/2, y + s/4);
                bezierVertex(x - s/2, y + s/2, x, y + s, x, y + s * 3/4);
                bezierVertex(x, y + s, x + s/2, y + s/2, x + s/2, y + s/4);
                bezierVertex(x + s/2, y, x, y, x, y + s/4);
                endShape(CLOSE);
            }
        }
    </script>
</body>
</html>
