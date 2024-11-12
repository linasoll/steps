import './App.css';
import React, { useState } from 'react';

const App = () => {
  const [date, setDate] = useState('');
  const [km, setKm] = useState('');
  const [logs, setLogs] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!date || !km) return; 

    const parsedKm = parseFloat(km);
    if (isNaN(parsedKm)) return; 

    const existingLog = logs.find(log => log.date === date);

    if (existingLog) {
      existingLog.km += parsedKm;
      setLogs([...logs]);
    } else {
      const newLog = { date, km: parsedKm };
      setLogs(prevLogs => [...prevLogs, newLog].sort((a, b) => new Date(b.date) - new Date(a.date)));
    }

    setDate('');
    setKm('');
  };

  const handleDelete = (dateToDelete) => {
    setLogs(logs.filter(log => log.date !== dateToDelete));
  };

  return (
    <div className='container'>
      <form onSubmit={handleSubmit}>
        <input 
          className='input'
          type="date" 
          value={date} 
          onChange={(e) => setDate(e.target.value)} 
        />
        <input 
          className='input'
          type="number" 
          value={km} 
          onChange={(e) => setKm(e.target.value)} 
          placeholder="Пройдено км" 
        />
        <button className="btn" type="submit">OK</button>
      </form>

      <table className='table'>
        <thead>
          <tr>
            <th>Дата</th>
            <th>Пройдено км</th>
            <th className='actions'>Действия</th>
          </tr>
        </thead>
        <tbody>
          {logs.map(log => (
            <tr key={log.date}>
              <td>{log.date}</td>
              <td>{log.km}</td>
              <td>
                <div className="del" onClick={() => handleDelete(log.date)}>×</div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;