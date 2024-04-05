import Icon from '../Icon';

interface IServiceIcon {
  name: string;
  displayName: string;
  onClick: (e: React.MouseEvent, name: string, displayName: string) => void;
}

const ServiceIcon = ({ name, displayName, onClick }: IServiceIcon) => {
  return (
    <div onClick={(e) => onClick(e, name, displayName)} className="icon">
      <Icon name={name} />
      <div className="icon-text">{displayName}</div>
    </div>
  );
};

export default ServiceIcon;
