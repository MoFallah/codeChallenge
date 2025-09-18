import { type FC } from "react";
import { SpinnerWrapper } from "./Spinner.styles";
import { Centered } from "../../styles/styled-components";

interface SpinnerProps {
  size?: number;
  color?: string;
}

const Spinner: FC<SpinnerProps> = ({ size = 40, color = "var(--primary-color)" }) => (
  <Centered>
    <SpinnerWrapper size={size} color={color} role="status" aria-label="Loading" />
  </Centered>
);
export default Spinner;

