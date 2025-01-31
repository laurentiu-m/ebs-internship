// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const CustomCursor = ({ x, y, width, height }: any) => {
  return (
    <g>
      <rect x={x} y={y} width={width} height={height} rx={4} className="custom-cursor" />
    </g>
  );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const CustomBarShape = ({ x, y, width, height }: any) => {
  return (
    <g>
      <rect x={x} y={y} width={width} height={height} rx={4} ry={4} className="custom-bar" />
    </g>
  );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const CustomTooltip = ({ tooltip, label, payload }: any) => {
  if (!payload || payload.length === 0) {
    return null;
  }

  const username = payload[0].payload.username;

  return (
    <div className="tooltip">
      <p>
        {username ? username : tooltip.xKey}: <span>{label}</span>
      </p>
      <p>
        {tooltip.yKey}: <span>{payload[0].value}</span>
      </p>
    </div>
  );
};
