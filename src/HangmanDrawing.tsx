import "./HangmanDrawing.css";

const HEAD = <div className="HEAD" />;
const BODY = <div className="BODY" />;
const RIGHT_ARM = (
  <div
    className="RIGHT_ARM"
    style={{
      transformOrigin: "left bottom",
    }}
  />
);
const LEFT_ARM = (
  <div
    className="LEFT_ARM"
    style={{
      transformOrigin: "right bottom",
    }}
  />
);
const RIGHT_LEG = (
  <div
    className="RIGHT_LEG"
    style={{
      transformOrigin: "left bottom",
    }}
  />
);
const LEFT_LEG = (
  <div
    className="LEFT_LEG"
    style={{
      transformOrigin: "right bottom",
    }}
  />
);

const BODY_PARTS = [HEAD, BODY, RIGHT_ARM, LEFT_ARM, RIGHT_LEG, LEFT_LEG];

type HangManDrawingProps = {
  numberOfGuesses: number;
};

export function HangmanDrawing({ numberOfGuesses }: HangManDrawingProps) {
  return (
    <div className="HANGMAN_CONTAINER">
      {BODY_PARTS.slice(0, numberOfGuesses)}
      <div className="ROPE" />
      <div className="SUPPORT_BEAM" />
      <div className="MAIN_BEAM" />
      <div className="FLOOR_SUPPORT" />
    </div>
  );
}
