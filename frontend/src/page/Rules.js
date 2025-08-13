import * as React from "react"
import Button from "@mui/material/Button"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogContentText from "@mui/material/DialogContentText"
import DialogTitle from "@mui/material/DialogTitle"
import useMediaQuery from "@mui/material/useMediaQuery"
import { useTheme } from "@mui/material/styles"
import { useTranslation } from "react-i18next"

export default function Rules({ handleSubmit }) {
  const [open, setOpen] = React.useState(false)
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"))
  const { t } = useTranslation()
  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <div>
      <Button
        variant="outlined"
        color="inherit"
        fullWidth
        onClick={handleClickOpen}
      >
        {t("Register")}
      </Button>
      <Dialog fullScreen={fullScreen} open={open} onClose={handleClose}>
        <DialogTitle></DialogTitle>
        <DialogContent>
          <DialogContentText>
            {t("Rules")}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="error" autoFocus onClick={handleClose}>
            {t("Disagree")}
          </Button>
          <Button
            type="submit"
            color="success"
            onClick={handleSubmit}
            autoFocus
          >
            {t("Agree")}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
