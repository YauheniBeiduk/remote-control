import { down, left, mouse, right, up } from '@nut-tree/nut-js';
import { Duplex } from 'stream';

export const moveUp = async (pixels: number) =>
  await mouse.move(up(pixels));

export const moveDown = async (pixels: number) =>
  await mouse.move(down(pixels));

export const moveRight = async (pixels: number) =>
  await mouse.move(right(pixels));

export const moveLeft = async (pixels: number) =>
  await mouse.move(left(pixels));

export const getPosition = async () => {
  return await mouse.getPosition();
};

export const getMousePosition = async (duplex: Duplex) => {
  const { x, y } = await mouse.getPosition();
  duplex.write(`mouse_position ${x},${y}`);
};
