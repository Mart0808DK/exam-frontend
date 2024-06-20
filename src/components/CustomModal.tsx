import React from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

type ModalProps = {
    isOpen: boolean;
    onRequestClose: () => void;
    children: React.ReactNode;
}

function CustomModal({ isOpen, onRequestClose, children }: ModalProps) {
    return (
        <Modal
            open={isOpen}
            onClose={onRequestClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 400,
                bgcolor: 'background.paper',
                border: '2px solid #000',
                boxShadow: 24,
                p: 6,
                display: 'flex', // Tilføj denne linje
                flexDirection: 'column', // Tilføj denne linje
                justifyContent: 'center', // Tilføj denne linje
                alignItems: 'center', // Tilføj denne linje
            }}>
                <Typography id="modal-modal-title" variant="h6" component="h2">

                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2, }}>
                    {children}
                </Typography>
            </Box>
        </Modal>
    );
}

export default CustomModal;