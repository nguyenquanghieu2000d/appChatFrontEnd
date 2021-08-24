import React, {useEffect} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import MuiAlert from "@material-ui/lab/Alert";
import {UserApi} from "../../api/UserApi";
import {useToasts} from 'react-toast-notifications';
import {useNavigate} from "react-router-dom";
import { useCookies } from 'react-cookie';
function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                Nguyễn Quang Hiếu
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
        width: '100vw'
    },
    image: {
        backgroundImage: 'url(https://source.unsplash.com/random)',
        backgroundRepeat: 'no-repeat',
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    paper: {
        margin: theme.spacing(8, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function LoginForm() {
    const classes = useStyles();
    const {addToast} = useToasts();
    const [username, setUsername] = React.useState("quanghieu333");
    const [password, setPassword] = React.useState("quanghieu12345");
    const navigate = useNavigate()
    const [cookies, setCookie] = useCookies(['user']);

    const onChangeUsername = (e) => {
        setUsername(e.target.value)
    }

    const onChangePassword = (e) => {
        setPassword(e.target.value)
    }

    const [open, setOpen] = React.useState(false);

    const isLogin = () => {
        if(cookies.user !== undefined)
            navigate("/message")
    }

    const handleClick = async (e) => {
        e.preventDefault();
        const data = {
            "username": username,
            "password": password
        }
        try {
            const response = await UserApi.login(data)
            const t = new Date();
            t.setSeconds(t.getSeconds() + 1000);
            setCookie('user', response, {expires: t})
            addToast("Đăng nhập thành công", {appearance: 'success'});
            navigate("/message")
        } catch (error) {
            addToast(error.response.data, {appearance: 'error'});
        }
    };


    useEffect(() => {
        isLogin()
    }, []);


    return (
        <Grid container component="main" className={classes.root}>
            <CssBaseline/>

            {/*Snackbar start*/}

            {/*<Alert severity="error">This is an error message!</Alert>*/}
            {/*<Alert severity="warning">This is a warning message!</Alert>*/}
            {/*<Alert severity="info">This is an information message!</Alert>*/}
            {/*<Alert severity="success">This is a success message!</Alert>*/}
            {/*Snackbar end*/}

            <Grid item xs={false} sm={4} md={7} className={classes.image}/>
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon/>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Đăng nhập
                    </Typography>
                    <form className={classes.form} noValidate>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Tài khoản"
                            name="email"
                            value={username}
                            onChange={onChangeUsername}
                            autoComplete="email"
                            autoFocus
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"

                            value={password}
                            label="Mật khẩu"
                            type="password"
                            id="password"
                            onChange={onChangePassword}
                            autoComplete="current-password"
                        />
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary"/>}
                            label="Remember me"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            onClick={handleClick}
                            className={classes.submit}
                        >
                            Đăng nhập
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link onClick={isLogin} href="#" variant="body2">
                                    Quên mật khẩu ?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="#" variant="body2">
                                    {"Không có tài khoản ? Hãy đăng ký"}
                                </Link>
                            </Grid>
                        </Grid>
                        <Box mt={5}>
                            <Copyright/>
                        </Box>
                    </form>
                </div>
            </Grid>
        </Grid>
    );
}