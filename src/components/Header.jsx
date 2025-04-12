import React from 'react';
import { TrelloIcon } from './TrelloIcon';

const Header = () => {
    return (
        <div className="bg-gray-900 h-14 px-6 py-2 flex justify-between items-center border-b border-gray-700 shadow-md">
            <div className="flex items-center">
                <TrelloIcon className="text-sky-500 mr-3" size={24} />
                <h3 className="text-xl font-bold text-white tracking-tight">Trello Clone</h3>
            </div>
            <div className="flex items-center space-x-4">
                <span className="text-gray-300 text-sm px-3 py-1 bg-gray-800 rounded-full">Stellar</span>
                <div className="relative">
                    <img
                        className="w-9 h-9 rounded-full border-2 border-sky-500 transition-all hover:border-sky-400 cursor-pointer"
                        src="https://placehold.co/32x32/png"
                        alt="User avatar"
                    />
                    <div className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-green-500 border-2 border-gray-900"></div>
                </div>
            </div>
        </div>
    );
};

export default Header;
