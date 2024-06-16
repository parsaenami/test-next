import tokens from "./design-tokens.tokens.json";
import fs from "fs";
import path from "path";

interface ITokensObject {
  color: Record<string, any>;
  font: Record<string, any>;
  effect: Record<string, any>;
}

interface IColorObject {
  type: string;
  value: string;
  blendMode: string;
}

interface IFontValueObject {
  fontSize: number;
  textDecoration: string;
  fontFamily: string;
  fontWeight: number;
  fontStyle: string;
  fontStretch: string;
  letterSpacing: number;
  lineHeight: number;
  paragraphIndent: number;
  paragraphSpacing: number;
  textCase: string;
}

interface IFontObject {
  type: string;
  value: IFontValueObject;
}

interface IShadowValueObject {
  shadowType: string;
  radius: number;
  color: string;
  offsetX: number;
  offsetY: number;
  spread: number;
}

interface IShadowObject {
  type?: string;
  value?: IShadowValueObject;
}

type ColorObjectType = IColorObject | Record<string, IColorObject>;
type ShadowObjectType = IShadowObject | Record<string, IShadowObject>;
type FontObjectType = Record<string, IFontObject>;

function formatThemeKeyName(colorName: string): string {
  return colorName.replaceAll("__", "-").replaceAll(" ", "-");
}

// remove any "description" and "extensions" key from any depth of `tokens`
function cleanTokens(tokens: any): any {
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
    } else if (typeof tokens[key] === "object" && tokens[key] !== null) {
      tokens[key] = cleanTokens(tokens[key]);
    }
  }
  return tokens;
}

const cleanedTokens: ITokensObject = cleanTokens(tokens);

const colors: Record<string, string> = Object.fromEntries(
  Object.entries<ColorObjectType>(cleanedTokens.color).reduce<
    Array<[string, any]>
  >(
    (acc, [mainColor, mainColorObject]) => {
      const entries: Array<[string, any]> = Object.keys(
        mainColorObject,
      ).includes("value")
        ? [[formatThemeKeyName(mainColor), mainColorObject.value]]
        : Object.entries(mainColorObject).map(([colorPostFix, colorObject]) => [
            formatThemeKeyName(`${mainColor}-${colorPostFix}`),
            colorObject.value,
          ]);

      return acc.concat(entries);
    },
    [["transparent", "transparent"]],
  ),
);

const fontSize: Record<string, string> = Object.fromEntries(
  Object.entries<FontObjectType>(cleanedTokens.font).reduce<
    Array<[string, any]>
  >((previousValue, [mainFont, mainFontObject]) => {
    return previousValue.concat(
      Object.entries(mainFontObject).map(([fontPostFix, fontObject]) => {
        const { fontSize, lineHeight, letterSpacing, fontWeight } =
          fontObject.value;
        const cleanedFontStyles = {
          letterSpacing: letterSpacing.toString(),
          fontWeight,
          lineHeight: lineHeight + "px",
        };
        return [
          formatThemeKeyName(`${mainFont}-${fontPostFix}`),
          [`${fontSize}px`, cleanedFontStyles],
        ];
      }),
    );
  }, []),
);

const boxShadow: Record<string, string> = Object.fromEntries(
  Object.entries<ShadowObjectType>(cleanedTokens.effect.shadow).reduce<
    Array<[string, any]>
  >((previousValue, [mainEffectKey, mainEffectObject]) => {
    const entries: Array<[string, any]> = Object.keys(
      mainEffectObject,
    ).includes("value")
      ? [
          [
            formatThemeKeyName(`${mainEffectKey}`),
            `${(mainEffectObject.value as IShadowValueObject).offsetX}px ${(mainEffectObject.value as IShadowValueObject).offsetY}px ${(mainEffectObject.value as IShadowValueObject).radius}px ${(mainEffectObject.value as IShadowValueObject).spread}px ${(mainEffectObject.value as IShadowValueObject).color}`,
          ],
        ]
      : Object.entries(mainEffectObject).map(
          ([shadowPostFix, shadowObject]) => {
            return [
              formatThemeKeyName(`${mainEffectKey}-${shadowPostFix}`),
              `${shadowObject?.value?.offsetX}px ${shadowObject?.value?.offsetY}px ${shadowObject?.value?.radius}px ${shadowObject?.value?.spread}px ${shadowObject?.value?.color}`,
            ];
          },
        );

    return previousValue.concat(entries);
  }, []),
);

const theme = {
  colors,
  fontSize,
  boxShadow,
};

const finalText = JSON.stringify(theme, null, 2).replaceAll("é", "e");

fs.writeFileSync(path.resolve(__dirname, "tailwind.theme.json"), finalText);
