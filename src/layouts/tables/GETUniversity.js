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

// Edit Modal
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";

export default function UniversityTable() {
  const [universities, setUniversities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentUniversity, setCurrentUniversity] = useState(null); // Current university being updated

  useEffect(() => {
    const fetchUniversities = async () => {
      try {
        const response = await axios.get("https://api.blissiq.cloud/admin/university/");
        if (response.data.success) {
          setUniversities(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching universities:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUniversities();
  }, []);

  // If still loading, show a loading indicator
  if (loading) {
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
                    Loading University Data...
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

  // Handle Delete University
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this university?");
    if (confirmDelete) {
      try {
        console.log({ id });
        const response = await axios.delete(`https://api.blissiq.cloud/admin/university/${id}`);

        // Log the response for debugging
        console.log(response.data);

        if (response.data.success) {
          // Successfully deleted, update state
          setUniversities(universities.filter((university) => university.id !== id));
          alert("University deleted successfully!");
        } else {
          alert("Failed to delete the university.");
        }
      } catch (error) {
        console.error("Error deleting university:", error);
        alert("Failed to delete the university.");
      }
    }
  };

  // Open Modal for editing university
  const handleUpdate = (university) => {
    setCurrentUniversity(university);
    setIsModalOpen(true);
  };

  // Close Modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentUniversity(null);
  };

  // Handle input change in modal
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCurrentUniversity({ ...currentUniversity, [name]: value });
  };

  // Handle form submission (update university)
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    if (!currentUniversity) return;

    try {
      const response = await axios.put(
        `https://api.blissiq.cloud/admin/university/${currentUniversity.id}`,
        {
          name: currentUniversity.name,
          address: currentUniversity.address,
          isActive: currentUniversity.isActive,
        }
      );

      if (response.data.success) {
        setUniversities(
          universities.map((uni) =>
            uni.id === currentUniversity.id
              ? {
                  ...uni,
                  name: currentUniversity.name,
                  address: currentUniversity.address,
                  isActive: currentUniversity.isActive,
                }
              : uni
          )
        );
        alert("University updated successfully!");
        handleCloseModal();
      } else {
        alert("Failed to update university.");
      }
    } catch (error) {
      console.error("Error updating university:", error);
      alert("Failed to update university.");
    }
  };

  // Columns structure with the added "ID" column
  const columns = [
    { Header: "ID", accessor: "id" },
    { Header: "University Name", accessor: "name" },
    { Header: "Address", accessor: "address" },
    {
      Header: "Active",
      accessor: "isActive",
      Cell: ({ value }) => (value ? "Active" : "Inactive"),
    },
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
            onClick={() => handleDelete(row.original)} // Delete university by ID
          >
            Delete
          </MDButton>
        </MDBox>
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
                  University Table
                </MDTypography>
              </MDBox>
              <MDBox pt={3} sx={{ display: "flex", flexDirection: "column", height: "400px" }}>
                <MDBox sx={{ flex: 1, overflow: "auto" }}>
                  <DataTable
                    table={{ columns, rows: universities }}
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

      {/* Edit Modal */}
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
              Update University
            </MDTypography>
            <TextField
              fullWidth
              label="Name"
              name="name"
              value={currentUniversity?.name || ""}
              onChange={handleInputChange}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Address"
              name="address"
              value={currentUniversity?.address || ""}
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
