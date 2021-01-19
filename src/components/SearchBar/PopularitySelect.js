/** @format */

import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import WhatshotIcon from "@material-ui/icons/Whatshot";
import Fade from "@material-ui/core/Fade";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";

const useStyles = makeStyles((theme) => ({
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
  slider_container: {
    width: 300,
    margin: 10,
  },
}));

const marks = [
  {
    value: 0,
    label: "0",
  },
  {
    value: 100,
    label: "100",
  },
  {
    value: 200,
    label: "200",
  },
  {
    value: 300,
    label: "300",
  },
  {
    value: 400,
    label: "400",
  },
  {
    value: 500,
    label: "500以上",
  },
];

function valuetext(value) {
  return `${value}人`;
}

function PopularitySelect(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className={props.className}>
      <Button
        variant="contained"
        className={classes.select_btn}
        startIcon={<WhatshotIcon />}
        onClick={handleOpen}
      >
        熱度
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
            <div className={classes.slider_container}>
              <Typography id="discrete-slider-custom" gutterBottom>
                初選人數
              </Typography>
              <Slider
                defaultValue={0}
                getAriaValueText={valuetext}
                aria-labelledby="discrete-slider-custom"
                step={100}
                valueLabelDisplay="auto"
                marks={marks}
                min={0}
                max={500}
              />
            </div>

            {/* <div className={classes.slider_container}>
              <Typography id="discrete-slider-custom" gutterBottom>
                討論熱度
              </Typography>
              <Slider
                defaultValue={0}
                getAriaValueText={valuetext}
                aria-labelledby="discrete-slider-custom"
                step={100}
                valueLabelDisplay="auto"
                marks={marks}
                min={0}
                max={500}
              />
            </div> */}

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

export default PopularitySelect;
