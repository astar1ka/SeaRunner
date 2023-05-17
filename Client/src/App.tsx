import { useState } from 'react';
import Socket from './services/Socket';

import MainPage from './pages/mainPage/MainPage';
import GamePage from './pages/gamePage/GamePage';

import './App.css';

export enum Pages { MainPage = 'MainPage', GamePage = 'GamePage' };

export const socket = new Socket();

export default function App() {
  const [page, setPage] = useState<Pages>(Pages.MainPage);

  return (page === Pages.MainPage) ?
    <MainPage setPage={setPage} /> :
    <GamePage setPage={setPage}/>
}
