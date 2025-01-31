import { IData } from "../../../../hooks/useIncome/useIncome";
import { Box, Typography, useTheme } from "@mui/material";

const ShowDataBox = ({ data }: { data: { name: string, value: IData }[] }) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: "primary.main",
        borderRadius: 2,
        marginX: 2,
        padding: 2,
        [theme.breakpoints.down("sm")]: {
          padding: 1,
        },
      }}
    >
      {data &&
        data.map((element, index) => (
          <Box key={index} sx={{ marginBottom: 1 }}>
            <Typography variant="body2" color="white">
              {element.name}: {element.value.money}€ - quantità {element.value.productAmount}
            </Typography>
          </Box>
        ))
      }
    </Box>
  );
}

export default ShowDataBox;