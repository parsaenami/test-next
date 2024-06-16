"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const design_tokens_tokens_json_1 = __importDefault(require("./design-tokens.tokens.json"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
function formatThemeKeyName(colorName) {
    return colorName.replaceAll("__", "-").replaceAll(" ", "-");
}
// remove any "description" and "extensions" key from any depth of `tokens`
function cleanTokens(tokens) {
    const unwantedKeys = [
        "description",
        "extensions",
        "avatar user square",
        "focus ring",
        "background blur",
    ];
    for (const key in tokens) {
        if (unwantedKeys.includes(key)) {
            delete tokens[key];
        }
        else if (typeof tokens[key] === "object" && tokens[key] !== null) {
            tokens[key] = cleanTokens(tokens[key]);
        }
    }
    return tokens;
}
const cleanedTokens = cleanTokens(design_tokens_tokens_json_1.default);
const colors = Object.fromEntries(Object.entries(cleanedTokens.color).reduce((acc, [mainColor, mainColorObject]) => {
    const entries = Object.keys(mainColorObject).includes("value")
        ? [[formatThemeKeyName(mainColor), mainColorObject.value]]
        : Object.entries(mainColorObject).map(([colorPostFix, colorObject]) => [
            formatThemeKeyName(`${mainColor}-${colorPostFix}`),
            colorObject.value,
        ]);
    return acc.concat(entries);
}, [["transparent", "transparent"]]));
const fontSize = Object.fromEntries(Object.entries(cleanedTokens.font).reduce((previousValue, [mainFont, mainFontObject]) => {
    return previousValue.concat(Object.entries(mainFontObject).map(([fontPostFix, fontObject]) => {
        const { fontSize, lineHeight, letterSpacing, fontWeight } = fontObject.value;
        const cleanedFontStyles = {
            letterSpacing: letterSpacing.toString(),
            fontWeight,
            lineHeight: lineHeight + "px",
        };
        return [
            formatThemeKeyName(`${mainFont}-${fontPostFix}`),
            [`${fontSize}px`, cleanedFontStyles],
        ];
    }));
}, []));
const boxShadow = Object.fromEntries(Object.entries(cleanedTokens.effect.shadow).reduce((previousValue, [mainEffectKey, mainEffectObject]) => {
    const entries = Object.keys(mainEffectObject).includes("value")
        ? [
            [
                formatThemeKeyName(`${mainEffectKey}`),
                `${mainEffectObject.value.offsetX}px ${mainEffectObject.value.offsetY}px ${mainEffectObject.value.radius}px ${mainEffectObject.value.spread}px ${mainEffectObject.value.color}`,
            ],
        ]
        : Object.entries(mainEffectObject).map(([shadowPostFix, shadowObject]) => {
            return [
                formatThemeKeyName(`${mainEffectKey}-${shadowPostFix}`),
                `${shadowObject?.value?.offsetX}px ${shadowObject?.value?.offsetY}px ${shadowObject?.value?.radius}px ${shadowObject?.value?.spread}px ${shadowObject?.value?.color}`,
            ];
        });
    return previousValue.concat(entries);
}, []));
const theme = {
    colors,
    fontSize,
    boxShadow,
};
const finalText = JSON.stringify(theme, null, 2).replaceAll("é", "e");
fs_1.default.writeFileSync(path_1.default.resolve(__dirname, "tailwind.theme.json"), finalText);
