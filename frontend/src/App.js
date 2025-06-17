import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import Owners from './components/Owners';
import Vets from './components/Vets';
import Pets from './components/Pets';
import VisitForm from './components/VisitForm';

function App() {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/owners" element={<Owners />} />
                <Route path="/vets" element={<Vets />} />
                <Route path="/pets" element={<Pets />} />
                <Route path="/pets/:petId/visits/new" element={<VisitForm />} />
            </Routes>

            <footer className="footer bg-dark text-white mt-5">
                <div className="container text-center py-3">
                    <small>&copy; 2025 PetClinic. All rights reserved.</small>
                </div>
            </footer>
        </BrowserRouter>
    );
}

export default App;
