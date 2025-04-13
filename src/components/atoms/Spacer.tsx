import { FC, useState } from "react";

interface SpacerProps {
  height: number;
}

const Spacer: FC<SpacerProps> = ({ height }) => {
  return <div className={`mt-${height}`} />;
};

export default Spacer;
