import { useEffect, useState } from "react";
import axios from "axios";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// BLISSIQ ADMIN React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

// BLISSIQ ADMIN React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";

import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";

export default function GetSubjects() {
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchUniversityId, setSearchUniversityId] = useState("");
  const [searchGradeId, setSearchGradeId] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentSubject, setCurrentSubject] = useState(null); // Current subject being updated

  const fetchSubjects = async () => {
    try {
      const universityId = searchUniversityId ? `universityId=${searchUniversityId}` : "";
      const gradeId = searchGradeId ? `gradeId=${searchGradeId}` : "";
      const query = `${universityId}${universityId && gradeId ? "&" : ""}${gradeId}`;
      const response = await axios.get(`https://api.blissiq.cloud/admin/subject?${query}`);
      if (response.data.success) {
        setSubjects(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching subjects:", error);
    } finally {
      setLoading(false);
    }
  };

  // Delete subject
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this subject?");
    if (confirmDelete) {
      try {
        const response = await axios.delete(`https://api.blissiq.cloud/admin/subject/${id}`);
        if (response.data.success) {
          setSubjects(subjects.filter((subject) => subject.id !== id));
          alert("Subject deleted successfully!");
        }
      } catch (error) {
        console.error("Error deleting subject:", error);
        alert("Failed to delete the subject.");
      }
    }
  };

  // Open modal with subject details
  const handleUpdate = (subject) => {
    setCurrentSubject(subject);
    setIsModalOpen(true);
  };

  // Close modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentSubject(null);
  };

  // Handle form submission
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    if (!currentSubject) return;

    try {
      const response = await axios.put(
        `https://api.blissiq.cloud/admin/subject/${currentSubject.id}`,
        {
          name: currentSubject.name,
          code: currentSubject.code,
        }
      );

      if (response.data.success) {
        setSubjects(
          subjects.map((sub) =>
            sub.id === currentSubject.id
              ? { ...sub, name: currentSubject.name, code: currentSubject.code }
              : sub
          )
        );
        alert("Subject updated successfully!");
        handleCloseModal();
      } else {
        alert("Failed to update subject.");
      }
    } catch (error) {
      console.error("Error updating subject:", error);
      alert("Failed to update subject.");
    }
  };

  // Handle input change in modal
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCurrentSubject({ ...currentSubject, [name]: value });
  };

  useEffect(() => {
    fetchSubjects(); // Fetch subjects whenever search terms change
  }, [searchUniversityId, searchGradeId]);

  if (loading) {
    return (
      <MDTypography variant="h6" color="text">
        Loading...
      </MDTypography>
    );
  }

  // Columns structure for the subjects table (same as University Table)
  const columns = [
    { Header: "ID", accessor: "id", align: "left" },
    { Header: "Name", accessor: "name", align: "left" },
    { Header: "Code", accessor: "code", align: "left" },
    { Header: "Grade ID", accessor: "gradeId", align: "center" },
    { Header: "University ID", accessor: "universityId", align: "center" },
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
            onClick={() => handleDelete(row.original.id)} // Delete subject by ID
          >
            Delete
          </MDButton>
        </MDBox>
      ),
    },
  ];

  // Prepare the rows for the table (same as University Table)
  const rows = subjects.map((subject) => ({
    id: subject.id,
    name: subject.name,
    code: subject.code,
    gradeId: subject.gradeId,
    universityId: subject.universityId,
    actions: "", // Actions are handled by the column above
  }));

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
                  Subject Table
                </MDTypography>
              </MDBox>
              <MDBox pt={3} sx={{ display: "flex", flexDirection: "column", height: "400px" }}>
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
            </Card>
          </Grid>
        </Grid>
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
              Update Subject
            </MDTypography>
            <TextField
              fullWidth
              label="Name"
              name="name"
              value={currentSubject?.name || ""}
              onChange={handleInputChange}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Code"
              name="code"
              value={currentSubject?.code || ""}
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
