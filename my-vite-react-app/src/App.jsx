import React, { useState } from 'react';
import { symptomToCondition, conditionToSpecialist } from './mappings';

const symptomsList = Object.keys(symptomToCondition);

const App = () => {
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [detectedConditions, setDetectedConditions] = useState([]);
  const [assignedSpecialists, setAssignedSpecialists] = useState([]);

  const handleSymptomChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedSymptoms([...selectedSymptoms, value]);
    } else {
      setSelectedSymptoms(selectedSymptoms.filter(symptom => symptom !== value));
    }
  };

  const handleSubmit = () => {
    const conditions = new Set();
    selectedSymptoms.forEach(symptom => {
      symptomToCondition[symptom].forEach(condition => conditions.add(condition));
    });
    setDetectedConditions(Array.from(conditions));

    const specialists = new Set();
    Array.from(conditions).forEach(condition => {
      if (conditionToSpecialist[condition]) {
        conditionToSpecialist[condition].forEach(specialist => specialists.add(specialist));
      }
    });
    setAssignedSpecialists(Array.from(specialists));
  };

  return (
    <div>
      <h1>Symptom Checker</h1>
      <div>
        <h2>Select Symptoms:</h2>
        {symptomsList.map(symptom => (
          <div key={symptom}>
            <label>
              <input
                type="checkbox"
                value={symptom}
                onChange={handleSymptomChange}
              />
              {symptom}
            </label>
          </div>
        ))}
      </div>
      <button onClick={handleSubmit}>Detect Conditions & Assign Specialist</button>
      {detectedConditions.length > 0 && (
        <div>
          <h2>Detected Conditions:</h2>
          <ul>
            {detectedConditions.map(condition => (
              <li key={condition}>{condition}</li>
            ))}
          </ul>
        </div>
      )}
      {assignedSpecialists.length > 0 && (
        <div>
          <h2>Assigned Specialists:</h2>
          <ul>
            {assignedSpecialists.map(specialist => (
              <li key={specialist}>{specialist}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default App;
