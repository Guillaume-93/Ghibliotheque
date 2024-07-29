import { useState, useEffect } from 'react';
import { ArrowUpIcon } from '@heroicons/react/24/outline';

export default function ScrollToTopButton() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.pageYOffset > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', toggleVisibility);

        return () => {
            window.removeEventListener('scroll', toggleVisibility);
        };
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <div className="fixed bottom-4 right-4 z-20">
            {isVisible && (
                <button
                    onClick={scrollToTop}
                    className="p-2 rounded-full bg-[#4E706D] text-white shadow-lg hover:bg-[#588b87] focus:outline-none focus:ring focus:ring-indigo-300"
                    aria-label="Scroll to top"
                >
                    <ArrowUpIcon className="h-6 w-6" />
                </button>
            )}
        </div>
    );
}
