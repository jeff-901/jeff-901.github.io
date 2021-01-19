/** @format */

// import React from "react";

// function TimeSelect(props) {
//   //props.setTimeFilter
//   return (
//     <div className="time-select-container">
//       Times
//       <button id="choose-time-button">choose time</button>
//     </div>
//   );
// }
// export default TimeSelect;

import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import Fade from "@material-ui/core/Fade";
import TimeTable from "./TimeTable";
// import CancelIcon from "@material-ui/icons/Cancel";
// import IconButton from "@material-ui/core/IconButton";
// import Icon from "@material-ui/core/Icon";

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
  // cancel_btn_container: {
  //   width: "100%",
  //   textAlign: "right",
  // },
  modal_btn_container: {
    width: "100%",
    textAlign: "center",
  },
  modal_btn: {
    width: "50px",
    margin: 10,
  },
}));

function TimeSelect(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const resetTime = () => {
    const times = [];
    let day = [];
    for (let i = 0; i < 15; i++) {
      day.push(false);
    }
    for (let i = 0; i < 6; i++) {
      times.push(day);
    }
    props.setTimeFilter(times);
  };

  return (
    <div className="time-select-container">
      {/* <button type="button" onClick={handleOpen}>
        react-transition-group
      </button> */}
      <Button
        variant="contained"
        className={classes.select_btn}
        startIcon={<CalendarTodayIcon />}
        onClick={handleOpen}
      >
        選擇時間
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
            {/* <div className={classes.cancel_btn_container}>
              <IconButton>
                <CancelIcon />
              </IconButton>
            </div> */}
            <TimeTable
              timeFilter={props.timeFilter}
              setTimeFilter={props.setTimeFilter}
            />
            <div className={classes.modal_btn_container}>
              <Button
                variant="contained"
                className={classes.modal_btn}
                onClick={handleClose}
              >
                確認
              </Button>
              <Button
                variant="contained"
                className={classes.modal_btn}
                onClick={resetTime}
              >
                清除
              </Button>
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}

export default TimeSelect;
