import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Link, Route, Routes } from 'react-router'
import './index.css'
import App from './App.jsx'
import NotesPage from './pages/NotePage.jsx'
import NotFoundPage from './pages/NotFoundPage.jsx'
import FinancialPage from './pages/FinancialPage.jsx'
import CashFlowPage from './pages/CashFlowPage.jsx'
import NewNotePage from './pages/NewNotePage.jsx'
import NoteDetailPage from './pages/NoteDetailPage.jsx'
import EditNotePage from './pages/EditNotePage.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <nav>
        <Link to="/">기업 검색</Link>
        {' | '}
        <Link to="/notes">분석 노트</Link>
      </nav>

      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/notes" element={<NotesPage />} />
        <Route path="/companies/:corpCode/financials" element={<FinancialPage />} />
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/companies/:corpCode/cash-flow" element={<CashFlowPage />} />
        <Route path="/notes/new" element={<NewNotePage />} />
        <Route path="/notes/:noteId" element={<NoteDetailPage />} />
        <Route path="/notes/:noteId/edit" element={<EditNotePage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)