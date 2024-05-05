import * as React from 'react';
import Button from '@mui/material/Button';
import { SnackbarProvider, useSnackbar } from 'notistack';

function MyApp({addClick}) {
    const { enqueueSnackbar } = useSnackbar();

    const handleClickVariant = (variant) => () => {
        enqueueSnackbar('Thêm sản phẩm thành công!', { variant });
    };

    return (
        <React.Fragment>
            <Button onClick={handleClickVariant('success')}>Add</Button>
        </React.Fragment>
    );
}

export default function IntegrationNotistack() {
    return (
        <SnackbarProvider maxSnack={4}>
            <MyApp />
        </SnackbarProvider>
    );
}