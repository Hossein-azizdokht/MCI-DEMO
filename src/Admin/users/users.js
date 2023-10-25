import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../../redux/users/usersActions";
import { DataGrid, faIR } from "@mui/x-data-grid";
import { createFakeServer } from "@mui/x-data-grid-generator";
import {
  ArrowBackIos,
  ArrowForwardIos,
  Delete,
  DragHandle,
  ListAltOutlined,
  Refresh,
  RefreshRounded,
  Search,
} from "@material-ui/icons";
import CusModal from "../../components/modal/CusModal";
import { Box, Button, Typography } from "@material-ui/core";
import { Grid, MenuItem, Select } from "mui-core";

const { initialState } = createFakeServer();

const Users = () => {
  // -- Redux --------------------------------
  const dispatch = useDispatch();
  const allUsersData = useSelector((state) => state.allUsers);
  const { allUsers } = allUsersData;
  const usersDataa = allUsers;
  const usersTotal = allUsers.totalCount;

  // -- states --------------------------------
  const [open, setopen] = useState(false);
  const [rows, setRows] = useState([]);
  const [loadings, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(50);
  const [filters, setFilters] = useState([]);

  useEffect(() => {
    let active = true;
    (async () => {
      setLoading(true);
      const userRows = await loadServerRows(page, usersDataa);
      if (!active) {
        return;
      }
      setRows(userRows);
      setLoading(false);
    })();

    return () => {
      active = false;
    };
  }, [page, allUsers]);

  // -- grid columns ----------------------------------------------------
  const columns = [
    {
      field: "id",
      hide: true,
    },
    {
      field: "name",
      headerName: "عنوان خبر",
      width: "450",
    },
    {
      field: "username",
      headerName: "تاریخ انتشار",
      flex: "auto",
      width: "150",
    },
    {
      field: "email",
      headerName: "ویرایش",
      width: "150",
    },
    {
      field: "phone",
      headerName: "حذف",
      width: "150",
    },
  ];

  function loadServerRows(page, newsDataa) {
    return new Promise((resolve) => {
      if (newsDataa) {
        resolve(newsDataa);
      }
    });
  }

  useEffect(() => {
    let active = true;
    (async () => {
      setLoading(true);
      const userRows = await loadServerRows(page, usersDataa);
      if (!active) {
        return;
      }
      setRows(userRows);
      setLoading(false);
    })();

    return () => {
      active = false;
    };
  }, [page, allUsers]);

  useEffect(() => {
    dispatch(fetchUsers(page + 1));
  }, [page]);

  const getData = () => {
    dispatch(fetchUsers())
  };

  // -- page change handler --------------------------------
  const handlePageChange = (event) => {
    setPage(event);
  };

  // -- open modal handler --------------------------------
  const handleClickOpen = () => {
    setopen(true);
  };
  // -- close modal handler --------------------------------
  const handleClose = () => {
    setopen(false);
  };
  // -- search submit handler --------------------------------
  const submitSearch = () => {
    debugger;
    const f = rows.filter((s) =>
      filters.every((a) =>
        a.if === 10
          ? s[a.name] > a.value
          : a.if === 20
          ? s[a.name] < a.value
          : a.if === 30
          ? s[a.name] == a.value
          : false
      )
    );
    // Log to console
    setRows(f);
    if (f.length <= 0) {
      dispatch(fetchUsers);
    }
    setopen(false);
    console.log(f);
    // console.log(filters);
  };

  // -- form filter change handler --------------------------------
  const handleChange = (e, i) => {
    let { name, value } = e.target;
    let newData = [...filters];
    newData[i] = {
      ...newData[i],
      [name]: value,
    };
    console.log(newData);
    setFilters(newData);
  };

  // -- Add row handler --------------------------------
  const handleAddFilter = () => {
    setFilters((prevFilters) => [
      ...prevFilters,
      { name: "", value: "", if: "" },
    ]);
  };

  // -- Remove handler --------------------------------
  const handleRemoveSpecificFilter = (i) => () => {
    let clonedData = [...filters];
    clonedData.splice(i, 1);
    setFilters(clonedData);
  };

  return (
    <>
      <Box>
        <Grid container>
          <Box sx={{ p: 2, pb: 0, width: "100%" }}>
            <Typography>
              <ListAltOutlined style={{ marginLeft: "8px" }} />
              لیست کاربران
            </Typography>
            <hr />
          </Box>
        </Grid>
      </Box>

      <div className="page-toolbar p-2">
        <Button
          variant="contained"
          disableElevation
          onClick={() => {
            setopen(true);
          }}
        >
          <Search />
          جستجو
        </Button>
        <Button variant="outlined" color="warning" onClick={getData}>
          <RefreshRounded />
          فراخوانی مجدد دیتا
        </Button>
      </div>

      <CusModal
        open={open}
        setModalOpen={setopen}
        handleClickOpen={handleClickOpen}
        handleClose={handleClose}
        submitSearch={submitSearch}
      >
        <div>
          <div className="">
            <div className="row">
              <div className="col-md-12 column">
                <table
                  className="table table-bordered table-hover"
                  style={{ width: "550px" }}
                  id="tab_logic"
                >
                  <thead>
                    <tr>
                      <th className="text-center font-italic"> نام فیلتر </th>
                      <th className="text-center font-italic"> شرط </th>
                      <th className="text-center font-italic"> مقدار </th>
                      <th className="text-center font-italic"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {filters?.map((item, i) => (
                      <tr key={i}>
                        <td>
                          <input
                            type="text"
                            name="name"
                            autoComplete="off"
                            value={filters[i].name}
                            onChange={(e) => handleChange(e, i)}
                            className="form-control"
                          />
                        </td>
                        <td>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={filters[i].if}
                            name="if"
                            label="if"
                            variant="default"
                            onChange={(e) => handleChange(e, i)}
                          >
                            <MenuItem value={10}>
                              <ArrowBackIos />
                            </MenuItem>
                            <MenuItem value={20}>
                              <ArrowForwardIos />
                            </MenuItem>
                            <MenuItem value={30}>
                              <DragHandle />
                            </MenuItem>
                          </Select>
                        </td>
                        <td>
                          <input
                            name="value"
                            value={filters[i].value}
                            onChange={(e) => handleChange(e, i)}
                            className="form-control"
                          />
                        </td>
                        <td className="text-center">
                          <Button
                            color="error"
                            onClick={handleRemoveSpecificFilter(i)}
                          >
                            <Delete />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <Button color="warning" disableElevation variant="outlined" onClick={handleAddFilter}>افزودن فیلتر</Button>
              </div>
            </div>
          </div>
        </div>
      </CusModal>

      <DataGrid
        rows={rows}
        rowCount={usersTotal}
        loading={loadings}
        rowsPerPageOptions={[50]}
        pagination
        page={page}
        pageSize={9}
        getRowId={(row) => row.id}
        localeText={faIR.components.MuiDataGrid.defaultProps.localeText}
        paginationMode="server"
        onPageChange={(newPage) => handlePageChange(newPage)}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        columns={columns}
        initialState={initialState}
        components={{
          NoRowsOverlay: () => (
            <div>
              <Box sx={{ mt: 1 }}>هیچ داده وجود ندارد</Box>
            </div>
          ),
          NoResultsOverlay: () => (
            <div>
              <Box sx={{ mt: 1 }}>هیچ داده وجود ندارد</Box>
            </div>
          ),
        }}
      />
    </>
  );
};

export default Users;
