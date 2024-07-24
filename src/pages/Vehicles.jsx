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
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl font-customCursive">Vehicles</h2>
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
                        className="mx-auto mt-20 grid max-w-2xl grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-3"
                    >
                        {vehicles.map((vehicle) => (
                            <li key={vehicle.id} className='flex flex-col items-center bg-[#7d9c95] py-6 px-6 rounded-lg ring-2 ring-[#4E706D]'>
                                <div className="w-48 h-48 sm:w-52 sm:h-52 md:w-56 md:h-56 lg:w-60 lg:h-60 xl:w-64 xl:h-64 overflow-hidden ring-2 ring-[#4E706D] p-1 rounded-full bg-white">
                                    <img
                                        alt={vehicle.name}
                                        src={getVehicleImage(vehicle.name)}
                                        onError={(e) => { e.target.onerror = null; e.target.src = '/images/vehicles/default.jpg'; }}
                                        className="object-cover object-top w-full h-full rounded-full ring-2 ring-[#4E706D]" />
                                </div>
                                <h3 className="mt-6 text-base font-semibold leading-7 tracking-tight text-gray-900">{vehicle.name}</h3>
                                <p className="mt-2 text-sm leading-6 text-gray-800 text-center">{vehicle.description}</p>
                                <ul className="text-sm leading-6 text-gray-800 mt-2">
                                    <li>Class: {vehicle.vehicle_class}</li>
                                    <li>Length: {vehicle.length}</li>
                                    <li>Pilot: {vehicle.pilot.name}</li>
                                    {vehicle.films && vehicle.films.length > 0 ? (
                                        <li>
                                            Films:
                                            <ul className="list-disc list-inside">
                                                {vehicle.films.map((film) => (
                                                    <li key={film.id}>
                                                        <Link to={`/films/${film.id}`} className="text-[#9F5C31] hover:text-[#2e4b48]">
                                                            {film.title}
                                                        </Link>
                                                    </li>
                                                ))}
                                            </ul>
                                        </li>
                                    ) : (
                                        <li>No films available</li>
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
