import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from "./components/ErrorFallback/ErrorFallback.jsx";
import { Route, Routes, useNavigate } from 'react-router-dom';
import { Suspense } from 'react';
import Wrapper from './components/Wrapper/Wrapper';
import ListMedicine from './components/Medication/List/ListMedicine';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EditMedication from './components/Medication/Edit/EditMedication.jsx';
import AddMedication from './components/Medication/Add/AddMedication.jsx';

function App() {
  const navigate = useNavigate();

  return (
    <>
      <ErrorBoundary FallbackComponent={ErrorFallback} onReset={() => navigate('/')} >
        <Suspense fallback={<p>Loading ...</p>}>
          <Routes>
            <Route path='/' element={<Wrapper />} >
              <Route path='add-medication' element={<AddMedication />} />
              <Route index element={<ListMedicine navigator={navigate} />} />
              <Route path='edit-medication/:drugId' element={<EditMedication />} />
              <Route path='*' id="not-found-msg" element={<h3 className="mt-4 justify-content-center align-items-center">Page Not Found</h3>} />
            </Route>
          </Routes>
          <ToastContainer autoClose={false} />
        </Suspense>
      </ErrorBoundary>
    </>
  )
}

export default App
