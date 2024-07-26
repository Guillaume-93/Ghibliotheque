import { NavLink } from 'react-router-dom';
import LinkPreview from '../components/ui/LinkPreview.jsx';

const navigation = [
    { name: 'Films', href: '/films' },
    { name: 'Species', href: '/species' },
    { name: 'Vehicles', href: '/vehicles' },
    { name: 'Locations', href: '/locations' },
    { name: 'Characters', href: '/peoples' },
];

export default function Footer() {
    return (
        <footer className="bg-white">
            <div className="mx-auto max-w-7xl overflow-hidden px-6 py-20 sm:py-24 lg:px-8">
                <nav aria-label="Footer" className="-mb-6 columns-2 sm:flex sm:justify-center sm:space-x-12">
                    {navigation.map((item) => (
                        <div key={item.name} className="pb-6">
                            <NavLink
                                to={item.href}
                                className="text-sm leading-6 text-gray-600 hover:text-gray-900"
                            >
                                {item.name}
                            </NavLink>
                        </div>
                    ))}
                </nav>
                <div className="mt-10 flex justify-center">
                    <LinkPreview url="https://guillaume-brechaire.fr/" imageSrc="/images/My-Portfolio.png">
                        <a
                            href="https://guillaume-brechaire.fr/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm leading-6 text-indigo-600 hover:text-indigo-900"
                        >
                            My Portfolio
                        </a>
                    </LinkPreview>
                </div>
                <p className="mt-10 text-center text-xs leading-5 text-gray-500">
                    &copy; {new Date().getFullYear()} Guillaume Brechaire. All rights reserved.
                </p>
            </div>
        </footer>
    );
}
