import { Button, Card, CardContent, CardHeader, Grid, TextField } from '@mui/material';
import React, { useState } from 'react';
import './App.css';
import { useLazyQuery } from '@apollo/client';
import BoxContainer from './components/BoxContainer';
import JsonText from './components/JsonText';
import { GET_ORDER_BY_ORDER_NUMBER_QUERY, OrderData, OrderVariable } from './graphql/queries';

function App() {
    const [getOrder, {loading, data, error}] = useLazyQuery<OrderData, OrderVariable>(GET_ORDER_BY_ORDER_NUMBER_QUERY);
    const [orderId, setOrderId] = useState<number>();
    return (
        <div className="App">
            <main className="app-body">
            <Card sx={{minWidth: '40vw', minHeight: '40vh'}}>
                <CardHeader
                    title=" Search Order"
                    subheader="MediaMarktSaturn"
                />
                <CardContent>
                    <Grid container direction="column" spacing={2} justifyContent="center" alignItems="center">
                        <Grid item container>
                            <Grid item xs={8}>
                                <TextField label="Order Number"
                                           variant="outlined"
                                           placeholder="type an order number"
                                           onChange={e => setOrderId(+e.target.value)}
                                           fullWidth/>
                            </Grid>
                            <Grid item xs={4}>
                                <Button variant="contained"
                                        onClick={() => getOrder({variables: {id: orderId}})}
                                        disabled={loading || !orderId}>Search</Button>
                            </Grid>
                        </Grid>
                        {loading && <Grid item>
                            <BoxContainer>
                                Loading data...
                            </BoxContainer>
                        </Grid>}
                        {data && <Grid item width="100%">
                            <BoxContainer>
                                <JsonText data={data.order}/>
                            </BoxContainer>
                        </Grid>}
                        {error && <Grid item width="100%">
                            <BoxContainer>
                                <JsonText data={error || 'Something bad happened, try again later :('}/>
                            </BoxContainer>
                        </Grid>}
                    </Grid>
                </CardContent>
            </Card>
            </main>
        </div>
    );
}

export default App;
