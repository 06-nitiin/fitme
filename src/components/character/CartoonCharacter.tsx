import { useId } from "react";
import type { AvatarProfile, ClothingItem } from "../../types/fitme";

type CharacterOutfit = {
  top?: ClothingItem;
  bottom?: ClothingItem;
  shoes?: ClothingItem;
  outerwear?: ClothingItem;
  accessory?: ClothingItem;
};

type CartoonCharacterProps = {
  avatar: AvatarProfile;
  outfit?: CharacterOutfit;
  className?: string;
};

const skinColors: Record<string, string> = {
  Porcelain: "#F9D8C0",
  Peach: "#F1B78D",
  Honey: "#D9905A",
  Mocha: "#9B5C3C",
  Espresso: "#5D382C",
};

const hairColors: Record<string, string> = {
  Black: "#2B1C2D",
  Brown: "#6B4231",
  Auburn: "#A64937",
  Blonde: "#DFAE55",
  Pink: "#E46D9F",
};

const eyeColors: Record<string, string> = {
  Brown: "#5E372F",
  Hazel: "#9C7A31",
  Blue: "#4F91B6",
  Green: "#5E9976",
};

const garmentColors: Record<string, string> = {
  Black: "#34313D",
  Blue: "#5B92C2",
  Pink: "#E787B5",
  Beige: "#DAB98E",
  Cream: "#F1DFBA",
  White: "#FFFDF8",
  Red: "#D96160",
  Green: "#74A984",
  Purple: "#9A75B6",
  Orange: "#DF9362",
  Yellow: "#E7C663",
  Silver: "#C5C9D1",
  Pearl: "#FAF7EE",
};

function colorForGarment(item?: ClothingItem) {
  return garmentColors[item?.color ?? ""] ?? "#D88AAF";
}

function faceRadii(faceShape: AvatarProfile["faceShape"]) {
  if (faceShape === "Round") return { x: 58, y: 66 };
  if (faceShape === "Heart") return { x: 53, y: 70 };
  if (faceShape === "Square") return { x: 58, y: 66 };

  return { x: 51, y: 70 };
}

function Hair({
  style,
  color,
  presentation,
}: {
  style: AvatarProfile["hairStyle"];
  color: string;
  presentation: AvatarProfile["presentation"];
}) {
  if (style === "Buzzed") {
    return (
      <path
        d="M111 127C115 80 225 80 229 127C205 104 135 104 111 127Z"
        fill={color}
      />
    );
  }

  if (style === "High ponytail") {
    return (
      <>
        <circle cx="230" cy="110" r="34" fill={color} />
        <path
          d="M108 143C102 80 238 73 232 150C203 119 141 114 108 143Z"
          fill={color}
        />
      </>
    );
  }

  if (style === "Curly bob") {
    return (
      <>
        <circle cx="118" cy="113" r="32" fill={color} />
        <circle cx="139" cy="91" r="34" fill={color} />
        <circle cx="171" cy="83" r="38" fill={color} />
        <circle cx="204" cy="93" r="34" fill={color} />
        <circle cx="224" cy="118" r="31" fill={color} />
        <path
          d="M109 128C118 86 223 86 231 129V164H109Z"
          fill={color}
        />
      </>
    );
  }

  const hasLongSweep =
    presentation === "Feminine" || presentation === "Neutral";

  return (
    <>
      <path
        d="M106 142C101 72 236 66 237 143C217 112 198 102 170 102C136 102 119 118 106 142Z"
        fill={color}
      />

      {hasLongSweep && (
        <path
          d="M216 128C249 148 238 208 207 214C221 186 210 165 197 149Z"
          fill={color}
        />
      )}

      {!hasLongSweep && (
        <path
          d="M111 139C114 99 222 97 229 139C209 123 132 123 111 139Z"
          fill={color}
        />
      )}
    </>
  );
}

function ClothingLayers({
  outfit,
  avatar,
  lineColor,
}: {
  outfit?: CharacterOutfit;
  avatar: AvatarProfile;
  lineColor: string;
}) {
  const topColor = colorForGarment(outfit?.top);
  const bottomColor = colorForGarment(outfit?.bottom);
  const shoeColor = colorForGarment(outfit?.shoes);
  const outerwearColor = colorForGarment(outfit?.outerwear);
  const accessoryColor = colorForGarment(outfit?.accessory);
  const presentation = avatar.presentation ?? "Neutral";

  const topId = useId().replace(/:/g, "");
  const bottomId = useId().replace(/:/g, "");

  return (
    <>
      <defs>
        <linearGradient
          id={topId}
          x1="0"
          x2="0"
          y1="0"
          y2="1"
        >
          <stop
            stopColor={topColor}
            stopOpacity="0.98"
          />
          <stop
            offset="1"
            stopColor={topColor}
            stopOpacity="0.76"
          />
        </linearGradient>

        <linearGradient
          id={bottomId}
          x1="0"
          x2="0"
          y1="0"
          y2="1"
        >
          <stop
            stopColor={bottomColor}
            stopOpacity="0.96"
          />
          <stop
            offset="1"
            stopColor={bottomColor}
            stopOpacity="0.74"
          />
        </linearGradient>
      </defs>

      <path
        d="M122 278C139 262 201 262 218 278L239 315L222 328L209 310V387H131V310L118 328L101 315Z"
        fill={`url(#${topId})`}
        stroke={lineColor}
        strokeWidth="3"
        strokeLinejoin="round"
      />

      {outfit?.top?.category === "Shirts" && (
        <>
          <path
            d="M170 278V387"
            stroke="#FFF9FD"
            strokeWidth="3"
          />
          <circle
            cx="170"
            cy="309"
            r="3"
            fill="#FFF9FD"
          />
          <circle
            cx="170"
            cy="335"
            r="3"
            fill="#FFF9FD"
          />
        </>
      )}

      {outfit?.top?.category === "Sweaters" && (
        <path
          d="M132 380H208"
          stroke="#FFF9FD"
          strokeOpacity="0.55"
          strokeWidth="5"
        />
      )}

      <path
        d="M132 387H208L215 471H178L170 413L162 471H125Z"
        fill={`url(#${bottomId})`}
        stroke={lineColor}
        strokeWidth="3"
        strokeLinejoin="round"
      />

      {outfit?.bottom?.category === "Jeans" && (
        <>
          <path
            d="M130 404H210"
            stroke="#E6E7EB"
            strokeOpacity="0.55"
            strokeWidth="3"
          />
          <path
            d="M170 388V470"
            stroke={lineColor}
            strokeOpacity="0.55"
            strokeWidth="3"
          />
        </>
      )}

      {outfit?.bottom?.category === "Shorts" && (
        <path
          d="M131 387H209V432H178L170 410L162 432H131Z"
          fill={bottomColor}
          stroke={lineColor}
          strokeWidth="3"
        />
      )}

      <path
        d="M119 467H166V489H109C106 480 111 471 119 467Z"
        fill={shoeColor}
        stroke={lineColor}
        strokeWidth="3"
        strokeLinejoin="round"
      />

      <path
        d="M174 467H221C229 471 234 480 231 489H174Z"
        fill={shoeColor}
        stroke={lineColor}
        strokeWidth="3"
        strokeLinejoin="round"
      />

      <path
        d="M114 480H163M177 480H226"
        stroke="#FFF9FD"
        strokeOpacity="0.65"
        strokeWidth="3"
      />

      {outfit?.outerwear && (
        <>
          <path
            d="M104 304L124 279C139 264 201 264 216 279L237 304L221 332L204 312V389H136V312L119 332Z"
            fill={outerwearColor}
            fillOpacity="0.92"
            stroke={lineColor}
            strokeWidth="3"
            strokeLinejoin="round"
          />

          <path
            d="M170 282V388"
            stroke="#FFF9FD"
            strokeOpacity="0.76"
            strokeWidth="3"
          />

          <path
            d="M134 335H152M188 335H206"
            stroke="#FFF9FD"
            strokeOpacity="0.72"
            strokeWidth="4"
            strokeLinecap="round"
          />
        </>
      )}

      {(outfit?.accessory ||
        avatar.accessories.includes("Pearl necklace")) && (
        <path
          d="M145 275C149 301 191 301 195 275"
          fill="none"
          stroke={
            outfit?.accessory
              ? accessoryColor
              : "#FFF9FD"
          }
          strokeWidth="5"
          strokeLinecap="round"
          strokeDasharray="1 8"
        />
      )}

      {avatar.accessories.includes("Hoop earrings") && (
        <>
          <circle
            cx="113"
            cy="217"
            r="9"
            fill="none"
            stroke="#E5B43C"
            strokeWidth="3"
          />
          <circle
            cx="227"
            cy="217"
            r="9"
            fill="none"
            stroke="#E5B43C"
            strokeWidth="3"
          />
        </>
      )}

      {avatar.tattoos && (
        <path
          d="M222 338l3 6 6 3-6 3-3 6-3-6-6-3 6-3Z"
          fill="#75416D"
        />
      )}

      {presentation === "Feminine" && (
        <path
          d="M105 298C108 281 124 273 136 278"
          fill="none"
          stroke="#F4B9D1"
          strokeWidth="5"
          strokeLinecap="round"
        />
      )}
    </>
  );
}

export function CartoonCharacter({
  avatar,
  outfit,
  className = "",
}: CartoonCharacterProps) {
  const skin =
    skinColors[avatar.skinTone] ?? skinColors.Porcelain;
  const hair =
    hairColors[avatar.hairColor] ?? hairColors.Brown;
  const eye =
    eyeColors[avatar.eyeColor] ?? eyeColors.Brown;

  const lineColor = "#744669";
  const radii = faceRadii(avatar.faceShape);
  const presentation = avatar.presentation ?? "Neutral";

  const scale =
    avatar.height === "Tall"
      ? 1.05
      : avatar.height === "Petite"
        ? 0.93
        : 1;

  const bodyScale =
    avatar.build === "Curvy"
      ? 1.08
      : avatar.build === "Athletic"
        ? 1.03
        : avatar.build === "Slim"
          ? 0.94
          : 1;

  return (
    <svg
      viewBox="0 0 340 520"
      role="img"
      aria-label="A customisable FitMe cartoon character"
      className={`h-full w-full overflow-visible ${className}`}
    >
      <g
        transform={`translate(${170 - 170 * scale} ${
          520 - 520 * scale
        }) scale(${scale})`}
      >
        <g
          transform={`translate(${170 - 170 * bodyScale} 0) scale(${bodyScale} 1)`}
        >
          <path
            d="M132 232C140 219 200 219 208 232L225 286L207 299H133L115 286Z"
            fill={skin}
            stroke={lineColor}
            strokeWidth="3"
            strokeLinejoin="round"
          />

          <path
            d="M130 281C114 287 102 305 101 333L115 336L131 307M210 281C226 287 238 305 239 333L225 336L209 307"
            fill={skin}
            stroke={lineColor}
            strokeWidth="3"
            strokeLinecap="round"
          />

          <ellipse
            cx="170"
            cy="161"
            rx={radii.x}
            ry={radii.y}
            fill={skin}
            stroke={lineColor}
            strokeWidth="3"
          />

          <Hair
            style={avatar.hairStyle}
            color={hair}
            presentation={presentation}
          />

          <ellipse
            cx="111"
            cy="169"
            rx="11"
            ry="16"
            fill={skin}
            stroke={lineColor}
            strokeWidth="3"
          />

          <ellipse
            cx="229"
            cy="169"
            rx="11"
            ry="16"
            fill={skin}
            stroke={lineColor}
            strokeWidth="3"
          />

          <path
            d="M136 151Q148 143 158 150M182 150Q192 143 204 151"
            fill="none"
            stroke={lineColor}
            strokeWidth="5"
            strokeLinecap="round"
          />

          <ellipse
            cx="148"
            cy="171"
            rx="12"
            ry="14"
            fill="#FFF"
          />

          <ellipse
            cx="192"
            cy="171"
            rx="12"
            ry="14"
            fill="#FFF"
          />

          <circle
            cx="148"
            cy="173"
            r="7"
            fill={eye}
          />

          <circle
            cx="192"
            cy="173"
            r="7"
            fill={eye}
          />

          <circle
            cx="150"
            cy="170"
            r="2"
            fill="#FFF"
          />

          <circle
            cx="194"
            cy="170"
            r="2"
            fill="#FFF"
          />

          <path
            d="M158 204Q170 214 182 204"
            fill="none"
            stroke="#C97182"
            strokeWidth="4"
            strokeLinecap="round"
          />

          <path
            d="M165 179Q170 187 175 179"
            fill="none"
            stroke={lineColor}
            strokeWidth="2.5"
            strokeLinecap="round"
          />

          {avatar.glasses && (
            <>
              <circle
                cx="148"
                cy="171"
                r="21"
                fill="none"
                stroke={lineColor}
                strokeWidth="4"
              />

              <circle
                cx="192"
                cy="171"
                r="21"
                fill="none"
                stroke={lineColor}
                strokeWidth="4"
              />

              <path
                d="M169 171H171"
                stroke={lineColor}
                strokeWidth="4"
              />
            </>
          )}

          {avatar.facialHair === "Moustache" && (
            <path
              d="M153 196Q163 189 170 197Q177 189 187 196"
              fill="none"
              stroke="#57382F"
              strokeWidth="5"
              strokeLinecap="round"
            />
          )}

          {avatar.facialHair === "Short beard" && (
            <path
              d="M151 199Q170 226 189 199"
              fill="none"
              stroke="#57382F"
              strokeWidth="7"
              strokeLinecap="round"
            />
          )}

          {avatar.accessories.includes("Ribbon hair clip") && (
            <path
              d="M212 121c10-12 22 3 12 13l-7 7-7-7c-10-10 2-25 12-13Z"
              fill="#EA7BAA"
            />
          )}

          <ClothingLayers
            outfit={outfit}
            avatar={avatar}
            lineColor={lineColor}
          />
        </g>
      </g>
    </svg>
  );
}