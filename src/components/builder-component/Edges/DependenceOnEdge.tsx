import { useMantineTheme } from '@mantine/core';
import { BaseEdge, getSmoothStepPath } from '@xyflow/react';

export default function DependenceOnEdge(props) {
  const { id,
    sourceX,
    sourceY,
    targetX,
    targetY,
    markerEnd,
    selected } = props;
  const [edgePath] = getSmoothStepPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
  });
  const { colors } = useMantineTheme();

  return (
    <>
      <BaseEdge
        id={id}
        path={edgePath}
        markerEnd={markerEnd}
        style={{ stroke: selected ? colors.activeLinkBgColor[9] : colors.primary[9], strokeWidth: 1 }}
      />
    </>
  );
}
