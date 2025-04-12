import { useState, useEffect } from 'react';
import './index.css';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Main from './components/Main';
import { BoardContext } from './context/BoardContext';

function App() {
  const boardData = {
    active: 0,
    boards: [
      {
        name: 'My Trello Board',
        bgcolor: '#075985',
        list: [
          { id: "1", title: "To do", items: [{ id: "cdrFt", title: "Project Description 1" }] },
          { id: "2", title: "In Progress", items: [{ id: "cdrFv", title: "Project Description 2" }] },
          { id: "3", title: "Done", items: [{ id: "cdrFb", title: "Project Description 3" }] }
        ]
      }
    ]
  };

  const [allboard, setAllBoard] = useState(() => {
    const savedBoards = localStorage.getItem('trello-boards');
    return savedBoards ? JSON.parse(savedBoards) : boardData;
  });

  useEffect(() => {
    localStorage.setItem('trello-boards', JSON.stringify(allboard));
  }, [allboard]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      <Header />
      <BoardContext.Provider value={{ allboard, setAllBoard }}>
        <div className="flex flex-row min-h-[calc(100vh-3.5rem)]">
          <Sidebar />
          <Main />
        </div>
      </BoardContext.Provider>
    </div>
  );
}

export default App;
