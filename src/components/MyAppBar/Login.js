import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
// import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { checkUser } from "../../axios.js";
import sha256 from "../../Mysha256.js";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function Login(props) {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle, setModalStyle] = useState(getModalStyle);
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [correct, setCorrect] = useState(true);

  const handleOpen = () => {
    props.setOpen(true);
  };

  const handleClose = () => {
    props.setOpen(false);
  };

  const handleSignIn = (e) => {
    e.preventDefault();
    checkUser(id, sha256(password)).then((result) => {
      if (result !== 0) {
        setCorrect(true);
        props.setUser(result);
        props.setMyCourse(JSON.parse(result.courses));
      } else {
        setPassword("");
        setCorrect(false);
      }
    });
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <form className={classes.form} noValidate>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="id"
          label="學號"
          name="id"
          autoComplete="id"
          autoFocus
          onInput={(e) => setId(e.target.value)}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          error={!correct}
          fullWidth
          name="password"
          label="密碼"
          type="password"
          id="password"
          autoComplete="current-password"
          onInput={(e) => setPassword(e.target.value)}
          value={password}
          helperText={correct ? "" : "Incorrect Id or password"}
          onClick={() => setCorrect(true)}
        />
        <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label="Remember me"
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          // className={classes.submit}
          onClick={handleSignIn}
        >
          Sign In
        </Button>
        <Grid container>
          <Grid item xs>
            <Link href="#" variant="body2">
              Forgot password?
            </Link>
          </Grid>
          {/* <Grid item>
            <Link
              href="#"
              variant="body2"
              onClick={() => {
                props.setSignIn(false);
              }}
            >
              {"Don't have an account? Sign Up"}
            </Link>
          </Grid> */}
        </Grid>
      </form>
    </div>
  );

  return (
    <div>
      <Button variant="contained" onClick={handleOpen}>
        Login
      </Button>
      <Modal
        open={props.open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
}

export default Login;
