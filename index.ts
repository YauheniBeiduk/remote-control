import { httpServer } from './src/http_server';
import * as dotenv from 'dotenv';
import { WebSocketServer, createWebSocketStream } from 'ws';
import {
  drawCircle,
  drawRectangle,
  drawSquare,
  getMousePosition,
  getPosition,
  moveDown,
  moveLeft,
  moveRight,
  moveUp,
  printScreen,
} from './src/commands';
dotenv.config();
const port = Number(process.env.PORT);
const HTTP_PORT = process.env.HTTP_PORT;

console.log(`Start static http server on the ${HTTP_PORT} port!`);

httpServer.listen(HTTP_PORT);

const wss = new WebSocketServer({ port });

wss.on('connection', async (ws) => {
  const duplex = createWebSocketStream(ws, {
    encoding: 'utf8',
    decodeStrings: false,
  });
  duplex.on('data', async (data: string) => {
    console.log(`Received message => ${data}`);
    try {
      const { x, y } = await getPosition();
      const [command, ...args] = data.toString().split(' ');
      const pixels = Number(args[0]);
      const length = Number(args[1]);

      switch (command) {
        case 'mouse_up':
          await moveUp(pixels);
          ws.send(`${command}`);
          break;
        case 'mouse_down':
          await moveDown(pixels);
          break;
        case 'mouse_left':
          await moveLeft(pixels);
          break;
        case 'mouse_right':
          await moveRight(pixels);
          break;
        case 'draw_circle':
          await drawCircle(x, y, pixels);
          break;
        case 'draw_rectangle':
          await drawRectangle(x, y, pixels, length);
          ws.send(`draw_rectangle`)
          break;
        case 'draw_square':
          await drawSquare(x, y, pixels);
          break;
        case 'prnt_scrn':
          await printScreen(duplex);
          break;
        case 'mouse_position':
          await getMousePosition(duplex);
          break;
        default:
          console.log('Unknown command, please, try again');
          break;
      }
    } catch (error) {
      console.log('Error', error);
    }
  });

  duplex.on('close', () => {
    console.log('WS Server is closed.');
    wss.close();
  });
});

process.on('SIGINT', () => {
  process.stdout.write('Closing websocket...\n');
  wss.close();
  console.log('WS Server is closed.');
  process.exit(0);
});
