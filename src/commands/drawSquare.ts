import { Button, down, left, mouse, right, up } from '@nut-tree/nut-js';

const releasePressedButton = async () => {
  await mouse.releaseButton(Button.LEFT);
  await mouse.pressButton(Button.LEFT);
};
export const drawSquare = async (
  x: number,
  y: number,
  width: number
): Promise<void> => {
  await mouse.pressButton(Button.LEFT);
  await mouse.move(right(width));
  await releasePressedButton();
  await mouse.move(down(width));
  await releasePressedButton();
  await mouse.move(left(width));
  await releasePressedButton();
  await mouse.move(up(width));
  await mouse.releaseButton(Button.LEFT);
};
