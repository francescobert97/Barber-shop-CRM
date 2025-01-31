import { useEffect, useRef, useState } from "react";
import { useIncome } from "../../hooks/useIncome/useIncome";
import Chart from "../../components/chart/Chart";
import { TextField, Grid, Box, Typography } from "@mui/material";
import ShowDataBox from "./components/show-data-box/ShowDataBox";
import { DATA_SUMMARY_FALL, IDataSummary } from "../../shared/models/periodfilter.model";

function Home() {
    const {getGeneralBalanceStatus} = useIncome();
    const [data, setData] = useState<IDataSummary>({...DATA_SUMMARY_FALL});
    const isInitialized = useRef(false);

    useEffect(() => {
        if (isInitialized.current) return;
        isInitialized.current = true;

        const { PeriodMode, TotalMode } = getGeneralBalanceStatus({ mode: 'All' }, 30);
        setData({
            TotalMode: TotalMode,
            PeriodMode: PeriodMode
        });    }, [getGeneralBalanceStatus]);

    const changePeriodTime = (day: number) => {
        const newPulledData = getGeneralBalanceStatus({ mode: 'All', updating: true }, day);
        setData(prev => ({ ...prev, PeriodMode: { ...newPulledData.PeriodMode } }));
    };

    return (
        <Box sx={{ padding: 2 }}>
            <Typography variant="h4" gutterBottom align="center" color="textPrimary">
                Controllo bilancio
            </Typography>
            
            <Grid container spacing={2} justifyContent="center">
                <Grid item xs={12} sm={6} md={5}>
                    {data.PeriodMode && 
                        <ShowDataBox 
                            data={Object.entries(data.PeriodMode).map(([key, value]) => ({ name: key, value: value }))} 
                        />
                    }
                </Grid>

                <Grid item xs={12} sm={6} md={5}>
                    {data.TotalMode && 
                        <ShowDataBox 
                            data={Object.entries(data.TotalMode).map(([key, value]) => ({ name: key, value: value }))} 
                        />
                    }
                </Grid>
            </Grid>

            <Grid container spacing={2} justifyContent="center" sx={{ marginTop: 4 }}>
                <Grid item xs={12} sm={6} md={5}>
                    <Typography variant="body1" color="textPrimary">
                        Bilancio periodizzato (default mensile):
                    </Typography>
                    <Box sx={{ marginTop: 2 }}>
                        <TextField
                            id="outlined-basic"
                            type="number"
                            label="Inserisci un numero"
                            variant="outlined"
                            onChange={(event) => {
                                const value = Number(event.target.value);
                                changePeriodTime(value);
                            }}
                            fullWidth
                        />
                    </Box>
                    <Box sx={{ marginTop: 2 }}>
                        {data.PeriodMode && (
                            <Grid container spacing={2} justifyContent="center">
                                <Grid item xs={12} sm={6} md={6}>
                                    <Chart 
                                        data={Object.entries(data.PeriodMode).map(([key, value]) => ({ name: key, value: value.money }))}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6} md={6}>
                                    <Chart 
                                        data={Object.entries(data.PeriodMode).map(([key, value]) => ({ name: key, value: value.productAmount }))}
                                    />
                                </Grid>
                            </Grid>
                        )}
                    </Box>
                </Grid>
            </Grid>

            <Grid container spacing={2} justifyContent="center" sx={{ marginTop: 4 }}>
                <Grid item xs={12} sm={6} md={5}>
                    <Typography variant="body1" color="textPrimary">
                        Entrate totali:
                    </Typography>
                    <Box sx={{ marginTop: 2 }}>
                        {data.TotalMode && (
                            <Grid container spacing={2} justifyContent="center">
                                <Grid item xs={12} sm={6} md={6}>
                                    <Chart 
                                        data={Object.entries(data.TotalMode).map(([key, value]) => ({ name: key, value: value.money }))}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6} md={6}>
                                    <Chart 
                                        data={Object.entries(data.TotalMode).map(([key, value]) => ({ name: key, value: value.productAmount }))}
                                    />
                                </Grid>
                            </Grid>
                        )}
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
}

export default Home;
