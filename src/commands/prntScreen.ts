import { Duplex } from 'stream';
import { mouse, Region, screen } from '@nut-tree/nut-js';
import Jimp from 'jimp';

export const printScreen = async (duplex: Duplex) => {
  const { x: currentX, y: currentY } = await mouse.getPosition();

  const screenshotHalfWidth = 100;

  const screenShoot = await screen.grabRegion(
    new Region(
      Math.max(0, currentX - screenshotHalfWidth),
      Math.max(0, currentY - screenshotHalfWidth),
      100,
      100
    )
  );
  const screenShootNew = await screenShoot.data;
  const jimp = new Jimp({ data: screenShootNew, screenShootNew, height: 200 });
  const base64Img = await jimp.getBase64Async(Jimp.MIME_PNG);
  const base64 = base64Img.split(',')[1];
  duplex.write(`prnt_scrn ${base64}`);
};
