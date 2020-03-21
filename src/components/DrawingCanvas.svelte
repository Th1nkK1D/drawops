<script>
  import { onMount } from 'svelte';

  onMount(async () => {
    const { default: p5 } = await import('p5');
  
    const drawingCanvas = new p5(p => {
      let lastDrawingCoord = null;

      p.setup = () => {
        p.createCanvas(window.innerWidth, window.innerWidth);

        p.background(250);
        p.stroke(0);
        p.strokeWeight(2);
      };

      p.draw = () => {
        if (p.mouseIsPressed) {
          let end = [p.mouseX, p.mouseY];
          let start = lastDrawingCoord || end;

          p.line(...start, ...end);

          lastDrawingCoord = [ ...end ];
        } else {
          lastDrawingCoord = null;
        }
      }
    })
  }, document.querySelector('#drawing-canvas'));
</script>

<div id="drawing-canvas"></div>
