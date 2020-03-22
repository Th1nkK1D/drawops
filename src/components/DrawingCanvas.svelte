<script>
  import { onMount } from 'svelte';

  onMount(async () => {
    const { default: p5 } = await import('p5');
    const { socket } = await import('../helpers/socket');
  
    const drawingCanvas = new p5(p => {
      let lastDrawingCoord = null;
      let assignedColor = 0;

      p.setup = () => {
        p.createCanvas(window.innerWidth, window.innerHeight);

        p.background(250);
        p.strokeWeight(3);

        socket.on('draw', ({ coordinates, color }) => {
          p.stroke(color);
          p.line(...coordinates);
        })

        socket.on('assignColor', color => {
          assignedColor = color;
        })
      };

      p.draw = () => {
        if (p.mouseIsPressed) {
          let end = [p.mouseX, p.mouseY];
          let start = lastDrawingCoord || end;

          p.stroke(assignedColor);
          p.line(...start, ...end);
  
          socket.emit('draw', {
            coordinates: [...start, ...end],
            color: assignedColor,
          })

          lastDrawingCoord = [ ...end ];
        } else {
          lastDrawingCoord = null;
        }
      }
    })
  }, document.querySelector('#drawing-canvas'));
</script>

<div id="drawing-canvas"></div>
