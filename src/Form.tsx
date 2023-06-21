import React, { useState } from 'react';
import { Box, Button, FormControl, FormControlLabel, FormLabel, MenuItem, Radio, RadioGroup, Select, TextField, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const Forms = () => {
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [education, setEducation] = useState('');
  const [nationality, setNationality] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const formData = {
      age,
      gender,
      education,
      nationality,
      timestamp: new Date().toUTCString(),
    };
    console.log(formData);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 15 }}>
      <Typography variant="h4" component="h2" gutterBottom>
        Tell us a bit about yourself
      </Typography>
      <form onSubmit={handleSubmit} style={{ width: '300px', marginTop:4 }}>
        <TextField
          label="Age"
          variant="outlined"
          type="number"
          value={age}
          onChange={(event) => setAge(event.target.value)}
          required
          fullWidth
          margin="normal"
        />
        <FormControl component="fieldset" margin="normal" required>
          <FormLabel component="legend">Gender</FormLabel>
          <RadioGroup
            aria-label="gender"
            value={gender}
            onChange={(event) => setGender(event.target.value)}
            row
          >
            <FormControlLabel value="male" control={<Radio />} label="Male" />
            <FormControlLabel value="female" control={<Radio />} label="Female" />
            <FormControlLabel value="other" control={<Radio />} label="Other" />
          </RadioGroup>
        </FormControl>
        <FormControl variant="outlined" margin="normal" fullWidth required>
          <FormLabel component="legend">Highest Education Qualification</FormLabel>
          <Select
            value={education}
            onChange={(event) => setEducation(event.target.value as string)}
            label="Highest Education Qualification"
            required
          >
            <MenuItem value="school">School</MenuItem>
            <MenuItem value="college">College</MenuItem>
            <MenuItem value="master">Master or Higher</MenuItem>
          </Select>
        </FormControl>
        <TextField
          label="Nationality"
          variant="outlined"
          value={nationality}
          onChange={(event) => setNationality(event.target.value)}
          required
          fullWidth
          margin="normal"
        /> 
        <Button sx={{mt:2}} variant="contained" component={Link} to="/question" state={{ 
            age: age,
            gender: gender,
            education: education,
            nationality: nationality,
            timestamp: new Date().toUTCString(), }} color="primary" type="submit" fullWidth >
          Start
        </Button>
      </form>
    </Box>
  );
};

export default Forms;
