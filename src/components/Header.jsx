import NavBar from './NavBar';

export default function Header() {
    return (
        <header className="bg-gray-800 text-white py-4 shadow-md">
            <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-3xl font-bold">Ghibliotheque</h1>
                <NavBar />
            </div>
        </header>
    );
}
