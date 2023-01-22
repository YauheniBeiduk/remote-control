import { Duplex } from 'stream';
import { Region, screen } from '@nut-tree/nut-js';
import Jimp from 'jimp';
import { getPosition } from './moveCommands';

export const printScreen = async (duplex: Duplex) => {
  const { x, y } = await getPosition();

  const screenShoot = await screen.grabRegion(
    new Region(
      Math.max(0, x - 100),
      Math.max(0, y - 100),
      100,
      100
    )
  );

  const jimp = new Jimp(200,200);
  jimp.bitmap.data = screenShoot.data;

  const img = await jimp.getBufferAsync(Jimp.MIME_PNG);
  const base64 = img.toString("base64");

  duplex.write(`prnt_scrn ${base64}`);
};