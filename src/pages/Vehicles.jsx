import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Loader from '../components/Loader';
import { fetchVehicles } from '../store/slices/vehiclesSlice';

export default function Vehicles() {
    const dispatch = useDispatch();
    const { vehicles } = useSelector((state) => state.vehicles);
    const loading = useSelector((state) => state.locations.status) === 'loading';

    useEffect(() => {
        dispatch(fetchVehicles());
    }, [dispatch]);

    const getVehicleImage = (vehicleName) => {
        if (!vehicleName) {
            return null;
        }
        const formattedName = encodeURIComponent(vehicleName.split(' ').join('-'));
        return `/images/vehicles/${formattedName}.jpg`;
    };

    return (
        <div className="bg-white py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">

                <div className="mx-auto max-w-2xl lg:mx-0">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl font-permanentMarker">Vehicles</h2>
                    <p className="mt-6 text-lg leading-8 text-gray-600">
                        Discover the fascinating vehicles from Studio Ghibli films. Click on a vehicle to learn more about its details and the story it belongs to.
                    </p>
                </div>
                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <Loader />
                    </div>
                ) : (
                    <ul
                        role="list"
                        className="relative mx-auto mt-20 grid max-w-2xl grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-3"
                    >
                        {vehicles.map((vehicle) => (
                            <li key={vehicle.id} className='flex flex-col items-center bg-[url("/images/backgroundImage/Ghibliotheque-Wallpaper.webp")] py-6 px-2 rounded-lg ring-2 ring-[#4E706D] shadow-3xl'>
                                <div className="w-48 h-48 sm:w-52 sm:h-52 md:w-56 md:h-56 lg:w-60 lg:h-60 xl:w-64 xl:h-64 overflow-hidden ring-2 ring-[#4E706D] p-1 rounded-full bg-white">
                                    <img
                                        alt={vehicle.name}
                                        src={getVehicleImage(vehicle.name)}
                                        onError={(e) => { e.target.onerror = null; e.target.src = '/images/vehicles/default.jpg'; }}
                                        className="object-cover object-top w-full h-full rounded-full ring-2 ring-[#4E706D]" />
                                </div>
                                <h3 className="mt-6 text-base leading-7 tracking-tight text-gray-900 font-permanentMarker">{vehicle.name}</h3>
                                <p className="mt-2 text-sm leading-6 text-gray-800 text-center text-shadow-lg-white font-semibold">{vehicle.description}</p>
                                <ul className="text-sm leading-6 text-gray-800 mt-2 text-center text-shadow-lg-white font-semibold">
                                    <li>Class: {vehicle.vehicle_class}</li>
                                    <li>Length: {vehicle.length}</li>
                                    <li>Pilot: {vehicle.pilot.name}</li>
                                    {vehicle.films && vehicle.films.length > 0 ? (
                                        <li>
                                            Films:
                                            <ul className='relative z-10'>
                                                {vehicle.films.map((film) => (
                                                    <li key={film.id}>
                                                        <Link to={`/films/${film.id}`} className="text-black inline-flex">
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 mr-2">
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 0 1-1.125-1.125M3.375 19.5h1.5C5.496 19.5 6 18.996 6 18.375m-3.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-1.5A1.125 1.125 0 0 1 18 18.375M20.625 4.5H3.375m17.25 0c.621 0 1.125.504 1.125 1.125M20.625 4.5h-1.5C18.504 4.5 18 5.004 18 5.625m3.75 0v1.5c0 .621-.504 1.125-1.125 1.125M3.375 4.5c-.621 0-1.125.504-1.125 1.125M3.375 4.5h1.5C5.496 4.5 6 5.004 6 5.625m-3.75 0v1.5c0 .621.504 1.125 1.125 1.125m0 0h1.5m-1.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m1.5-3.75C5.496 8.25 6 7.746 6 7.125v-1.5M4.875 8.25C5.496 8.25 6 8.754 6 9.375v1.5m0-5.25v5.25m0-5.25C6 5.004 6.504 4.5 7.125 4.5h9.75c.621 0 1.125.504 1.125 1.125m1.125 2.625h1.5m-1.5 0A1.125 1.125 0 0 1 18 7.125v-1.5m1.125 2.625c-.621 0-1.125.504-1.125 1.125v1.5m2.625-2.625c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125M18 5.625v5.25M7.125 12h9.75m-9.75 0A1.125 1.125 0 0 1 6 10.875M7.125 12C6.504 12 6 12.504 6 13.125m0-2.25C6 11.496 5.496 12 4.875 12M18 10.875c0 .621-.504 1.125-1.125 1.125M18 10.875c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125m-12 5.25v-5.25m0 5.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125m-12 0v-1.5c0-.621-.504-1.125-1.125-1.125M18 18.375v-5.25m0 5.25v-1.5c0-.621.504-1.125 1.125-1.125M18 13.125v1.5c0 .621.504 1.125 1.125 1.125M18 13.125c0-.621.504-1.125 1.125-1.125M6 13.125v1.5c0 .621-.504 1.125-1.125 1.125M6 13.125C6 12.504 5.496 12 4.875 12m-1.5 0h1.5m-1.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125M19.125 12h1.5m0 0c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h1.5m14.25 0h1.5" />
                                                            </svg>

                                                            {film.title}
                                                        </Link>
                                                    </li>
                                                ))}
                                            </ul>
                                        </li>
                                    ) : (
                                        <p>No films available</p>
                                    )}
                                </ul>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}
