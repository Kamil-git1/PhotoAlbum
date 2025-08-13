import React from "react"
import { Link, useNavigate } from "react-router-dom"
import { useFormik } from "formik"
import * as Yup from "yup"
import { useDispatch, useSelector } from "react-redux"
import {
  loginUserAction,
  registerUserAction,
} from "../redux/slices/users/usersSlices"

import {
  Alert,
  Box,
  Button,
  CircularProgress,
  IconButton,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material"
import { useTranslation } from "react-i18next"
import GitHubIcon from "@mui/icons-material/GitHub"
import TwitterIcon from "@mui/icons-material/Twitter"
import FacebookIcon from "@mui/icons-material/Facebook"
import GoogleIcon from "@mui/icons-material/Google"
import { ToggleSwitch } from "../components/Navs/ToggleSwitch"
import Rules from "./Rules"

//register schema
const formSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string()
    .required("Email is required")
    .email("Invalid email format"),
  password: Yup.string().required("Password is required"),
  password2: Yup.string().required("Password2 is required"),
})
//login schema
const loginSchema = Yup.object({
  email: Yup.string()
    .required("Email is required")
    .email("Invalid email format"),
  password: Yup.string().required("Password is required"),
})

function Main() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  //dispatch
  const dispatch = useDispatch()
  //-----------------------------------------------register form
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      password2: "",
    },
    onSubmit: (values) => {
      values.password === values.password2
        ? dispatch(registerUserAction(values))
        : console.log("Passwords are not equal")
    },
    validationSchema: formSchema,
  })
  //---------------------------------------------------login form
  const formikLogin = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      dispatch(loginUserAction(values))
    },
    validationSchema: loginSchema,
  })

  //select state from store
  const storeData = useSelector((store) => store?.users)
  let { loading, appErr, serverErr, registered, userAuth } = storeData

  React.useEffect(() => {
    if (userAuth && !userAuth.isBlocked) {
      navigate("/view-collections")
    }
    if (registered) {
      window.location.reload()
    }

    return () => {}
  }, [navigate, userAuth, registered])
  // const gitHubRedirectURL = "http://localhost:5000/api/auth"
  // const path = "/"
  const github = async () => {
    window.open("http://localhost:5000/api/auth/github", "_self")
  }
  React.useEffect(() => {}, [dispatch])
  const [alignment, setAlignment] = React.useState("login")

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment)
  }

  return (
    <Box
      id="mainsection"
      sx={{
        display: "flex",
        textAlign: "center",
        height: "100vh",
        justifyContent: "center",
        padding: "80px",
      }}
    >
      <Box container>
        <ToggleButtonGroup value={alignment} exclusive onChange={handleChange}>
          <ToggleButton
            sx={{
              borderTop: "0",
              borderLeft: "0",
              borderRight: "0",
              borderRadius: "0",
            }}
            size="medium"
            value="login"
          >
            {t("Login")}
          </ToggleButton>

          <ToggleButton
            sx={{
              borderTop: "0",
              borderRight: "0",
              borderLeft: "0",
              borderRadius: "0",
            }}
            size="medium"
            value="register"
          >
            {t("Register")}
          </ToggleButton>
        </ToggleButtonGroup>

        <Box sx={{ width: "350px" }}>
          {alignment === "login" ? (
            <Box>
              <form onSubmit={formikLogin.handleSubmit}>
                <Box sx={{ m: 2 }}>
                  <p>{t("Sign_in_with")}:</p>
                  <IconButton disabled>
                    <FacebookIcon
                      fontSize="large"
                      sx={{ color: "text.secondary", m: 0.5 }}
                    />
                  </IconButton>

                  <IconButton disabled>
                    <GoogleIcon
                      fontSize="large"
                      sx={{ color: "text.secondary", m: 0.5 }}
                    />
                  </IconButton>

                  <IconButton disabled>
                    <TwitterIcon
                      fontSize="large"
                      sx={{ color: "text.secondary", m: 0.5 }}
                    />
                  </IconButton>

                  <IconButton onClick={github}>
                    <GitHubIcon
                      fontSize="large"
                      sx={{ color: "text.secondary", m: 0.5 }}
                    />
                  </IconButton>
                </Box>
                <p>{t("or")}:</p>

                <Box sx={{ m: 2 }}>
                  <TextField
                    variant="standard"
                    fullWidth
                    onChange={formikLogin.handleChange("email")}
                    value={formikLogin.values.email}
                    onBlur={formikLogin.handleBlur("email")}
                    id="loginName"
                  />
                  <p>Email</p>
                  <p style={{ fontSize: "10px", color: "red" }}>
                    {formik.touched.email && formik.errors.email}
                  </p>
                </Box>

                <Box sx={{ m: 2 }}>
                  <TextField
                    variant="standard"
                    fullWidth
                    onChange={formikLogin.handleChange("password")}
                    value={formikLogin.values.password}
                    onBlur={formikLogin.handleBlur("password")}
                    type="password"
                    id="loginPassword"
                  />
                  <p>{t("Password")}</p>
                  <p style={{ fontSize: "10px", color: "red" }}>
                    {formik.touched.password && formik.errors.password}
                  </p>
                </Box>
                {loading ? (
                  <CircularProgress />
                ) : (
                  <Button
                    type="submit"
                    variant="outlined"
                    color="inherit"
                    fullWidth
                  >
                    {t("Login")}
                  </Button>
                )}
                {appErr || serverErr ? (
                  <Alert severity="error" sx={{ maxWidth: "350" }}>
                    {appErr}...{serverErr}
                  </Alert>
                ) : null}

                <Box
                  sx={{
                    display: "flex",
                    flex: "row no-wrap",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <ToggleSwitch />

                  <Box>{t("Not_a_member")}?</Box>

                  <Link to="/view-collections">
                    <Box
                      sx={{
                        textDecorationLine: "underline",
                        color: "text.primary",
                      }}
                    >
                      {t("Continue")}
                    </Box>
                  </Link>
                </Box>
              </form>
            </Box>
          ) : (
            <Box>
              <form onSubmit={formik.handleSubmit}>
                
                <Box sx={{ m: 2 }}>
                  <TextField
                    fullWidth
                    variant="standard"
                    type="text"
                    onChange={formik.handleChange("name")}
                    value={formik.values.name}
                    onBlur={formik.handleBlur("name")}
                  />
                  <p>{t("Name")}</p>
                  <p style={{ fontSize: "10px", color: "red" }}>
                    {formik.touched.name && formik.errors.name}
                  </p>
                </Box>

                <Box sx={{ m: 2 }}>
                  <TextField
                    fullWidth
                    variant="standard"
                    value={formik.values.email}
                    onChange={formik.handleChange("email")}
                    onBlur={formik.handleBlur("email")}
                    type="email"
                  />
                  <p>Email</p>
                  <p style={{ fontSize: "10px", color: "red" }}>
                    {formik.touched.email && formik.errors.email}
                  </p>
                </Box>

                <Box sx={{ m: 2 }}>
                  <TextField
                    fullWidth
                    variant="standard"
                    type="password"
                    value={formik.values.password}
                    onChange={formik.handleChange("password")}
                    onBlur={formik.handleBlur("password")}
                  />
                  <p>{t("Password")}</p>
                  <p style={{ fontSize: "10px", color: "red" }}>
                    {formik.touched.password && formik.errors.password}
                  </p>
                </Box>

                <Box sx={{ m: 2 }}>
                  <TextField
                    variant="standard"
                    fullWidth
                    value={formik.values.password2}
                    onChange={formik.handleChange("password2")}
                    onBlur={formik.handleBlur("password2")}
                    type="password"
                  />
                  <p>
                    {t("Repeat")} {t("Password")}
                  </p>
                  <p style={{ fontSize: "10px", color: "red" }}>
                    {formik.touched.password2 && formik.errors.password2}
                  </p>
                </Box>

                {loading ? (
                  <CircularProgress />
                ) : (
                  <Rules handleSubmit={formik.handleSubmit} />
                )}
                {appErr || serverErr ? (
                  <Alert severity="error">
                    {appErr}...{serverErr}
                  </Alert>
                ) : null}
                <Box>
                  <Box
                    style={{
                      display: "flex",
                      flex: "row no-wrap",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <ToggleSwitch />

                    <Box>{t("Not_a_member")}?</Box>

                    <Link to="/view-collections">
                      <Box
                        sx={{
                          color: "text.primary",
                          textDecorationLine: "underline",
                        }}
                      >
                        {t("Continue")}
                      </Box>
                    </Link>
                  </Box>
                </Box>
              </form>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  )
}

export default Main
