import React, { useContext, useState } from 'react';
import { ChevronRight, ChevronLeft, Plus, X, Folder, Star, Clock, Globe, GitHub } from 'react-feather';
import { Popover } from 'react-tiny-popover';
import { BoardContext } from '../context/BoardContext';

const Sidebar = () => {
    const blankBoard = {
        name: '',
        bgcolor: '#075985',
        list: []
    };
    const [boardData, setBoarddata] = useState(blankBoard);
    const [collapsed, setCollapsed] = useState(false);
    const [showpop, setShowpop] = useState(false);
    const { allboard, setAllBoard } = useContext(BoardContext);

    const setActiveboard = (i) => {
        let newBoard = { ...allboard };
        newBoard.active = i;
        setAllBoard(newBoard);
    };

    const addBoard = () => {
        if (!boardData.name) return;
        let newB = { ...allboard };
        newB.boards.push(boardData);
        setAllBoard(newB);
        setBoarddata(blankBoard);
        setShowpop(!showpop);
    };

    const goToPortfolio = () => {
        window.open('https://satyamstellar.space/', '_blank');
    };

    const goToGithub = () => {
        window.open('https://github.com/yourusername/yourrepo', '_blank');
    };

    return (
        <div
            className={`bg-gray-900 h-[calc(100vh-3.5rem)] border-r border-gray-700 transition-all duration-300 flex-shrink-0 shadow-md ${collapsed ? 'w-14' : 'w-72'
                }`}
        >
            {collapsed ? (
                <div className="p-3 flex flex-col h-full">
                    <button
                        onClick={() => setCollapsed(!collapsed)}
                        className="p-2 rounded-md hover:bg-gray-800 focus:ring-2 focus:ring-sky-500 transition-all duration-200"
                    >
                        <ChevronRight size={20} className="text-sky-400" />
                    </button>

                    {/* External link buttons for collapsed state */}
                    <div className="mt-auto mb-4 flex flex-col space-y-2">
                        <button
                            onClick={goToPortfolio}
                            className="p-2 rounded-md hover:bg-gray-800 focus:ring-2 focus:ring-sky-500 transition-all"
                            title="Portfolio"
                        >
                            <Globe size={20} className="text-sky-400" />
                        </button>
                        <button
                            onClick={goToGithub}
                            className="p-2 rounded-md hover:bg-gray-800 focus:ring-2 focus:ring-sky-500 transition-all"
                            title="GitHub"
                        >
                            <GitHub size={20} className="text-sky-400" />
                        </button>
                    </div>
                </div>
            ) : (
                <div className="flex flex-col h-full">
                    <div className="p-4 flex justify-between items-center border-b border-gray-700">
                        <h4 className="text-lg font-bold text-white tracking-tight">Workspace</h4>
                        <button
                            onClick={() => setCollapsed(!collapsed)}
                            className="p-2 rounded-md hover:bg-gray-800 focus:ring-2 focus:ring-sky-500 transition-all"
                        >
                            <ChevronLeft size={20} className="text-gray-300 hover:text-sky-400" />
                        </button>
                    </div>

                    <div className="px-3 py-4 flex flex-col h-full">
                        <div className="flex flex-col space-y-2 mb-6">
                            <button className="w-full py-2 px-3 rounded-md text-sm flex items-center text-gray-200 bg-gray-800 hover:bg-gray-700 focus:ring-2 focus:ring-sky-500">
                                <Folder size={16} className="text-sky-400 mr-3" />
                                <span>All boards</span>
                            </button>
                            <button className="w-full py-2 px-3 rounded-md text-sm flex items-center text-gray-300 hover:bg-gray-800 focus:ring-2 focus:ring-sky-500">
                                <Star size={16} className="text-yellow-400 mr-3" />
                                <span>Starred boards</span>
                            </button>
                            <button className="w-full py-2 px-3 rounded-md text-sm flex items-center text-gray-300 hover:bg-gray-800 focus:ring-2 focus:ring-sky-500">
                                <Clock size={16} className="text-purple-400 mr-3" />
                                <span>Recent boards</span>
                            </button>
                        </div>

                        <div className="flex justify-between items-center mb-3">
                            <h6 className="text-sm font-semibold text-gray-300 px-3">Your Boards</h6>
                            <Popover
                                isOpen={showpop}
                                align="start"
                                positions={['right', 'top', 'bottom', 'left']}
                                content={
                                    <div className="ml-2 p-4 w-72 bg-gray-800 rounded-lg shadow-lg text-gray-200 border border-gray-700">
                                        <button
                                            onClick={() => setShowpop(!showpop)}
                                            className="absolute right-2 top-2 p-1 rounded-md hover:bg-gray-700 focus:ring-2 focus:ring-sky-500"
                                        >
                                            <X size={18} className="text-gray-300" />
                                        </button>
                                        <h4 className="text-lg font-medium mb-4 text-white">Create Board</h4>

                                        <div className="rounded-md overflow-hidden border border-gray-600 mb-4" style={{ backgroundColor: boardData.bgcolor }}>
                                            <div className="h-24 bg-opacity-40"></div>
                                        </div>

                                        <div className="flex flex-col space-y-3">
                                            <div>
                                                <label htmlFor="title" className="text-sm block mb-1 text-gray-300">
                                                    Board Title <span className="text-red-400">*</span>
                                                </label>
                                                <input
                                                    value={boardData.name}
                                                    onChange={(e) =>
                                                        setBoarddata({ ...boardData, name: e.target.value })
                                                    }
                                                    type="text"
                                                    className="p-2 w-full rounded-md bg-gray-700 border border-gray-600 text-gray-200 focus:border-sky-500"
                                                    placeholder="Enter board title..."
                                                />
                                            </div>

                                            <div>
                                                <label htmlFor="color" className="text-sm block mb-1 text-gray-300">
                                                    Background Color
                                                </label>
                                                <div className="flex items-center">
                                                    <input
                                                        value={boardData.bgcolor}
                                                        onChange={(e) =>
                                                            setBoarddata({ ...boardData, bgcolor: e.target.value })
                                                        }
                                                        type="color"
                                                        className="p-1 rounded-md bg-gray-700 border border-gray-600 h-10 w-12 mr-2"
                                                    />
                                                    <span className="text-sm text-gray-400">{boardData.bgcolor}</span>
                                                </div>
                                            </div>

                                            <button
                                                onClick={addBoard}
                                                className="mt-4 px-4 py-2 rounded-md bg-sky-600 text-white hover:bg-sky-700 focus:ring-2 focus:ring-sky-500 font-medium transition-all duration-200"
                                            >
                                                Create Board
                                            </button>
                                        </div>
                                    </div>
                                }
                            >
                                <button
                                    onClick={() => setShowpop(!showpop)}
                                    className="p-1.5 rounded-md hover:bg-gray-800 focus:ring-2 focus:ring-sky-500 text-gray-400 hover:text-sky-400"
                                >
                                    <Plus size={18} />
                                </button>
                            </Popover>
                        </div>
                        <div className="max-h-[calc(100vh-380px)] overflow-y-auto pr-1 custom-scrollbar flex-grow">
                            <ul className="space-y-1">
                                {allboard.boards &&
                                    allboard.boards.map((x, i) => (
                                        <li key={i}>
                                            <button
                                                onClick={() => setActiveboard(i)}
                                                className={`w-full py-2 px-3 rounded-md text-sm flex items-center hover:bg-gray-800 focus:ring-2 focus:ring-sky-500 transition-all ${allboard.active === i ? 'bg-gray-800 text-white' : 'text-gray-300'
                                                    }`}
                                            >
                                                <span
                                                    className="w-4 h-4 rounded mr-3 flex-shrink-0"
                                                    style={{ backgroundColor: x.bgcolor }}
                                                />
                                                <span className="truncate">{x.name}</span>
                                            </button>
                                        </li>
                                    ))}
                            </ul>
                        </div>

                        {/* External link buttons */}
                        <div className="mt-auto pt-4 border-t border-gray-700">
                            <div className="flex flex-col space-y-2">
                                <button
                                    onClick={goToPortfolio}
                                    className="w-full py-2 px-3 rounded-md text-sm flex items-center text-sky-400 hover:bg-gray-800 focus:ring-2 focus:ring-sky-500"
                                >
                                    <Globe size={16} className="mr-3" />
                                    <span>Portfolio</span>
                                </button>
                                <button
                                    onClick={goToGithub}
                                    className="w-full py-2 px-3 rounded-md text-sm flex items-center text-sky-400 hover:bg-gray-800 focus:ring-2 focus:ring-sky-500"
                                >
                                    <GitHub size={16} className="mr-3" />
                                    <span>GitHub Source</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Sidebar;
