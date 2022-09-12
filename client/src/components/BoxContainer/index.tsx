import { Box } from '@mui/material';
import React from 'react';

export type BoxTextProps = {
    children: React.ReactNode;
}

const BoxContainer = ({children}: BoxTextProps) => (
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
        {children}
    </Box>
);

export default BoxContainer;
