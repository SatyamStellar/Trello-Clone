import React, { useState } from 'react';
import { X, Plus } from 'react-feather';

const AddList = (props) => {
    const [list, setList] = useState('');
    const [show, setShow] = useState(false);

    const saveList = () => {
        if (!list) return;
        props.getlist(list);
        setList('');
        setShow(!show);
    };

    const closeBtn = () => {
        setList('');
        setShow(!show);
    };

    return (
        <div className="flex-shrink-0 w-64 p-3">
            <div className="flex flex-col h-fit rounded-lg bg-gray-800 shadow-md p-3 transition-all duration-200">
                {show ? (
                    <div>
                        <textarea
                            value={list}
                            onChange={(e) => setList(e.target.value)}
                            className="w-full p-2 rounded-md bg-gray-700 border border-gray-600 text-gray-200 placeholder-gray-400 focus:border-sky-500"
                            placeholder="Enter list title..."
                            rows="3"
                        />
                        <div className="flex items-center mt-2">
                            <button
                                onClick={saveList}
                                className="px-3 py-1 bg-sky-600 text-white rounded-md hover:bg-sky-700 focus:ring-2 focus:ring-sky-500 mr-2"
                            >
                                Add List
                            </button>
                            <button
                                onClick={closeBtn}
                                className="p-2 rounded-md hover:bg-gray-700 focus:ring-2 focus:ring-sky-500"
                            >
                                <X size={18} className="text-gray-300" />
                            </button>
                        </div>
                    </div>
                ) : (
                    <button
                        onClick={() => setShow(!show)}
                        className="flex items-center justify-center w-full py-2 rounded-md bg-gray-700 hover:bg-gray-600 text-gray-200 focus:ring-2 focus:ring-sky-500"
                    >
                        <Plus size={18} className="mr-2" /> Add a list
                    </button>
                )}
            </div>
        </div>
    );
};

export default AddList;
