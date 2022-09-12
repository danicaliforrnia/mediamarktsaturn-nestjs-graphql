import { Box, Button, Card, CardContent, CardHeader, Grid, TextField } from '@mui/material';
import React, { useState } from 'react';
import './App.css';

function App() {
    const [order, setOrder] = useState(null);
    return (
        <div className="App">
            <body className="app-body">
            <Card sx={{minWidth: '50vw', minHeight: '50vh'}}>
                <CardHeader
                    title=" Search Order"
                    subheader="MediaMarktSaturn"
                />
                <CardContent>
                    <Grid container direction="column" spacing={2}>
                        <Grid item container>
                            <Grid item xs={8}>
                                <TextField label="Order Number" variant="outlined" placeholder="type an order number" fullWidth/>
                            </Grid>
                            <Grid item xs={4}>
                                <Button variant="contained">Search</Button>
                            </Grid>
                        </Grid>
                        {order && <Grid item>
                            <Box
                                component="span"
                                sx={{
                                    display: 'block',
                                    p: 1,
                                    bgcolor: '#282c34',
                                    color: 'grey.300',
                                    border: '1px solid',
                                    borderColor: 'grey.800',
                                    borderRadius: 2,
                                    fontSize: '0.875rem',
                                    fontWeight: '700',
                                }}
                            >
                                block
                            </Box>
                        </Grid>}
                    </Grid>
                </CardContent>
            </Card>
            </body>
        </div>
    );
}

export default App;
