/*
By Ahmed Al-Gehzi based on the given source
 */
//Source : https://mui.com/components/dialogs/

import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function AlertDialog({open,message,onOk,onCancel}) {
    const [openInner, setOpen] = React.useState(open);
    //const [messageInner, setMsg] = React.useState("");

    const handleClickOpen = () => {

    };


    return (
        <div>
            <Dialog
                open={open}
                onClose={onCancel}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {""}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {message}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onCancel}>Disagree</Button>
                    <Button onClick={onOk}>
                        Agree
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
