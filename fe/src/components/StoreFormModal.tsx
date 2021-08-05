import React from 'react';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import { useStoreForm } from '../hooks/store';

import type { EditableStoreProperties } from '../types/store';


/* Component */
function StoreFormModal() {
  const {isOpen, updateStoreFormInput, addNewStore, closeStoreRegistrationModal} = useStoreForm();

  /* 닫기 토글 핸들러 */
  const handleClose = () => {
    closeStoreRegistrationModal();
  };
  
  /* 기본정보 입력 핸들러 */
  const handleChangeInput = (input: { key: keyof EditableStoreProperties; value: any; }) => {
    updateStoreFormInput({ [input.key]: input.value });
  };

  /* 식당 등록 핸들러 */
  const handleSubmit = () => addNewStore();

  return (
    <div>
      <Dialog open={isOpen} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Store Register</DialogTitle>
        <DialogContent>
          <DialogContentText>
            등록할 식당의 기본정보를 입력해주세요.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="store-name"
            type="text"
            fullWidth
            onChange={(ev) => handleChangeInput({ key: 'name', value: ev.target.value })}
          />
          <TextField
            autoFocus
            margin="dense"
            id="description"
            label="store-description"
            type="text"
            fullWidth
            onChange={(ev) => handleChangeInput({ key: 'description', value: ev.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="default">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default StoreFormModal;
