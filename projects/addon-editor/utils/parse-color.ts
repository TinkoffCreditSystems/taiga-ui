const DEFAULT: [number, number, number, number] = [0, 0, 0, 1];

export function parseColor(color: string): [number, number, number, number] {
    const stripped = color
        .replace('#', '')
        .replace('rgba(', '')
        .replace('rgb(', '')
        .replace(')', '');
    const array = stripped.split(',').map(item => parseFloat(item));

    if (array.length === 4) {
        return array as [number, number, number, number];
    }

    if (array.length === 3) {
        return array.concat(1) as [number, number, number, number];
    }

    const symbolsCount = stripped.length === 8 ? 2 : stripped.length / 3;
    const matches = stripped.match(new RegExp('(.{' + symbolsCount + '})', 'g'));

    if (!matches) {
        return DEFAULT;
    }

    const parsed = matches.map((char, index) =>
        matches.length > 3 && index === matches.length - 1
            ? Math.round(
                  (parseInt(stripped.length % 2 ? char + char : char, 16) / 255) * 100,
              ) / 100
            : parseInt(stripped.length % 2 ? char + char : char, 16),
    );

    return [
        parsed[0] || DEFAULT[0],
        parsed[1] || DEFAULT[1],
        parsed[2] || DEFAULT[2],
        parsed[3] === undefined ? DEFAULT[3] : parsed[3],
    ];
}
