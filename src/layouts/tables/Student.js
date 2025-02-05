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
import { useNavigate } from "react-router-dom";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";

function Students() {
  const [students, setStudents] = useState([]);
  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [newStudent, setNewStudent] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    schoolId: "",
    board: "",
    standard: "",
    points: 0,
  });

  // Fetch students data
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch("https://api.blissiq.cloud/admin.getAll/student");
        const data = await response.json();
        if (data && data.success) {
          setStudents(data.data);
        }
      } catch (error) {
        console.error("Error fetching student data:", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchSchools = async () => {
      try {
        const response = await fetch("https://api.blissiq.cloud/admin.getAll/school");
        const data = await response.json();
        if (data && data.success) {
          setSchools(data.data);
        }
      } catch (error) {
        console.error("Error fetching schools data:", error);
      }
    };

    fetchStudents();
    fetchSchools();
  }, []);

  const toggleActiveState = async (studentId, currentState) => {
    try {
      const response = await fetch(
        `https://api.blissiq.cloud/admin.active-deactive/student/${studentId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ isActive: !currentState }),
        }
      );
      const result = await response.json();

      if (result.success) {
        setStudents((prevStudents) =>
          prevStudents.map((student) =>
            student.id === studentId ? { ...student, isActive: result.data.isActive } : student
          )
        );
      }
    } catch (error) {
      console.error("Error updating student status:", error);
    }
  };

  const toggleStatus = async (studentId, currentStatus) => {
    try {
      const newStatus = currentStatus === "approved" ? "pending" : "approved";
      const response = await fetch(
        `https://api.blissiq.cloud/admin.approve/student/${studentId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: newStatus }),
        }
      );
      const result = await response.json();

      if (result.success) {
        setStudents((prevStudents) =>
          prevStudents.map((student) =>
            student.id === studentId ? { ...student, status: result.data.status } : student
          )
        );
      }
    } catch (error) {
      console.error("Error updating student status:", error);
    }
  };

  const handleCreateStudent = async () => {
    try {
      const response = await fetch("https://api.blissiq.cloud/admin/students", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newStudent),
      });

      const result = await response.json();

      if (response) {
        // setStudents((prev) => [
        //   ...prev,
        //   {
        //     ...result.data,
        //     subRows: [],
        //   },
        // ]);
        setOpenModal(false);
        setNewStudent({
          name: "",
          phone: "",
          email: "",
          password: "",
          schoolId: "",
          board: "",
          standard: "",
          points: 0,
        });
        alert("Student created successfully!");
      } else {
        alert(result.error || "Failed to create student");
      }
    } catch (error) {
      alert("An error occurred while creating the student.");
    }
  };

  const handleUpdateStudent = async () => {
    try {
      const response = await fetch(`https://api.blissiq.cloud/admin/students/${newStudent.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newStudent),
      });

      const result = await response.json();

      if (response.ok) {
        setStudents((prevStudents) =>
          prevStudents.map((student) =>
            student.id === newStudent.id ? { ...student, ...newStudent } : student
          )
        );
        setOpenModal(false);
        setNewStudent({
          name: "",
          phone: "",
          email: "",
          password: "",
          schoolId: "",
          board: "CBSE",
          standard: "10th",
          points: 0,
        });
        alert("Student updated successfully!");
      } else {
        alert(result.error || "Failed to update student");
      }
    } catch (error) {
      alert("An error occurred while updating the student.");
    }
  };

  const handleDeleteStudent = async (studentId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this student?");
    if (confirmDelete) {
      try {
        const response = await fetch(`https://api.blissiq.cloud/admin/students/${studentId}`, {
          method: "DELETE",
        });

        const result = await response.json();

        if (result.success) {
          setStudents((prevStudents) =>
            prevStudents.filter((student) => student.id !== studentId)
          );
          alert("Student deleted successfully!");
        } else {
          alert(result.error || "Failed to delete student");
        }
      } catch (error) {
        alert("An error occurred while deleting the student.");
      }
    }
  };

  const handleInputChange = (e) => {
    setNewStudent({ ...newStudent, [e.target.name]: e.target.value });
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
                    Loading Students Data...
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
    { Header: "Name", accessor: "name" },
    { Header: "Phone", accessor: "phone" },
    { Header: "Board", accessor: "board" },
    { Header: "Standard", accessor: "standard" },
    { Header: "Points", accessor: "points" },
    { Header: "Time Spent (min)", accessor: "timeSpends" },
    { Header: "Joined Live Sessions", accessor: "joinedLiveSessions" },
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
              backgroundColor: row.original.isActive ? "#4caf50" : "#f44336",
              fontWeight: "bold",
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
              setNewStudent(row.original);
              setOpenModal(true);
            }}
          >
            Edit
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => handleDeleteStudent(row.original.id)}
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
                  Students Table
                </MDTypography>
              </MDBox>
              <MDBox pt={3} sx={{ display: "flex", flexDirection: "column", height: "400px" }}>
                <MDBox sx={{ flex: 1, overflow: "auto" }}>
                  <DataTable table={{ columns, rows: students }} isSorted={false} entriesPerPage={false} showTotalEntries={false} noEndBorder />
                </MDBox>
                <Button
                  variant="contained"
                  color="white"
                  sx={{
                    position: "absolute",
                    top: 20,
                    right: 20,
                    backgroundColor: "#f44336",
                    color: "white",
                    "&:hover": {
                      backgroundColor: "#d32f2f",
                    },
                  }}
                  onClick={() => setOpenModal(true)}
                >
                  Create Student
                </Button>
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />

      {/* Modal for creating or editing student */}
      <Dialog open={openModal} onClose={() => setOpenModal(false)}>
        <DialogTitle>{newStudent.id ? "Edit Student" : "Create Student"}</DialogTitle>
        <DialogContent>
          <TextField
            label="Name"
            fullWidth
            name="name"
            value={newStudent.name}
            onChange={handleInputChange}
            margin="normal"
          />
          <TextField
            label="Phone"
            fullWidth
            name="phone"
            value={newStudent.phone}
            onChange={handleInputChange}
            margin="normal"
          />
          <TextField
            label="Email"
            fullWidth
            name="email"
            value={newStudent.email}
            onChange={handleInputChange}
            margin="normal"
          />
          <TextField
            label="Password"
            fullWidth
            name="password"
            type="password"
            value={newStudent.password}
            onChange={handleInputChange}
            margin="normal"
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>School</InputLabel>
            <Select name="schoolId" value={newStudent.schoolId} onChange={handleInputChange}>
              {schools.map((school) => (
                <MenuItem key={school.id} value={school.id}>
                  {school.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            label="Board"
            fullWidth
            name="board"
            value={newStudent.board}
            onChange={handleInputChange}
            margin="normal"
          />
          <TextField
            label="Standard"
            fullWidth
            name="standard"
            value={newStudent.standard}
            onChange={handleInputChange}
            margin="normal"
          />
          <TextField
            label="Points"
            fullWidth
            name="points"
            type="number"
            value={newStudent.points}
            onChange={handleInputChange}
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenModal(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={newStudent.id ? handleUpdateStudent : handleCreateStudent} color="primary">
            {newStudent.id ? "Update" : "Create"}
          </Button>
        </DialogActions>
      </Dialog>
    </DashboardLayout>
  );
}

export default Students;
