import { useTranslation } from 'react-i18next';

export const CustomCursor = ({ x, y, width, height }: { x?: number; y?: number; width?: number; height?: number }) => {
  return (
    <g>
      <rect x={x} y={y} width={width} height={height} rx={4} className="custom-cursor" />
    </g>
  );
};

export const CustomBarShape = ({
  x,
  y,
  width,
  height
}: {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
}) => {
  return (
    <g>
      <rect x={x} y={y} width={width} height={height} rx={4} ry={4} className="custom-bar" />
    </g>
  );
};

export const CustomTooltipBar = ({
  tooltip,
  label,
  payload
}: {
  tooltip?: { xKey: string; yKey: string };
  label?: string;
  payload?: {
    payload?: {
      username: string;
      value: number;
    };
    value: number;
  }[];
}) => {
  const { t } = useTranslation();

  if (!payload || payload.length === 0) {
    return null;
  }

  const username = payload[0].payload?.username;
  const value = payload[0].value;

  return (
    <div className="tooltip">
      <p>
        {username ?? (
          <>
            {t(`${tooltip?.xKey}`)}: <span>{label}</span>
          </>
        )}
      </p>
      <p>
        {t(`${tooltip?.yKey}`)}: <span>{value}</span>
      </p>
    </div>
  );
};

export const CustomTooltipPie = ({
  active,
  payload
}: {
  active?: boolean;
  payload?: {
    payload: {
      name: string;
      value: number;
    };
  }[];
}) => {
  if (active && payload?.length) {
    const { name, value } = payload[0].payload;

    return (
      <div className="custom-tooltip">
        <p>
          {name}: <span>{value}</span>
        </p>
      </div>
    );
  }

  return null;
};
