import { Button } from '@nextui-org/button';
import Icon from '../Icon';

interface IServiceIcon {
  name: string;
  displayName: string;
  onClick: (e: React.MouseEvent, name: string, displayName: string) => void;
}

const ServiceIcon = ({ name, displayName, onClick }: IServiceIcon) => {
  return (
    <Button variant='faded' onClick={(e) => onClick(e, name, displayName)} className="p-[8px] w-[90px] h-[90px] m-[8px] flex-col [&>svg]:max-w-[theme(spacing.unit-16)]">
      <Icon name={name}/>
      <span className="icon-text">{displayName}</span>
    </Button>
  );
};

export default ServiceIcon;
