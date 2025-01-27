import { useEffect, useState } from "react";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button"; // Import MUI Button

// BLISSIQ ADMIN React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// BLISSIQ ADMIN React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";

function Students() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch("https://api.blissiq.cloud/admin.getAll/student");
        const data = await response.json();

        if (data && data.success) {
          setStudents(data.data);
        } else {
          console.error("No student data found in the response.");
        }
      } catch (error) {
        console.error("Error fetching student data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
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
      } else {
        console.error("Failed to update student status:", result.message);
      }
    } catch (error) {
      console.error("Error updating student status:", error);
    }
  };

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
                  Students Table
                </MDTypography>
              </MDBox>
              <MDBox pt={3} sx={{ display: "flex", flexDirection: "column", height: "400px" }}>
                <MDBox sx={{ flex: 1, overflow: "auto" }}>
                  <DataTable
                    table={{ columns, rows: students }}
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
      <Footer />
    </DashboardLayout>
  );
}

export default Students;
