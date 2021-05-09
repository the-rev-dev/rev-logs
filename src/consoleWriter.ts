#!/usr/bin/env node
import chalk from "chalk";
import figlet from 'figlet';

const clearConsole = require('clear');
// const path = require('path');

export enum Font {
    default = "default",
    paragraph = "paragraph",
    title = "title",
    hex = "hex",
    header = "header"
}

interface FontFormat extends figlet.Options {
    color?: typeof chalk.Color,
}

interface Options {
    msg: string;
    format?: keyof typeof Font;
    color?: typeof chalk.Color;
}
const fonts: Record<Font, FontFormat> = {
    paragraph: {},
    title: {
        font: "Univers",
        color: "yellow",
        // horizontalLayout: 'full',
    },
    header: {
        font: "Bigfig",
    },
    hex: {
        font: "Hex",
    },
    default: {}
}

export function consoleClear() {
    clearConsole();
}

export function consoleLog(props: string | Options, format: Font = Font.default) {
    let color, style, msg;
    if (typeof props === "string") {
        msg = props;
        style = fonts[format];
        color = style?.color;

    } else {
        msg = props.msg;
        style = fonts[props?.format || format];
        color = props?.color || style?.color;
    }

    if (style !== fonts[Font.default]) {
        msg = figlet.textSync(msg, style);
    }
    if (!!color && !!(chalk as any)[color]) {
        msg = (chalk as any)[color](msg);
    }

    console.log(msg);
}


var activeSections = 0;

export function logSection(sectionName: string, prefix = '  - '){

    if(activeSections)
    consoleLog(`${sectionName}`);
    activeSections ++;
    return {
        bullet: (message: string) => consoleLog(`${prefix}${message}`),
        line: () => consoleLog(`\n`),
        done: () => activeSections--,
        sections: () => consoleLog(`${prefix}${activeSections}`),
    }
}

export type SectionLogger = ReturnType<typeof logSection>