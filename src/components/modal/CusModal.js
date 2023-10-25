import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import TextField from '@material-ui/core/TextField'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'


const CusModal = (props) => {




  return (
    <div>

      <Dialog
        hideBackdrop
        disableEnforceFocus
        open={props.open}
        className='my-modal'
        onClose={props.handleClose}
        // PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
        disableBackdropClick
      >
        <DialogTitle style={{fontSize:'14px'}} id="draggable-dialog-title">جستجوی پیشرفته</DialogTitle>
        <DialogContent>
          {props.children}
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleClose} color="primary">
            انصراف
          </Button>
          <Button onClick={props.submitSearch} color="info" variant='contained' disableElevation>
            جستجو
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}


export default CusModal
