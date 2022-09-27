import ChipProps from "./ChipProps";
import StyledChip from "./StyledChip";

export default function Chip({ title, ...props }: ChipProps) {
  return (
    <StyledChip size="xs" {...props}>
      {title}
    </StyledChip>
  );
}
