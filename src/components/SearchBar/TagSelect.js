/** @format */

import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import LabelIcon from "@material-ui/icons/Label";
import Fade from "@material-ui/core/Fade";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  auto_complete: {
    width: 500,
    "& > * + *": {
      marginTop: theme.spacing(3),
    },
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  select_btn: {
    width: "100%",
    margin: 0,
  },
  modal_btn_container: {
    width: "100%",
    textAlign: "center",
  },
  modal_btn: {
    width: "50px",
    margin: 10,
  },
}));

function TagSelect(props) {
  const { allTags, selectTag, setSelectTag, findTags } = props;
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
    findTags();
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className={props.className}>
      <Button
        variant="contained"
        className={classes.select_btn}
        startIcon={<LabelIcon />}
        onClick={handleOpen}
      >
        標籤
      </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <Typography variant="h6" component="h2">
              輸入想搜尋的標籤
            </Typography>
            <div className={classes.auto_complete}>
              <Autocomplete
                multiple
                value={selectTag}
                id="tags-outlined"
                options={allTags}
                getOptionLabel={(option) => option.title}
                filterSelectedOptions
                onChange={(event, value) => {
                  setSelectTag(value);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    placeholder="Favorites"
                  />
                )}
              />
            </div>
            <div className={classes.modal_btn_container}>
              <Button
                variant="contained"
                className={classes.modal_btn}
                onClick={handleClose}
              >
                確認
              </Button>
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}

export default TagSelect;
