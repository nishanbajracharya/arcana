import React from 'react';

import './style.css';
import manifest from '../../manifest';
import ServiceIcon from '../ServiceIcon';

interface IServicePane {
  onClick: (e: React.MouseEvent, name: string, displayName: string) => void;
}

const ServicePane = ({ onClick }: IServicePane) => {
  return (
    <div className="container-service_pane">
      <div className="my-4"><strong>{manifest.title}</strong></div>
      {manifest.sections.map((section, key) => (
        <div className="section" key={key}>
          <h2>{section.title}</h2>
          <div className="services">
            {section.services.map((service, key) => (
              <ServiceIcon key={key} name={service.name} displayName={service.displayName} onClick={onClick} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ServicePane;
