import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react';
import { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Loader from '../components/Loader';
import { fetchSpecies } from '../store/slices/speciesSlice';

export default function Species() {
    const dispatch = useDispatch();
    const { species, status: speciesStatus } = useSelector((state) => state.species);

    const [loading, setLoading] = useState(true);
    const [selectedSpecies, setSelectedSpecies] = useState(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    useEffect(() => {
        dispatch(fetchSpecies());
    }, [dispatch]);

    useEffect(() => {
        if (speciesStatus === 'succeeded' || speciesStatus === 'failed') {
            setLoading(false);
        }
    }, [speciesStatus]);

    const openModal = (specie) => {
        setSelectedSpecies(specie);
        setIsDialogOpen(true);
    };

    const closeModal = () => {
        setIsDialogOpen(false);
        setTimeout(() => setSelectedSpecies(null), 300);
    };

    const getCharacterImage = (characterName) => {
        if (!characterName) {
            return '/images/characters/default.jpg';
        }
        const formattedName = characterName.split(' ').join('-');
        return `/images/characters/${formattedName}.jpg`;
    };

    const getSpeciesImage = (speciesName) => {
        if (!speciesName) {
            return '/images/species/default.jpg';
        }
        const formattedName = speciesName.split(' ').join('-');
        return `/images/species/${formattedName}.webp`;
    };

    if (speciesStatus === 'failed') {
        return <div className="flex justify-center items-center h-screen">Error loading species</div>;
    }

    return (
        <div className="bg-white py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl lg:mx-0">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl font-permanentMarker">Species</h2>
                    <p className="mt-6 text-lg leading-8 text-gray-600">
                        Discover the different species from Studio Ghibli films and the characters associated with them.
                    </p>
                </div>
                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <Loader />
                    </div>
                ) : (
                    <ul
                        role="list"
                        className="mx-auto mt-20 grid max-w-2xl grid-cols-2 gap-x-8 gap-y-16 text-center sm:grid-cols-3 md:grid-cols-4 lg:mx-0 lg:max-w-none lg:grid-cols-5 xl:grid-cols-6"
                    >
                        {species.map((specie) => (
                            <li key={specie.id} className="flex flex-col items-center">
                                <div className="w-20 h-20 rounded-full overflow-hidden ring-2 ring-[#4E706D] p-0.5 transition-transform duration-300 transform hover:scale-110">
                                    <img
                                        alt={specie.name}
                                        src={getSpeciesImage(specie.name)}
                                        onError={(e) => { e.target.onerror = null; e.target.src = '/images/species/default.jpg'; }}
                                        className="object-cover object-top w-full h-full rounded-full cursor-pointer"
                                        onClick={() => openModal(specie)}
                                    />
                                </div>
                                <h3 className="mt-6 text-base font-semibold leading-7 tracking-tight text-gray-900">{specie.name}</h3>
                            </li>
                        ))}
                    </ul>
                )}

                <Transition appear show={isDialogOpen} as={Fragment}>
                    <Dialog as="div" className="relative z-10" onClose={closeModal}>
                        <TransitionChild
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className="fixed inset-0 bg-black bg-opacity-25" />
                        </TransitionChild>

                        <div className="fixed inset-0 overflow-y-auto">
                            <div className="flex min-h-full items-center justify-center p-4 text-center">
                                <TransitionChild
                                    as={Fragment}
                                    enter="ease-out duration-300"
                                    enterFrom="opacity-0 scale-95"
                                    enterTo="opacity-100 scale-100"
                                    leave="ease-in duration-200"
                                    leaveFrom="opacity-100 scale-100"
                                    leaveTo="opacity-0 scale-95"
                                >
                                    <DialogPanel className="flex flex-col max-w-7xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                        <DialogTitle
                                            as="h3"
                                            className="text-xl font-bold leading-6 text-gray-900 mb-8 font-permanentMarker"
                                        >
                                            {selectedSpecies?.name} Characters
                                        </DialogTitle>
                                        <div className="mt-2 flex">
                                            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                                                {selectedSpecies?.characters.map((character) => (
                                                    <li key={character.id} className="flex items-start gap-x-2">
                                                        <div className="w-16 h-16 rounded-full overflow-hidden ring-2 ring-[#4E706D] p-0.5">
                                                            <img
                                                                alt={character.name}
                                                                src={getCharacterImage(character.name)}
                                                                onError={(e) => { e.target.onerror = null; e.target.src = '/images/characters/default.jpg'; }}
                                                                className="object-cover object-top w-full h-full rounded-full"
                                                            />
                                                        </div>
                                                        <div className="flex flex-col items-start justify-center">
                                                            <span className="font-bold">{character.name}</span>
                                                            {character.age && <span>Age: {character.age}</span>}
                                                            {character.gender && <span>Gender: {character.gender}</span>}
                                                            {character.eye_color && <span>Eye Color: {character.eye_color}</span>}
                                                            {character.hair_color && <span>Hair Color: {character.hair_color}</span>}
                                                            {character.films && character.films.length > 0 && (
                                                                <div className="mt-2">
                                                                    <span>Films:</span>
                                                                    <ul className="list-disc list-inside">
                                                                        {character.films.map((film) => (
                                                                            <li key={film.id}>
                                                                                <Link to={`/films/${film.id}`} className="text-[#9F5C31] hover:text-[#2e4b48]">
                                                                                    {film.title}
                                                                                </Link>
                                                                            </li>
                                                                        ))}
                                                                    </ul>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        <div className="mt-10">
                                            <button
                                                type="button"
                                                className="inline-flex justify-center rounded-md border border-transparent bg-[#4E706D] px-4 py-2 text-sm font-medium text-white hover:bg-[#588b87] focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
                                                onClick={closeModal}
                                            >
                                                Close
                                            </button>
                                        </div>
                                    </DialogPanel>
                                </TransitionChild>
                            </div>
                        </div>
                    </Dialog>
                </Transition>
            </div>
        </div>
    );
}
