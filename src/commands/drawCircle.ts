import { centerOf, mouse, Region, straightTo } from '@nut-tree/nut-js';

export const drawCircle = async (
  x: number,
  y: number,
  radius: number
): Promise<void> => {
  for (let i = 0; i <= Math.PI * 2; i += 0.01) {
    const xPosition = x + Number(radius) * Math.cos(i);
    const yPosition = y + Number(radius) * Math.sin(i);
    const center = centerOf(
      new Region(xPosition, yPosition, Number(radius), Number(radius))
    );
    await mouse.drag(straightTo(center));
  }
};
