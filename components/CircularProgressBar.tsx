import colors from "tailwindcss/colors";

const cleanPercentage = (percentage: number) => {
  const isNegativeOrNaN = !Number.isFinite(+percentage) || percentage < 0; // we can set non-numbers to 0 here
  const isTooHigh = percentage > 100;
  return isNegativeOrNaN ? 0 : isTooHigh ? 100 : +percentage;
};

const Circle = ({
  radius,
  strokeWidth,
  color,
  percentage = 100,
  animate = false,
}: {
  radius: number;
  strokeWidth: number;
  color: string;
  percentage?: number;
  animate?: boolean;
}) => {
  const circ = 2 * Math.PI * (radius - strokeWidth / 2);
  const strokePct = ((100 - percentage) * circ) / 100;

  return (
    <circle
      r={radius - strokeWidth / 2}
      cx={"50%"}
      cy={"50%"}
      fill="transparent"
      stroke={color}
      strokeLinecap="round"
      strokeWidth={strokeWidth}
      strokeDasharray={circ}
      strokeDashoffset={strokePct}
    >
      {animate ? (
        <animate
          attributeName="stroke-dashoffset"
          values={`${circ};${strokePct}`}
          dur=".5s"
          keySplines={".5 0 .5 1"}
        />
      ) : null}
    </circle>
  );
};

const Text = ({ percentage }: { percentage: number }) => {
  return (
    <text
      x="50%"
      y="50%"
      dominantBaseline="central"
      textAnchor="middle"
      className="fill-sky-500 text-xl font-semibold"
    >
      {percentage.toFixed(0)}%
    </text>
  );
};

const ProjectProgressCircle = ({
  percentage,
  radius,
  strokeWidth,
}: {
  percentage: number;
  radius: number;
  strokeWidth: number;
}) => {
  const pct = cleanPercentage(percentage);
  return (
    <svg width={"10rem"} height={"10rem"}>
      <g transform="rotate(-90 80 80)">
        <Circle
          radius={radius}
          strokeWidth={strokeWidth}
          color={colors.slate[100]}
        />
        <Circle
          radius={radius}
          strokeWidth={strokeWidth}
          color={colors.sky[500]}
          percentage={pct}
          animate
        />
      </g>
      <Text percentage={pct} />
    </svg>
  );
};

export default ProjectProgressCircle;
