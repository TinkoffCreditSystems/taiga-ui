import {TuiParsedGradient} from '@taiga-ui/addon-editor/interfaces';
import {TuiGradientDirection} from '@taiga-ui/addon-editor/types';

//
// TypeScript parser based on Dean Taylor's answer:
// https://stackoverflow.com/a/20238168/2706426
//
// SETUP CODE
const COMMA = '\\s*,\\s*'; // Allow space around comma.
const HEX = '#(?:[a-f0-9]{8}|[a-f0-9]{6}|[a-f0-9]{3})'; // 3 or 6 character form
const RGB = '\\(\\s*(?:\\d{1,3}\\s*,\\s*){2}\\d{1,3}\\s*\\)'; // "(1, 2, 3)"
const RGBA = '\\(\\s*(?:\\d{1,3}\\s*,\\s*){2}\\d{1,3}\\s*,\\s*\\d*\\.?\\d+\\)'; // "(1, 2, 3, 4)"
const VALUE = '(?:[+-]?\\d*\\.?\\d+)(?:%|[a-z]+)?'; // ".9", "-5px", "100%".
const KEYWORD = '[_a-z-][_a-z0-9-]*'; // "red", "transparent", "border-collapse".
const COLOR = [
    '(?:',
    HEX,
    '|',
    '(?:rgb|hsl)',
    RGB,
    '|',
    '(?:rgba|hsla)',
    RGBA,
    '|',
    KEYWORD,
    ')',
];
const REGEXP_ARRAY = [
    '\\s*(',
    ...COLOR,
    ')',
    '(?:\\s+',
    '(',
    VALUE,
    '))?',
    '(?:',
    COMMA,
    '\\s*)?',
];

export function parseGradient(input: string): TuiParsedGradient {
    const stopsRegexp = new RegExp(REGEXP_ARRAY.join(''), 'gi');
    const stopsString =
        input.startsWith('to') || input.match(/^\d/)
            ? input.substring(input.indexOf(',') + 1).trim()
            : input;

    const side = input.startsWith('to')
        ? (input.split(',')[0] as TuiGradientDirection)
        : 'to bottom';
    let stops: TuiParsedGradient['stops'] = [];

    let matchColorStop = stopsRegexp.exec(stopsString);

    while (matchColorStop !== null) {
        stops = stops.concat({
            color: matchColorStop[1],
            position: getPosition(matchColorStop[2], stops.length),
        });

        matchColorStop = stopsRegexp.exec(stopsString);
    }

    stops = stops.filter(({color}) => color.startsWith('#') || color.startsWith('rgb'));

    return {
        stops,
        side,
    };
}

function getPosition(match: string, stops: number): string {
    const fallback = stops === 1 ? '100%' : `${stops}%`;

    return match && match.includes('%') ? match : fallback;
}
