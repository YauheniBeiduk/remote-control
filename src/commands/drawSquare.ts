import { Button, down, left, mouse, right, up } from '@nut-tree/nut-js';

export const drawSquare = async (
  x: number,
  y: number,
  width: number
): Promise<void> => {
  mouse.config.mouseSpeed = 500;
  await mouse.pressButton(Button.LEFT);
  await mouse.move(right(width));
  await mouse.move(down(width));
  await mouse.move(left(width));
  await mouse.move(up(width));
  await mouse.releaseButton(Button.LEFT);
};
