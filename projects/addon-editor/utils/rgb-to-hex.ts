export function rgbToHex(r: number, g: number, b: number): string {
    return [r, g, b]
        .map(x => x.toString(16))
        .map(hex => (hex.length === 1 ? '0' + hex : hex))
        .join('');
}

export function rgbaToHexA(r: number, g: number, b: number, a: number): string {
    const alpha = Math.round(a * 255).toString(16);

    return [r, g, b]
        .map(x => x.toString(16))
        .map(hex => (hex.length === 1 ? '0' + hex : hex))
        .concat(alpha.length === 1 ? '0' + alpha : alpha)
        .join('');
}
