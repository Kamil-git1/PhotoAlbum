import * as React from "react"
import { DataGrid, GridToolbar } from "@mui/x-data-grid"
import Navbar from "../Navs/Navbar"
import Footer from "../Navs/Footer"
import {
 
  Alert,
  Box,
  CircularProgress,
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  Popover,
} from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import {
  addAdminUserAction,
  blockUserAction,
  deleteUserAction,
  fetchUsersList,
  removeAdminUserAction,
  unBlockUserAction,
} from "../../redux/slices/users/usersSlices"
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts"
import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router-dom"
const columns = [
  { field: "id", headerName: "ID", width: 150 },
  {
    field: "name",
    headerName: "Name",
    width: 150,
    editable: true,
  },
  {
    field: "email",
    headerName: "Email",
    width: 150,
    editable: true,
  },
  {
    field: "isAdmin",
    headerName: "isAdmin",

    width: 110,
    editable: true,
  },
  {
    field: "isBlocked",
    headerName: "isBlocked",

    width: 110,
    editable: true,
  },
]

export default function ManageUsers() {
  const [gridItemsIds, setGridItemsIds] = React.useState([])
  //dispatch
  const {t} = useTranslation()
  const dispatch = useDispatch()
  
  const navigate = useNavigate()
  //data from store
  const users = useSelector((state) => state?.users)
  const { usersList, appErr,loading, serverErr, block, unblock,  deletedUser,addedAdmin,removedAdmin,userAuth } =
    users

  //fetch all users
  React.useEffect(() => {
    dispatch(fetchUsersList())
    if(!userAuth || userAuth.isBlocked === true) return navigate("/")
  }, [dispatch,block,unblock,deletedUser,addedAdmin,removedAdmin,navigate, userAuth])

  return (
    <React.Fragment>
      <Navbar />
      <Box sx={{ minHeight: "100vh" }}>
        {loading ? (
          <Box sx={{display:"flex",justifyContent:"center"}}>
            <CircularProgress />
          </Box>
        ) : (
          <React.Fragment>
            {appErr || serverErr ? (
              <Alert
                severity="error"
                sx={{ maxHeight: "200px", width: "400px" }}
              >
                {appErr}...
                {serverErr}
              </Alert>
            ) : userAuth.isAdmin && usersList ? (
              <Box>
                <DataGrid
                  sx={{
                    mr: 5,
                    ml: 5,
                  }}
                  autoHeight
                  autoPageSize
                  rows={usersList}
                  columns={columns}
                  pageSize={9}
                  rowsPerPageOptions={[5]}
                  checkboxSelection
                  disableSelectionOnClick
                  components={{
                    Toolbar: GridToolbar,

                    Footer: function CustomToolBar() {
                      const [anchorEl, setAnchorEl] = React.useState()

                      const handleClick = (event) => {
                        setAnchorEl(event.currentTarget)
                      }

                      const handleClose = () => {
                        setAnchorEl(null)
                      }

                      const open = Boolean(anchorEl)
                      const id = open ? "simple-popover" : undefined
                      return (
                        <>
                          <IconButton
                            aria-describedby={id}
                            variant="contained"
                            onClick={handleClick}
                            color="primary"
                            sx={{ fontSize: "1.5rem" }}
                          >
                            <ManageAccountsIcon></ManageAccountsIcon>{" "}
                            {t("Manage_users")}
                          </IconButton>
                          <Popover
                            id={id}
                            open={open}
                            anchorEl={anchorEl}
                            onClose={handleClose}
                            anchorOrigin={{
                              vertical: "top",
                              horizontal: "right",
                            }}
                          >
                            <List>
                              <ListItem>
                                <IconButton
                                  color="error"
                                  size="small"
                                  onClick={() =>
                                    dispatch(deleteUserAction(gridItemsIds))
                                  }
                                >
                                  {t("Delete")}
                                </IconButton>
                              </ListItem>
                              <Divider />
                              <ListItem button divider>
                                <IconButton
                                  color="warning"
                                  size="small"
                                  onClick={() =>
                                    dispatch(blockUserAction(gridItemsIds))
                                  }
                                >
                                  {t("Block")}
                                </IconButton>
                              </ListItem>
                              <ListItem button>
                                <IconButton
                                  color="success"
                                  size="small"
                                  onClick={() =>
                                    dispatch(unBlockUserAction(gridItemsIds))
                                  }
                                >
                                  {t("Unblock")}
                                </IconButton>
                              </ListItem>
                              <Divider light />
                              <ListItem button>
                                <IconButton
                                  color="info"
                                  size="small"
                                  onClick={() =>
                                    dispatch(addAdminUserAction(gridItemsIds))
                                  }
                                >
                                  {t("Add_admin")}
                                </IconButton>
                              </ListItem>
                              <Divider />
                              <ListItem button>
                                <IconButton
                                  color="error"
                                  size="small"
                                  onClick={() =>
                                    dispatch(
                                      removeAdminUserAction(gridItemsIds)
                                    )
                                  }
                                >
                                  {t("Remove_admin")}
                                </IconButton>
                              </ListItem>
                            </List>
                          </Popover>
                        </>
                      )
                    },
                  }}
                  onSelectionModelChange={(ids) => {
                    const selectedIDs = new Set(ids)
                    //whole objects catcher
                    // const selectedRowData = usersList.filter((row) =>
                    //   selectedIDs.has(row._id)
                    // )

                    setGridItemsIds(Array.from(selectedIDs))
                  }}
                />
              </Box>
            ) : (
              <Alert
                severity="error"
                sx={{ maxHeight: "200px", width: "400px" }}
              >
                No UsersList...
              </Alert>
            )}
          </React.Fragment>
        )}
      </Box>
      <Footer />
    </React.Fragment>
  )
}
