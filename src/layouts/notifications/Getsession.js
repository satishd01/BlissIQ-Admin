import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";

// BLISSIQ ADMIN React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

// BLISSIQ ADMIN React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

function SessionManagement() {
  const [searchParams, setSearchParams] = useState({
    class: "A1", // default class value
    topic: "",
    type: "video", // default type
  });

  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(""); // State to store message
  const [messageType, setMessageType] = useState(""); // State to store message type (success/error)
  const [openModal, setOpenModal] = useState(false); // Modal state for update
  const [openCreateModal, setOpenCreateModal] = useState(false); // Modal state for create
  const [selectedSession, setSelectedSession] = useState(null); // Selected session to update
  const [openDeleteConfirm, setOpenDeleteConfirm] = useState(false); // Confirm dialog for deletion
  const [deleteSessionId, setDeleteSessionId] = useState(null); // Selected session ID for deletion
  const [formData, setFormData] = useState({
    class: "A1", // default class value
    topic: "",
    subtopic: "",
    URL: "",
    type: "video", // default type
  });
  const [file, setFile] = useState(null); // State to store the file for ppt

  const navigate = useNavigate(); // Hook to navigate

  const handleChange = (e) => {
    if (e.target.name === "type" && e.target.value === "pptx") {
      // Reset the file if type changes to pptx
      setFile(null);
      setFormData((prevData) => ({ ...prevData, URL: "" }));
    }
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setSearchParams({ ...searchParams, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]); // Store the selected file
  };

  const uploadPpt = async () => {
    if (!file) return; // If no file is selected, return

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("https://api.blissiq.cloud/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.status) {
        // Set the URL field with the file URL from the upload response
        setFormData((prevData) => ({
          ...prevData,
          URL: `https://api.blissiq.cloud${data.fileUrl}`, // Attach the base URL to the file URL
        }));
        setMessageType("success");
        setMessage("PPT uploaded successfully.");
      } else {
        setMessageType("error");
        setMessage("Failed to upload PPT. Please try again.");
      }
    } catch (error) {
      setMessageType("error");
      setMessage("An error occurred while uploading the PPT.");
    }
  };

  const fetchSessions = async () => {
    setLoading(true);
    setMessage(""); // Clear any previous messages

    const { class: classParam, topic, type } = searchParams;
    const url = `https://api.blissiq.cloud/session?class=${classParam}&type=${type}&topic=${topic}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.success) {
        setSessions(data.data); // Assuming the data comes in 'data' field
      } else {
        setMessageType("error");
        setMessage(data.message || "Failed to fetch sessions.");
      }
    } catch (error) {
      setMessageType("error");
      setMessage("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (sessionId) => {
    // Trigger PUT request for updating the session
    const updatedSession = selectedSession;

    try {
      const response = await fetch(`https://api.blissiq.cloud/session/${sessionId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedSession),
      });
      const data = await response.json();
      if (data.success) {
        setMessageType("success");
        setMessage("Session updated successfully!");
        setOpenModal(false);
        fetchSessions();
      } else {
        setMessageType("error");
        setMessage(data.message || "Failed to update session.");
      }
    } catch (error) {
      setMessageType("error");
      setMessage("An error occurred. Please try again.");
    }
  };

  const handleDelete = async () => {
    // Trigger DELETE request for deleting the session
    try {
      const response = await fetch(`https://api.blissiq.cloud/session/${deleteSessionId}`, {
        method: "DELETE",
      });
      const data = await response.json();
      if (data.success) {
        setMessageType("success");
        setMessage("Session deleted successfully!");
        setOpenDeleteConfirm(false); // Close confirmation dialog
        fetchSessions(); // Refresh sessions after deletion
      } else {
        setMessageType("error");
        setMessage(data.message || "Failed to delete session.");
      }
    } catch (error) {
      setMessageType("error");
      setMessage("An error occurred. Please try again.");
    }
  };

  const handleModalOpen = (session) => {
    setSelectedSession(session);
    setOpenModal(true);
  };

  const handleModalClose = () => {
    setOpenModal(false);
    setSelectedSession(null);
  };

  const handleDeleteConfirmOpen = (sessionId) => {
    setDeleteSessionId(sessionId);
    setOpenDeleteConfirm(true);
  };

  const handleDeleteConfirmClose = () => {
    setOpenDeleteConfirm(false);
    setDeleteSessionId(null);
  };

  const handleCreateModalOpen = () => {
    setOpenCreateModal(true);
  };

  const handleCreateModalClose = () => {
    setOpenCreateModal(false);
    setFormData({
      class: "A1",
      topic: "",
      subtopic: "",
      URL: "",
      type: "video",
    });
    setFile(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(""); // Clear any previous messages

    if (formData.type === "pptx" && !formData.URL) {
      setMessageType("error");
      setMessage("Please upload a PPT file first.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("https://api.blissiq.cloud/session/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      // Checking if the response status is "success"
      if (data.success) {
        setMessageType("success");
        setMessage(data.message || "Session created successfully!");
        setOpenCreateModal(false);
        fetchSessions();
      } else {
        setMessageType("error");
        setMessage(data.message || "Failed to create session. Please try again.");
      }
    } catch (error) {
      setMessageType("error");
      setMessage("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSessions();
  }, [searchParams]);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mt={4} mb={3}>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} lg={8}>
            <Card>
              <MDBox p={2}>
                <MDTypography variant="h5" align="center">
                  Session Management
                </MDTypography>
              </MDBox>
              <MDBox pt={2} pb={2} px={2}>
                {message && (
                  <MDBox mb={2}>
                    <MDTypography
                      variant="body2"
                      color={messageType === "error" ? "error" : "success"}
                      align="center"
                    >
                      {message}
                    </MDTypography>
                  </MDBox>
                )}
                <form>
                  <Grid container spacing={2} justifyContent="space-between" alignItems="center">
                    <Grid item xs={3}>
                      <TextField
                        fullWidth
                        label="Class"
                        variant="outlined"
                        name="class"
                        value={searchParams.class}
                        onChange={handleChange}
                      />
                    </Grid>
                    <Grid item xs={3}>
                      <TextField
                        fullWidth
                        label="Topic"
                        variant="outlined"
                        name="topic"
                        value={searchParams.topic}
                        onChange={handleChange}
                      />
                    </Grid>
                    <Grid item xs={3}>
                      <FormControl fullWidth variant="outlined" sx={{ padding: "8px" }}>
                        <InputLabel>Type</InputLabel>
                        <Select
                          name="type"
                          value={searchParams.type}
                          onChange={handleChange}
                          label="Type"
                          sx={{
                            padding: "10px", // Increase padding here
                          }}
                        >
                          <MenuItem value="video">Video</MenuItem>
                          <MenuItem value="pptx">pptx</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>

                    <Grid item xs={3}>
                      <MDButton
                        variant="gradient"
                        color="info"
                        fullWidth
                        disabled={loading}
                        onClick={fetchSessions} // Fetch sessions on button click
                      >
                        {loading ? "Loading..." : "Search"}
                      </MDButton>
                    </Grid>
                  </Grid>
                </form>

                {/* Create Session Button */}
                <MDButton
                  variant="gradient"
                  color="info"
                  fullWidth
                  onClick={handleCreateModalOpen}
                  sx={{ mt: 2 }}
                >
                  Create Session
                </MDButton>

                {/* Sessions Display */}
                <MDBox mt={3}>
                  {sessions.length > 0 ? (
                    <Box
                      sx={{
                        maxHeight: "300px",
                        overflowY: "auto",
                        marginTop: "16px",
                      }}
                    >
                      <Grid container spacing={1} direction="column">
                        {sessions.map((session) => (
                          <Grid item xs={12} key={session.id}>
                            <Card sx={{ padding: 1, marginBottom: 1 }}>
                              <Grid container spacing={1}>
                                <Grid item xs={3}>
                                  <MDTypography variant="h6">{session.class}</MDTypography>
                                </Grid>
                                <Grid item xs={5}>
                                  <MDTypography variant="body1">
                                    <strong>Topic:</strong> {session.topic}
                                  </MDTypography>
                                </Grid>
                                <Grid item xs={4} align="right">
                                  <Grid container spacing={1}>
                                    <Grid item xs={4}>
                                      <MDButton
                                        component="a"
                                        href={session.URL}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        variant="gradient"
                                        color="info"
                                        fullWidth
                                        sx={{ width: "100%" }} // Ensure full width
                                      >
                                        Watch
                                      </MDButton>
                                    </Grid>

                                    <Grid item xs={4}>
                                      <MDButton
                                        onClick={() => handleModalOpen(session)}
                                        variant="gradient"
                                        color="warning"
                                        sx={{ width: "100%", marginRight: "8px" }} // Adjusting width and spacing
                                      >
                                        Update
                                      </MDButton>
                                    </Grid>

                                    <Grid item xs={4}>
                                      <MDButton
                                        onClick={() => handleDeleteConfirmOpen(session.id)} // Open delete confirmation
                                        variant="gradient"
                                        color="error"
                                        sx={{ width: "100%", marginLeft: "8px" }} // Adjusting width and spacing
                                      >
                                        Delete
                                      </MDButton>
                                    </Grid>
                                  </Grid>
                                </Grid>
                              </Grid>
                            </Card>
                          </Grid>
                        ))}
                      </Grid>
                    </Box>
                  ) : (
                    <MDTypography variant="body2" align="center" color="textSecondary">
                      No sessions found.
                    </MDTypography>
                  )}
                </MDBox>
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>

      {/* Create Session Modal */}
      <Dialog open={openCreateModal} onClose={handleCreateModalClose}>
        <DialogTitle>Create Session</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Class"
                  variant="outlined"
                  name="class"
                  value={formData.class}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Topic"
                  variant="outlined"
                  name="topic"
                  value={formData.topic}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Subtopic"
                  variant="outlined"
                  name="subtopic"
                  value={formData.subtopic}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel>Type</InputLabel>
                  <Select
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    required
                    label="Type"
                    sx={{ padding: "12px 14px" }} // Add padding to make it the same as other fields
                  >
                    <MenuItem value="video">Video</MenuItem>
                    <MenuItem value="pptx">pptx</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              {formData.type === "pptx" && (
                <Grid item xs={12}>
                  <input
                    type="file"
                    onChange={handleFileChange}
                    accept=".pptx"
                    style={{ width: "100%" }} // Ensure file input spans full width
                  />
                  {file && (
                    <MDButton onClick={uploadPpt} variant="gradient" color="info" fullWidth>
                      Upload PPT
                    </MDButton>
                  )}
                </Grid>
              )}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="URL"
                  variant="outlined"
                  name="URL"
                  value={formData.URL}
                  onChange={handleChange}
                  required
                  disabled={formData.type === "pptx"} // Disable for PPTX type, as URL is filled automatically
                />
              </Grid>
              <Grid item xs={12}>
                <MDButton
                  type="submit"
                  variant="gradient"
                  color="info"
                  fullWidth
                  disabled={loading}
                >
                  {loading ? "Creating..." : "Create Session"}
                </MDButton>
              </Grid>
            </Grid>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCreateModalClose} color="secondary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>

      {/* Update Modal */}
      <Dialog open={openModal} onClose={handleModalClose}>
        <DialogTitle>Update Session</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Class"
            variant="outlined"
            name="class"
            value={selectedSession?.class || ""}
            onChange={(e) => setSelectedSession({ ...selectedSession, class: e.target.value })}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            fullWidth
            label="Topic"
            variant="outlined"
            name="topic"
            value={selectedSession?.topic || ""}
            onChange={(e) => setSelectedSession({ ...selectedSession, topic: e.target.value })}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            fullWidth
            label="URL"
            variant="outlined"
            name="URL"
            value={selectedSession?.URL || ""}
            onChange={(e) => setSelectedSession({ ...selectedSession, URL: e.target.value })}
            sx={{ marginBottom: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleModalClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={() => handleUpdate(selectedSession.id)} color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={openDeleteConfirm} onClose={handleDeleteConfirmClose}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <MDTypography variant="body2">Are you sure you want to delete this session?</MDTypography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteConfirmClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <Footer />
    </DashboardLayout>
  );
}

export default SessionManagement;