import React from 'react';

function Home() {
    return (
        <div className="container mt-4 text-center">
            <h1 className="mb-4">Welcome to PetClinic</h1>
            <img
                src="/pets.jpg"
                alt="Cute Dog"
                className="welcome-img"
            />
            <p className="mt-3">
                We are happy to welcome you to our clinic! Here you can find an owner, a veterinarian, or add a visit for your pet.
            </p>
        </div>
    );
}

export default Home;
