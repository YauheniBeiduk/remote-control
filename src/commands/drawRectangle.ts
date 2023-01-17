import { Button, down, left, mouse, right, up } from '@nut-tree/nut-js';

export const drawRectangle = async (
  x: number,
  y: number,
  width: number,
  length: number
): Promise<void> => {
  await mouse.pressButton(Button.LEFT);
  await mouse.move(right(width));

  await mouse.releaseButton(Button.LEFT);
  await mouse.pressButton(Button.LEFT);

  await mouse.move(down(length));

  await mouse.releaseButton(Button.LEFT);
  await mouse.pressButton(Button.LEFT);
  await mouse.move(left(width));

  await mouse.releaseButton(Button.LEFT);
  await mouse.pressButton(Button.LEFT);
  await mouse.move(up(length));

  await mouse.releaseButton(Button.LEFT);
};
