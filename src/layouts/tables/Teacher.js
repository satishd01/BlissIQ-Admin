import { useEffect, useState } from "react";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";

// BLISSIQ ADMIN React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// BLISSIQ ADMIN React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";

function Teachers() {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetching teacher data from the API
    const fetchTeachers = async () => {
      try {
        const response = await fetch("https://api.blissiq.cloud/admin.getAll/teacher");
        const data = await response.json();

        if (data && data.success) {
          setTeachers(data.data);
        } else {
          console.error("No teacher data found in the response.");
        }
      } catch (error) {
        console.error("Error fetching teacher data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTeachers();
  }, []);

  // Toggle the active state of a teacher
  const toggleActiveState = async (teacherId, currentState) => {
    try {
      const response = await fetch(
        `https://api.blissiq.cloud/admin.active-deactive/teacher/${teacherId}`,
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
        setTeachers((prevTeachers) =>
          prevTeachers.map((teacher) =>
            teacher.id === teacherId ? { ...teacher, isActive: result.data.isActive } : teacher
          )
        );
      } else {
        console.error("Failed to update teacher status:", result.message);
      }
    } catch (error) {
      console.error("Error updating teacher status:", error);
    }
  };

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
                    Loading Teachers Data...
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

  // Columns structure based on teacher data
  const columns = [
    { Header: "Name", accessor: "name" },
    { Header: "Phone", accessor: "phone" },
    { Header: "Email", accessor: "email" },
    { Header: "Class", accessor: "class" },
    { Header: "Class No", accessor: "classNo" },
    { Header: "School ID", accessor: "schoolId" },
    {
      Header: "Active",
      accessor: "isActive",
      Cell: ({ row }) => (
        <Button
          variant="contained"
          size="small"
          sx={{
            backgroundColor: row.original.isActive ? "#4CAF50" : "#F44336", // Green for Active, Red for Inactive
            color: "white",
            "&:hover": {
              backgroundColor: row.original.isActive ? "#388E3C" : "#D32F2F", // Darker on hover
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
                  Teachers Table
                </MDTypography>
              </MDBox>
              <MDBox pt={3} sx={{ display: "flex", flexDirection: "column", height: "400px" }}>
                <MDBox sx={{ flex: 1, overflow: "auto" }}>
                  <DataTable
                    table={{ columns, rows: teachers }}
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

export default Teachers;
