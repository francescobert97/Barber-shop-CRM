import { Services } from "../../shared/models/datacustomer.model";
import { Box, Typography } from "@mui/material";

const CmTooltip = ({ services }: { services: Services[] }) => {
  const renderServices = (services: Services[]) => {
    return (
      <Box
        className="position-absolute start-50 translate-middle-x"
        sx={{
          backgroundColor: "primary.main",
          borderRadius: 2,
          color: "white",
          padding: 2,
          width: { xs: "90%", sm: "auto" },
          maxWidth: "300px",
          boxShadow: 3,
          textAlign: "left",
        }}
      >
        {services.map((service, index) => (
          <Box key={index} className="d-flex flex-column gap-2">
            <Typography variant="body2"><strong>Tipo:</strong> {service.type}</Typography>
            <Typography variant="body2"><strong>Prezzo:</strong> {service.price}&euro;</Typography>
            <Typography variant="body2"><strong>Stato:</strong> {service.status}</Typography>
            {index < services.length - 1 && <hr className="my-2" />}
          </Box>
        ))}
      </Box>
    );
  };

  return renderServices(services);
};

export default CmTooltip;