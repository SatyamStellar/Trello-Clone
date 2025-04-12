import React, { useState } from 'react';
import { X, Plus } from 'react-feather';

const CardAdd = (props) => {
    const [card, setCard] = useState('');
    const [show, setShow] = useState(false);

    const saveCard = () => {
        if (!card) return;
        props.getcard(card);
        setCard('');
        setShow(!show);
    };

    const closeBtn = () => {
        setCard('');
        setShow(!show);
    };

    return (
        <div className="p-2 border-t border-gray-700">
            {show ? (
                <div>
                    <textarea
                        value={card}
                        onChange={(e) => setCard(e.target.value)}
                        className="w-full p-3 rounded-md bg-gray-700 border border-gray-600 text-gray-200 placeholder-gray-400 focus:border-sky-500"
                        placeholder="Enter card title..."
                        rows="2"
                        autoFocus
                    />
                    <div className="flex items-center mt-3">
                        <button
                            onClick={saveCard}
                            className="px-3 py-1.5 bg-sky-600 text-white rounded-md hover:bg-sky-700 focus:ring-2 focus:ring-sky-500 mr-2 shadow-sm transition-all font-medium"
                        >
                            Add Card
                        </button>
                        <button
                            onClick={closeBtn}
                            className="p-2 rounded-md hover:bg-gray-700 focus:ring-2 focus:ring-sky-500 text-gray-400 hover:text-white transition-all"
                        >
                            <X size={16} />
                        </button>
                    </div>
                </div>
            ) : (
                <button
                    onClick={() => setShow(!show)}
                    className="flex items-center w-full py-2 px-2 rounded-md bg-transparent hover:bg-gray-700 text-gray-300 focus:ring-2 focus:ring-sky-500 transition-all"
                >
                    <Plus size={16} className="ml-1 mr-2" /> Add a card
                </button>
            )}
        </div>
    );
};

export default CardAdd;
