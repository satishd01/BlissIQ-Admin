import { useEffect, useState } from "react";
import {
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";

function Schools() {
  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [newSchool, setNewSchool] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    address: "",
    board: "",
    staff: 0,
  });
  const [modalKey, setModalKey] = useState(0); // Key to force reset the modal

  useEffect(() => {
    fetchSchools();
  }, []);

  const fetchSchools = async () => {
    try {
      const response = await fetch("https://api.blissiq.cloud/admin.getAll/school");
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      if (data?.success) setSchools(data.data.reverse());
      setLoading(false);
    } catch (error) {
      console.error("Error fetching schools:", error);
      alert("Failed to fetch schools data. Please check your network connection and try again.");
      setLoading(false);
    }
  };

  const handleCreateSchool = async () => {
    try {
      const response = await fetch("https://api.blissiq.cloud/admin/schools", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newSchool),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const result = await response.json();
      if (response.ok) {
        setSchools([...schools, result.data]);
        setOpenModal(false);
        setNewSchool({
          name: "",
          phone: "",
          email: "",
          password: "",
          address: "",
          board: "",
          staff: 0,
        });
        setModalKey(prevKey => prevKey + 1); // Reset the modal
        alert("School created successfully!");
      } else {
        alert(result.error || "Failed to create school");
      }
    } catch (error) {
      alert("Error creating school. Please check your network connection and try again.");
    }
  };

  const handleUpdateSchool = async () => {
    try {
      const response = await fetch(
        `https://api.blissiq.cloud/admin/schools/${newSchool.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newSchool),
        }
      );
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const result = await response.json();
      if (response.ok) {
        setSchools(schools.map(s => s.id === newSchool.id ? result.data : s));
        setOpenModal(false);
        setNewSchool({
          name: "",
          phone: "",
          email: "",
          password: "",
          address: "",
          board: "",
          staff: 0,
        });
        setModalKey(prevKey => prevKey + 1); // Reset the modal
        alert("School updated successfully!");
      } else {
        alert(result.error || "Failed to update school");
      }
    } catch (error) {
      alert("Error updating school. Please check your network connection and try again.");
    }
  };

  const handleDeleteSchool = async (id) => {
    if (window.confirm("Are you sure you want to delete this school?")) {
      try {
        const response = await fetch(
          `https://api.blissiq.cloud/admin/schools/${id}`,
          {
            method: "DELETE",
          }
        );
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        if (response.ok) {
          setSchools(schools.filter(s => s.id !== id));
          alert("School deleted successfully!");
        }
      } catch (error) {
        alert("Error deleting school. Please check your network connection and try again.");
      }
    }
  };

  const toggleActiveState = async (id, currentState) => {
    try {
      const response = await fetch(
        `https://api.blissiq.cloud/admin.active-deactive/school/${id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ isActive: !currentState }),
        }
      );
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const result = await response.json();
      if (result.success) {
        setSchools(schools.map(s => s.id === id ? {...s, isActive: result.data.isActive} : s));
      }
    } catch (error) {
      console.error("Error toggling active state:", error);
      alert("Error toggling active state. Please check your network connection and try again.");
    }
  };

  const toggleStatus = async (id, currentStatus) => {
    try {
      const newStatus = currentStatus === "approved" ? "pending" : "approved";
      const response = await fetch(
        `https://api.blissiq.cloud/admin.approve/school/${id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: newStatus }),
        }
      );
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const result = await response.json();
      if (result.success) {
        setSchools(schools.map(s => s.id === id ? {...s, status: result.data.status} : s));
      }
    } catch (error) {
      console.error("Error toggling status:", error);
      alert("Error toggling status. Please check your network connection and try again.");
    }
  };

  const resetForm = () => {
    setNewSchool({
      name: "",
      phone: "",
      email: "",
      password: "",
      address: "",
      board: "",
      staff: 0,
    });
  };

  const handleInputChange = (e) => {
    setNewSchool({...newSchool, [e.target.name]: e.target.value});
  };

  if (loading) {
    return (
      <DashboardLayout>
        <DashboardNavbar />
        <MDBox pt={6} pb={3}>
          <Grid container spacing={6}>
            <Grid item xs={12}>
              <Card>
                <MDBox mx={2} mt={-3} py={3} px={2} variant="gradient" bgColor="info" borderRadius="lg" coloredShadow="info">
                  <MDTypography variant="h6" color="white">
                    Loading Schools Data...
                  </MDTypography>
                </MDBox>
              </Card>
            </Grid>
          </Grid>
        </MDBox>
        <Footer />
      </DashboardLayout>
    );
  }

  const columns = [
    { Header: "School Name", accessor: "name" },
    { Header: "Email", accessor: "email" },
    { Header: "Address", accessor: "address" },
    { Header: "Board", accessor: "board" },
    { Header: "Staff", accessor: "staff" },
    {
      Header: "Status",
      accessor: "status",
      Cell: ({ row }) => (
        <FormControlLabel
          control={
            <Switch
              checked={row.original.status === "approved"}
              onChange={() => toggleStatus(row.original.id, row.original.status)}
              color={row.original.status === "approved" ? "success" : "error"}
            />
          }
          label={row.original.status === "approved" ? "Approved" : "Pending"}
        />
      ),
    },
    {
      Header: "Active",
      accessor: "isActive",
      Cell: ({ row }) => (
        <Button
          variant="contained"
          sx={{
            backgroundColor: row.original.isActive ? "#4CAF50" : "#F44336",
            color: "white",
            "&:hover": {
              backgroundColor: row.original.isActive ? "#388E3C" : "#D32F2F",
            },
          }}
          onClick={() => toggleActiveState(row.original.id, row.original.isActive)}
        >
          {row.original.isActive ? "Active" : "Inactive"}
        </Button>
      ),
    },
    {
      Header: "Actions",
      accessor: "actions",
      Cell: ({ row }) => (
        <>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              setNewSchool(row.original);
              setOpenModal(true);
            }}
          >
            Edit
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => handleDeleteSchool(row.original.id)}
            sx={{ marginLeft: 1 }}
          >
            Delete
          </Button>
        </>
      ),
    },
  ];

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox mx={2} mt={-3} py={3} px={2} variant="gradient" bgColor="info" borderRadius="lg" coloredShadow="info">
                <MDTypography variant="h6" color="white">
                  Schools Table
                </MDTypography>
                <Button
                  variant="contained"
                  color="white"
                  sx={{
                    position: "absolute",
                    top: 20,
                    right: 20,
                    backgroundColor: "#f44336",
                    color: "white",
                    "&:hover": { backgroundColor: "#d32f2f" }
                  }}
                  onClick={() => {
                    resetForm();
                    setModalKey(prevKey => prevKey + 1); // Reset the modal
                    setOpenModal(true);
                  }}
                >
                  Create School
                </Button>
              </MDBox>
              <MDBox pt={3} sx={{ display: "flex", flexDirection: "column", height: "400px" }}>
                <MDBox sx={{ flex: 1, overflow: "auto" }}>
                  <DataTable
                    table={{ columns, rows: schools }}
                    isSorted={false}
                    entriesPerPage={false}
                    showTotalEntries={false}
                    noEndBorder
                  />
                </MDBox>
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>

      <Dialog open={openModal} onClose={() => setOpenModal(false)} key={modalKey}>
        <DialogTitle>{newSchool.id ? "Edit School" : "Create School"}</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth margin="normal"
            label="School Name"
            name="name"
            value={newSchool.name}
            onChange={handleInputChange}
          />
          <TextField
            fullWidth margin="normal"
            label="Phone"
            name="phone"
            value={newSchool.phone}
            onChange={handleInputChange}
          />
          <TextField
            fullWidth margin="normal"
            label="Email"
            type="email"
            name="email"
            value={newSchool.email}
            onChange={handleInputChange}
          />
          <TextField
            fullWidth margin="normal"
            label="Password"
            type="password"
            name="password"
            value={newSchool.password}
            onChange={handleInputChange}
          />
          <TextField
            fullWidth margin="normal"
            label="Address"
            name="address"
            value={newSchool.address}
            onChange={handleInputChange}
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Board</InputLabel>
            <Select
              name="board"
              value={newSchool.board}
              label="Board"
              onChange={handleInputChange}
            >
              <MenuItem value="CBSE">CBSE</MenuItem>
              <MenuItem value="ICSE">ICSE</MenuItem>
              <MenuItem value="State Board">State Board</MenuItem>
            </Select>
          </FormControl>
          <TextField
            fullWidth margin="normal"
            label="Staff Count"
            type="number"
            name="staff"
            value={newSchool.staff}
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenModal(false)}>Cancel</Button>
          <Button onClick={newSchool.id ? handleUpdateSchool : handleCreateSchool}>
            {newSchool.id ? "Update" : "Create"}
          </Button>
        </DialogActions>
      </Dialog>
      
      <Footer />
    </DashboardLayout>
  );
}

export default Schools;