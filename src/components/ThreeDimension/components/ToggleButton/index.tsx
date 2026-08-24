import { Button } from '@/components/ui/button';

type TToggleButtonProps = Readonly<{
  isOn: boolean;
  isDisabled?: boolean;
  color: string;
  handleClick: () => void;
}>;

export function ToggleButton({ isOn, isDisabled = false, color, handleClick }: TToggleButtonProps) {
  return (
    <Button
      type="button"
      size="sm"
      variant={isOn ? 'default' : 'outline'}
      disabled={isDisabled}
      onClick={handleClick}
      style={
        isOn
          ? { backgroundColor: color, borderColor: color, color: '#fff' }
          : { color, borderColor: color }
      }
    >
      {isOn ? 'On' : 'Off'}
    </Button>
  );
}
