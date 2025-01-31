import { Services } from "../../shared/models/datacustomer.model";



const CmTooltip = ({services}:{services:Services[]}) => {


  const renderServices = (services:Services[]) => {
    return (
      <div className='position-absolute bg-primary rounded start-50 text-light p-3'>
        {services.map((service, index) => (
          <div key={index} className='d-flex gap-3'>
            <p><strong>Tipo:</strong> {service.type},</p>
            <p><strong>Prezzo:</strong>{service.price}&euro;,</p>
            <p><strong>Stato:</strong> {service.status}</p>
            <hr />
          </div>
        ))}
      </div>
    );
  };

  return (
   renderServices(services)
  );
};

export default CmTooltip;
