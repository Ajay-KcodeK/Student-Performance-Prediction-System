import {
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
} from '@mui/material';
import axios from 'axios';
import { motion } from 'framer-motion';
import { useState } from 'react';

function App() {
  const [formData, setFormData] = useState({
    attendancePercentage: '',
    averageTestScore: '',
    behaviorScore: '',
  });

  const [prediction, setPrediction] = useState(null);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        'http://localhost:8080/api/predict',
        formData,
      );
      setPrediction(res.data.prediction);
    } catch (error) {
      console.error('Prediction failed:', error);
    }
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-4'>
      <motion.div
        className='w-full max-w-md'
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Card elevation={4}>
          <CardContent>
            <Typography
              variant='h5'
              component='div'
              align='center'
              color='primary'
            >
              Student Performance Predictor 🎓
            </Typography>

            <form onSubmit={handleSubmit} className='space-y-4 mt-4'>
              <TextField
                fullWidth
                label='Attendance Percentage'
                type='number'
                name='attendancePercentage'
                value={formData.attendancePercentage}
                onChange={handleChange}
                required
                variant='outlined'
                margin='normal'
              />

              <TextField
                fullWidth
                label='Test Score'
                type='number'
                name='averageTestScore'
                value={formData.averageTestScore}
                onChange={handleChange}
                required
                variant='outlined'
                margin='normal'
              />

              <TextField
                fullWidth
                label='Behavior Score'
                type='number'
                name='behaviorScore'
                value={formData.behaviorScore}
                onChange={handleChange}
                required
                variant='outlined'
                margin='normal'
              />

              <Button
                type='submit'
                variant='contained'
                color='primary'
                fullWidth
                sx={{ mt: 2 }}
              >
                Predict 🚀
              </Button>
            </form>

            {prediction && (
              <motion.div
                className='mt-6 text-center text-lg font-medium text-green-600'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <Typography variant='h6' color='textPrimary'>
                  Prediction: <span className='font-bold'>{prediction}</span>
                </Typography>
              </motion.div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

export default App;
