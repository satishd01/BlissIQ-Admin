import React, { useEffect, useState } from "react";
import axios from "axios";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// BLISSIQ ADMIN React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import MDBadge from "components/MDBadge";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";

// Importing the same design components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";

export default function GradeTable() {
  const [grades, setGrades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchUniversityId, setSearchUniversityId] = useState(""); // Search by universityId
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentGrade, setCurrentGrade] = useState(null); // Current grade being updated

  // Fetch grades based on universityId
  const fetchGrades = async () => {
    try {
      const query = searchUniversityId ? `?universityId=${searchUniversityId}` : "";
      const response = await axios.get(`https://api.blissiq.cloud/admin/grade${query}`);
      if (response.data.success) {
        setGrades(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching grades:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle delete action
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this grade?");
    if (confirmDelete) {
      try {
        const response = await axios.delete(`https://api.blissiq.cloud/admin/grade/${id}`);
        if (response.data.success) {
          setGrades(grades.filter((grade) => grade.id !== id));
          alert("Grade deleted successfully!");
        }
      } catch (error) {
        console.error("Error deleting grade:", error);
        alert("Failed to delete the grade.");
      }
    }
  };

  // Open modal with grade details for updating
  const handleUpdate = (grade) => {
    setCurrentGrade(grade);
    setIsModalOpen(true);
  };

  // Close modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentGrade(null);
  };

  // Handle input change in modal
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCurrentGrade({ ...currentGrade, [name]: value });
  };

  // Handle form submission to update grade
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    if (!currentGrade) return;

    try {
      const response = await axios.put(`https://api.blissiq.cloud/admin/grade/${currentGrade.id}`, {
        name: currentGrade.name,
      });

      if (response.data.success) {
        setGrades(
          grades.map((grade) =>
            grade.id === currentGrade.id ? { ...grade, name: currentGrade.name } : grade
          )
        );
        alert("Grade updated successfully!");
        handleCloseModal();
      } else {
        alert("Failed to update grade.");
      }
    } catch (error) {
      console.error("Error updating grade:", error);
      alert("Failed to update grade.");
    }
  };

  // Handle search input change
  const handleSearchChange = (event) => {
    setSearchUniversityId(event.target.value);
  };

  useEffect(() => {
    fetchGrades();
  }, [searchUniversityId]); // Fetch grades whenever searchUniversityId changes

  if (loading) {
    return (
      <MDTypography variant="h6" color="text">
        Loading...
      </MDTypography>
    );
  }

  // Columns structure for the grades table (same as University Table)
  const columns = [
    { Header: "ID", accessor: "id", align: "left" },
    { Header: "Name", accessor: "name", align: "left" },
    { Header: "Status", accessor: "isActive", align: "center" },
    { Header: "Created At", accessor: "createdAt", align: "center" },
    {
      Header: "Actions",
      Cell: ({ row }) => (
        <MDBox display="flex" justifyContent="center">
          <MDButton
            variant="outlined"
            color="info"
            size="small"
            onClick={() => handleUpdate(row.original)} // Pass the whole row for editing
            style={{ marginRight: "8px" }}
          >
            Edit
          </MDButton>
          <MDButton
            variant="outlined"
            color="error"
            size="small"
            onClick={() => handleDelete(row.original.id)} // Delete grade by ID
          >
            Delete
          </MDButton>
        </MDBox>
      ),
    },
  ];

  // Prepare the rows for the table (same as University Table)
  const rows = grades.map((grade) => ({
    id: grade.id,
    name: grade.name,
    isActive: grade.isActive ? (
      <MDBadge badgeContent="Active" color="success" variant="gradient" size="sm" />
    ) : (
      <MDBadge badgeContent="Inactive" color="error" variant="gradient" size="sm" />
    ),
    createdAt: new Date(grade.createdAt).toLocaleDateString(),
    actions: "", // Actions are handled by the column above
  }));

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <MDTypography variant="h4" gutterBottom>
          Grade List
        </MDTypography>

        {/* Search by University ID */}
        <MDBox component="div" marginBottom={2}>
          <MDTypography variant="h6" color="text" style={{ marginRight: "8px" }}>
            Search by University ID:
          </MDTypography>
          <input
            type="text"
            value={searchUniversityId}
            onChange={handleSearchChange}
            placeholder="Enter University ID"
            style={{
              padding: "8px",
              marginRight: "8px",
              border: "1px solid gray",
              borderRadius: "4px",
            }}
          />
        </MDBox>

        {/* Grades Table */}
        <MDBox component="div" sx={{ display: "flex", flexDirection: "column", height: "400px" }}>
          <MDBox sx={{ flex: 1, overflow: "auto" }}>
            <DataTable
              table={{ columns, rows }}
              isSorted={false}
              entriesPerPage={true}
              showTotalEntries={false}
              noEndBorder
            />
          </MDBox>
        </MDBox>
      </MDBox>

      {/* Update Modal */}
      <Modal open={isModalOpen} onClose={handleCloseModal}>
        <MDBox
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            p: 4,
            boxShadow: 24,
            borderRadius: 2,
          }}
        >
          <form onSubmit={handleFormSubmit}>
            <MDTypography variant="h5" gutterBottom>
              Update Grade
            </MDTypography>
            <TextField
              fullWidth
              label="Name"
              name="name"
              value={currentGrade?.name || ""}
              onChange={handleInputChange}
              margin="normal"
            />
            <MDBox mt={2} display="flex" justifyContent="flex-end">
              <MDButton
                variant="outlined"
                color="secondary"
                onClick={handleCloseModal}
                style={{ marginRight: "8px" }}
              >
                Cancel
              </MDButton>
              <MDButton type="submit" variant="contained" color="primary">
                Save
              </MDButton>
            </MDBox>
          </form>
        </MDBox>
      </Modal>

      <Footer />
    </DashboardLayout>
  );
}
