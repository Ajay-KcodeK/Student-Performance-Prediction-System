import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Input,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  Modal,
  Fade,
  Backdrop,
} from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react';

const AdminPanel = () => {
  const [students, setStudents] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
    attendancePercentage: '',
    averageTestScore: '',
    behaviorScore: '',
  });
  const [predictions, setPredictions] = useState({}); // Store predictions for each student
  const [openModal, setOpenModal] = useState(false); // To manage the modal for adding student
  const tableRef = useRef(null); // Reference to the table container to detect click outside

  useEffect(() => {
    fetchStudents();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (tableRef.current && !tableRef.current.contains(event.target)) {
        setPredictions({}); // Reset predictions when clicking outside
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const fetchStudents = async () => {
    const response = await axios.get('http://localhost:8080/api/students');
    setStudents(response.data);
  };

  const handleAdd = async () => {
    const student = {
      name: formData.name,
      age: parseInt(formData.age),
      gender: formData.gender,
      performanceMetrics: {
        attendancePercentage: parseFloat(formData.attendancePercentage),
        averageTestScore: parseFloat(formData.averageTestScore),
        behaviorScore: parseFloat(formData.behaviorScore),
      },
    };
    await axios.post('http://localhost:8080/api/students', student);
    fetchStudents();
    setOpenModal(false); // Close modal after adding student
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:8080/api/students/${id}`);
    fetchStudents();
  };

  const handlePredict = async (student) => {
    const response = await axios.post(
      'http://localhost:5000/predict',
      student.performanceMetrics
    );
    setPredictions((prev) => ({
      ...prev,
      [student.id]: response.data.prediction, // Store prediction per student
    }));
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Card sx={{ padding: 4, marginBottom: 4 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Add New Student
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setOpenModal(true)} // Open modal to add student
            sx={{ marginBottom: 2 }}
          >
            Add New Student
          </Button>
        </CardContent>
      </Card>

      {/* Modal for adding student */}
      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openModal}>
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              bgcolor: 'background.paper',
              borderRadius: 2,
              boxShadow: 24,
              p: 4,
              width: 400,
            }}
          >
            <Typography variant="h6" gutterBottom>
              Enter Student Details
            </Typography>
            <Grid container spacing={2}>
              {Object.keys(formData).map((field) => (
                <Grid item xs={12} key={field}>
                  <Input
                    fullWidth
                    placeholder={field}
                    value={formData[field]}
                    onChange={(e) =>
                      setFormData({ ...formData, [field]: e.target.value })
                    }
                    sx={{ marginBottom: 2 }}
                  />
                </Grid>
              ))}
            </Grid>
            <Button
              variant="contained"
              color="primary"
              onClick={handleAdd}
              sx={{ width: '100%' }}
            >
              Add Student
            </Button>
          </Box>
        </Fade>
      </Modal>

      <Card sx={{ padding: 4 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Student List
          </Typography>
          <Table ref={tableRef}>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Age</TableCell>
                <TableCell>Gender</TableCell>
                <TableCell>Attendance</TableCell>
                <TableCell>Prediction</TableCell> {/* Add Prediction Column */}
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {students.map((student) => (
                <TableRow key={student.id}>
                  <TableCell>{student.name}</TableCell>
                  <TableCell>{student.age}</TableCell>
                  <TableCell>{student.gender}</TableCell>
                  <TableCell>
                    {student.performanceMetrics.attendancePercentage}%
                  </TableCell>
                  <TableCell
                    sx={{
                      backgroundColor:
                        predictions[student.id] ? '#f1f1f1' : 'transparent',
                      fontWeight: predictions[student.id] ? 'bold' : 'normal',
                      color: predictions[student.id] ? 'green' : 'black',
                      transition: 'all 0.3s ease',
                    }}
                  >
                    {/* Show the prediction for this student if available */}
                    {predictions[student.id] || (
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => handlePredict(student)}
                      >
                        Predict
                      </Button>
                    )}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => handleDelete(student.id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </Box>
  );
};

export default AdminPanel;
