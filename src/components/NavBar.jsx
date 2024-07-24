import { Dialog, DialogPanel } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';

const navigation = [
    { name: 'Films', href: '/films' },
    { name: 'Characters', href: '/peoples' },
    { name: 'Species', href: '/species' },
    { name: 'Vehicles', href: '/vehicles' },
    { name: 'Locations', href: '/locations' },
];

export default function NavBar() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <header className="bg-transparent py-3 lg:py-5 xl:py-10 mx-4">
            <nav aria-label="Global" className="mx-auto flex max-w-7xl items-center justify-between lg:px-8">
                <NavLink to="/" className="">
                    <span className="sr-only">Ghibliotheque</span>
                    <span className='text-3xl xl:text-5xl font-cursive font-bold text-stroke text-[#758A7E]'>Ghibliothèque</span>
                </NavLink>
                <div className="flex lg:hidden">
                    <button
                        type="button"
                        onClick={() => setMobileMenuOpen(true)}
                        className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-white"
                    >
                        <span className="sr-only">Open main menu</span>
                        {mobileMenuOpen ? (
                            <Bars3Icon aria-hidden="true" className="hidden" />
                        ) : (
                            <Bars3Icon aria-hidden="true" className="h-6 w-6" />
                        )}
                    </button>
                </div>
                <div className="hidden lg:flex lg:gap-x-12">
                    {navigation.map((item) => (
                        <NavLink
                            key={item.name}
                            to={item.href}
                            className={({ isActive }) => `font-cursive font-medium bg-[#758A7E] rounded-md px-3 shadow-3xl ${isActive ? 'text-white ring-2 ring-white' : 'text-white'}`}
                        >
                            {item.name}
                        </NavLink>
                    ))}
                </div>
            </nav>
            <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
                <div className="fixed inset-0 z-10" />
                <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-[#5D7974] bg-opacity-95 px-4 py-3 sm:max-w-[15em] sm:ring-1 sm:ring-gray-900/10">
                    <div className="flex items-center justify-between">
                        <NavLink to="/" className="">
                            <span className="sr-only">Ghibliotheque</span>
                            <span className='text-3xl xl:text-5xl font-cursive font-bold text-stroke text-[#758A7E] sm:hidden'>Ghibliothèque</span>
                        </NavLink>
                        <button
                            type="button"
                            onClick={() => setMobileMenuOpen(false)}
                            className="-m-2.5 rounded-md p-2.5 text-white"
                        >
                            <span className="sr-only">Close menu</span>
                            <XMarkIcon aria-hidden="true" className="h-6 w-6" />
                        </button>
                    </div>
                    <div className="mt-16 flow-root">
                        <div className="-my-6 divide-y divide-gray-500/10">
                            <div className="space-y-8 py-10 md: flex flex-col items-center">
                                {navigation.map((item) => (
                                    <NavLink
                                        key={item.name}
                                        to={item.href}
                                        className={({ isActive }) => `font-cursive font-medium text-2xl sm:text-xl bg-[#758A7E] rounded-md px-6 shadow-3xl ${isActive ? 'text-white ring-2 ring-white' : 'text-white'}`}
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        {item.name}
                                    </NavLink>
                                ))}
                            </div>
                        </div>
                    </div>

                </DialogPanel>
            </Dialog>
        </header>
    );
}
