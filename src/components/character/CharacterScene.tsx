import { Canvas } from "@react-three/fiber";
import { ContactShadows, Float, RoundedBox } from "@react-three/drei";
import type { AvatarProfile, ClothingItem } from "../../types/fitme";

type CharacterOutfit = {
  top?: ClothingItem;
  bottom?: ClothingItem;
  shoes?: ClothingItem;
  outerwear?: ClothingItem;
  accessory?: ClothingItem;
};

type CharacterSceneProps = {
  avatar: AvatarProfile;
  outfit?: CharacterOutfit;
  className?: string;
};

const skinColors: Record<string, string> = {
  Porcelain: "#f8d8bf",
  Peach: "#efb488",
  Honey: "#d88e57",
  Mocha: "#9a5b3d",
  Espresso: "#59372c",
};

const hairColors: Record<string, string> = {
  Black: "#241b2b",
  Brown: "#684233",
  Auburn: "#a64a39",
  Blonde: "#ddad53",
  Pink: "#e46e9f",
};

const eyeColors: Record<string, string> = {
  Brown: "#5f3b32",
  Hazel: "#977936",
  Blue: "#5f99c2",
  Green: "#659678",
};

const garmentColors: Record<string, string> = {
  Black: "#34323d",
  Blue: "#5d94c5",
  Pink: "#e98ab7",
  Beige: "#d6b688",
  Cream: "#f0dfb9",
  White: "#fffdf8",
  Red: "#d76563",
  Green: "#78a986",
  Purple: "#9a76b5",
  Orange: "#de9466",
  Yellow: "#e6c45d",
  Silver: "#c8cbd3",
  Pearl: "#f7f3e9",
};

function garmentColor(item?: ClothingItem) {
  return garmentColors[item?.color ?? ""] ?? "#d98bb2";
}

function Hair({ avatar }: { avatar: AvatarProfile }) {
  const color = hairColors[avatar.hairColor] ?? hairColors.Brown;
  const style = avatar.hairStyle;

  if (style === "Buzzed") {
    return (
      <mesh
        position={[0, 2.42, 0]}
        scale={[1.02, 0.42, 0.92]}
      >
        <sphereGeometry args={[0.74, 36, 24]} />
        <meshStandardMaterial color={color} roughness={0.55} />
      </mesh>
    );
  }

  if (style === "High ponytail") {
    return (
      <>
        <mesh
          position={[0, 2.45, 0]}
          scale={[1.1, 0.62, 0.95]}
        >
          <sphereGeometry args={[0.76, 36, 24]} />
          <meshStandardMaterial color={color} roughness={0.5} />
        </mesh>

        <mesh
          position={[0.58, 2.45, -0.18]}
          scale={[0.48, 0.78, 0.46]}
        >
          <sphereGeometry args={[0.5, 32, 24]} />
          <meshStandardMaterial color={color} roughness={0.48} />
        </mesh>
      </>
    );
  }

  if (style === "Curly bob") {
    return (
      <group>
        {[-0.58, -0.28, 0, 0.28, 0.58].map((x) => (
          <mesh
            key={x}
            position={[x, 2.46 - Math.abs(x) * 0.15, 0]}
            scale={[0.46, 0.52, 0.48]}
          >
            <sphereGeometry args={[0.55, 32, 24]} />
            <meshStandardMaterial color={color} roughness={0.54} />
          </mesh>
        ))}
      </group>
    );
  }

  return (
    <>
      <mesh
        position={[0, 2.42, 0]}
        scale={[1.1, 0.67, 0.96]}
      >
        <sphereGeometry args={[0.76, 36, 24]} />
        <meshStandardMaterial color={color} roughness={0.5} />
      </mesh>

      <mesh
        position={[0.62, 2.08, -0.06]}
        scale={[0.26, 0.74, 0.32]}
      >
        <sphereGeometry args={[0.46, 32, 24]} />
        <meshStandardMaterial color={color} roughness={0.48} />
      </mesh>
    </>
  );
}

function Face({
  avatar,
  skin,
}: {
  avatar: AvatarProfile;
  skin: string;
}) {
  const eye = eyeColors[avatar.eyeColor] ?? eyeColors.Brown;

  const headScale =
    avatar.faceShape === "Round"
      ? [1.04, 1.06, 0.92]
      : avatar.faceShape === "Heart"
        ? [0.92, 1.1, 0.91]
        : avatar.faceShape === "Square"
          ? [1.06, 1.0, 0.93]
          : [0.95, 1.1, 0.92];

  return (
    <>
      <mesh
        position={[0, 2.06, 0]}
        scale={headScale as [number, number, number]}
      >
        <sphereGeometry args={[0.66, 40, 30]} />
        <meshStandardMaterial color={skin} roughness={0.7} />
      </mesh>

      <mesh
        position={[-0.58, 2.03, 0]}
        scale={[0.16, 0.22, 0.16]}
      >
        <sphereGeometry args={[0.5, 24, 18]} />
        <meshStandardMaterial color={skin} roughness={0.7} />
      </mesh>

      <mesh
        position={[0.58, 2.03, 0]}
        scale={[0.16, 0.22, 0.16]}
      >
        <sphereGeometry args={[0.5, 24, 18]} />
        <meshStandardMaterial color={skin} roughness={0.7} />
      </mesh>

      {[-0.24, 0.24].map((x) => (
        <group
          key={x}
          position={[x, 2.12, 0.59]}
        >
          <mesh scale={[0.16, 0.19, 0.07]}>
            <sphereGeometry args={[0.5, 24, 18]} />
            <meshStandardMaterial
              color="#fffdf8"
              roughness={0.35}
            />
          </mesh>

          <mesh
            position={[0, -0.01, 0.065]}
            scale={[0.07, 0.09, 0.05]}
          >
            <sphereGeometry args={[0.5, 20, 16]} />
            <meshStandardMaterial color={eye} roughness={0.35} />
          </mesh>

          <mesh
            position={[0.025, 0.025, 0.1]}
            scale={[0.018, 0.024, 0.01]}
          >
            <sphereGeometry args={[0.5, 12, 12]} />
            <meshStandardMaterial color="#fff" />
          </mesh>
        </group>
      ))}

      <mesh
        position={[0, 1.83, 0.62]}
        scale={[0.18, 0.05, 0.03]}
      >
        <sphereGeometry args={[0.5, 20, 12]} />
        <meshStandardMaterial color="#c97083" roughness={0.6} />
      </mesh>

      {avatar.glasses && (
        <>
          <mesh
            position={[-0.24, 2.12, 0.65]}
            rotation={[0, 0, Math.PI / 2]}
          >
            <torusGeometry args={[0.21, 0.026, 12, 32]} />
            <meshStandardMaterial
              color="#70466e"
              metalness={0.12}
            />
          </mesh>

          <mesh
            position={[0.24, 2.12, 0.65]}
            rotation={[0, 0, Math.PI / 2]}
          >
            <torusGeometry args={[0.21, 0.026, 12, 32]} />
            <meshStandardMaterial
              color="#70466e"
              metalness={0.12}
            />
          </mesh>

          <mesh position={[0, 2.12, 0.65]}>
            <boxGeometry args={[0.12, 0.03, 0.03]} />
            <meshStandardMaterial color="#70466e" />
          </mesh>
        </>
      )}

      {avatar.facialHair === "Moustache" && (
        <mesh
          position={[0, 1.92, 0.65]}
          scale={[0.26, 0.06, 0.04]}
        >
          <sphereGeometry args={[0.5, 20, 12]} />
          <meshStandardMaterial color="#56392f" />
        </mesh>
      )}

      {avatar.facialHair === "Short beard" && (
        <mesh
          position={[0, 1.76, 0.44]}
          scale={[0.34, 0.18, 0.2]}
        >
          <sphereGeometry args={[0.5, 24, 18]} />
          <meshStandardMaterial color="#56392f" />
        </mesh>
      )}
    </>
  );
}

function Clothing({
  avatar,
  outfit,
}: {
  avatar: AvatarProfile;
  outfit?: CharacterOutfit;
}) {
  const top = garmentColor(outfit?.top);
  const bottom = garmentColor(outfit?.bottom);
  const shoes = garmentColor(outfit?.shoes);
  const outerwear = garmentColor(outfit?.outerwear);
  const accessory = garmentColor(outfit?.accessory);
  const hasOuterwear = Boolean(outfit?.outerwear);

  return (
    <>
      <RoundedBox
        args={[1.36, 1.16, 0.56]}
        radius={0.18}
        smoothness={5}
        position={[0, 0.78, 0.13]}
      >
        <meshStandardMaterial color={top} roughness={0.52} />
      </RoundedBox>

      <RoundedBox
        args={[0.34, 0.84, 0.35]}
        radius={0.14}
        smoothness={4}
        position={[-0.88, 0.78, 0.08]}
        rotation={[0, 0, -0.28]}
      >
        <meshStandardMaterial color={top} roughness={0.53} />
      </RoundedBox>

      <RoundedBox
        args={[0.34, 0.84, 0.35]}
        radius={0.14}
        smoothness={4}
        position={[0.88, 0.78, 0.08]}
        rotation={[0, 0, 0.28]}
      >
        <meshStandardMaterial color={top} roughness={0.53} />
      </RoundedBox>

      <RoundedBox
        args={[0.56, 1.18, 0.46]}
        radius={0.16}
        smoothness={5}
        position={[-0.34, -0.38, 0.1]}
      >
        <meshStandardMaterial color={bottom} roughness={0.54} />
      </RoundedBox>

      <RoundedBox
        args={[0.56, 1.18, 0.46]}
        radius={0.16}
        smoothness={5}
        position={[0.34, -0.38, 0.1]}
      >
        <meshStandardMaterial color={bottom} roughness={0.54} />
      </RoundedBox>

      <RoundedBox
        args={[0.76, 0.3, 0.72]}
        radius={0.16}
        smoothness={5}
        position={[-0.34, -1.08, 0.29]}
      >
        <meshStandardMaterial color={shoes} roughness={0.42} />
      </RoundedBox>

      <RoundedBox
        args={[0.76, 0.3, 0.72]}
        radius={0.16}
        smoothness={5}
        position={[0.34, -1.08, 0.29]}
      >
        <meshStandardMaterial color={shoes} roughness={0.42} />
      </RoundedBox>

      {hasOuterwear && (
        <>
          <RoundedBox
            args={[1.5, 1.2, 0.2]}
            radius={0.18}
            smoothness={5}
            position={[0, 0.78, 0.45]}
          >
            <meshStandardMaterial
              color={outerwear}
              roughness={0.47}
            />
          </RoundedBox>

          <mesh position={[0, 0.78, 0.57]}>
            <boxGeometry args={[0.05, 0.96, 0.03]} />
            <meshStandardMaterial color="#fff8fd" />
          </mesh>
        </>
      )}

      {(outfit?.accessory ||
        avatar.accessories.includes("Pearl necklace")) && (
        <mesh
          position={[0, 1.37, 0.53]}
          rotation={[Math.PI / 2, 0, 0]}
        >
          <torusGeometry
            args={[0.36, 0.038, 12, 36, Math.PI]}
          />
          <meshStandardMaterial
            color={
              outfit?.accessory
                ? accessory
                : "#fffdf8"
            }
            metalness={0.18}
            roughness={0.28}
          />
        </mesh>
      )}

      {avatar.accessories.includes("Hoop earrings") && (
        <>
          <mesh
            position={[-0.68, 2.01, 0]}
            rotation={[0, 0, Math.PI / 2]}
          >
            <torusGeometry args={[0.11, 0.024, 12, 24]} />
            <meshStandardMaterial
              color="#e5b43c"
              metalness={0.55}
            />
          </mesh>

          <mesh
            position={[0.68, 2.01, 0]}
            rotation={[0, 0, Math.PI / 2]}
          >
            <torusGeometry args={[0.11, 0.024, 12, 24]} />
            <meshStandardMaterial
              color="#e5b43c"
              metalness={0.55}
            />
          </mesh>
        </>
      )}

      {avatar.tattoos && (
        <mesh
          position={[0.91, 0.67, 0.31]}
          rotation={[0, 0, 0.75]}
        >
          <tetrahedronGeometry args={[0.08, 0]} />
          <meshStandardMaterial color="#75416d" />
        </mesh>
      )}
    </>
  );
}

function CharacterModel({
  avatar,
  outfit,
}: {
  avatar: AvatarProfile;
  outfit?: CharacterOutfit;
}) {
  const skin =
    skinColors[avatar.skinTone] ?? skinColors.Porcelain;

  const height =
    avatar.height === "Tall"
      ? 1.08
      : avatar.height === "Petite"
        ? 0.9
        : 1;

  const build =
    avatar.build === "Curvy"
      ? 1.1
      : avatar.build === "Athletic"
        ? 1.04
        : avatar.build === "Slim"
          ? 0.92
          : 1;

  return (
    <Float
      speed={1.3}
      rotationIntensity={0.08}
      floatIntensity={0.14}
    >
      <group
        position={[0, -0.15, 0]}
        scale={[build, height, 1]}
      >
        <Face avatar={avatar} skin={skin} />
        <Hair avatar={avatar} />
        <Clothing avatar={avatar} outfit={outfit} />
      </group>
    </Float>
  );
}

export function CharacterScene({
  avatar,
  outfit,
  className = "",
}: CharacterSceneProps) {
  return (
    <div
      className={`h-full w-full ${className}`}
      aria-label="Interactive 3D FitMe character"
    >
      <Canvas
        gl={{ alpha: true }}
        dpr={[1, 2]}
        shadows
        camera={{
          position: [0, 1.0, 7],
          fov: 31,
        }}
      >
        <ambientLight intensity={1.7} />

        <directionalLight
          position={[4, 6, 5]}
          intensity={2.2}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />

        <pointLight
          position={[-4, 3, 2]}
          intensity={0.9}
          color="#ffc8de"
        />

        <CharacterModel
          avatar={avatar}
          outfit={outfit}
        />

        <ContactShadows
          position={[0, -1.25, 0]}
          opacity={0.24}
          scale={4.8}
          blur={2.4}
          far={2}
        />
      </Canvas>
    </div>
  );
}