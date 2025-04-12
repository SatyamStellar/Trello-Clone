import React, { useContext, useState } from 'react';
import { MoreHorizontal, UserPlus, Edit2, Trash2, X } from 'react-feather';
import CardAdd from './CardAdd';
import { BoardContext } from '../context/BoardContext';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import AddList from './AddList';
import Utils from '../utils/Utils';

const Main = () => {
    const { allboard, setAllBoard } = useContext(BoardContext);
    const bdata = allboard.boards[allboard.active];
    const [editingCard, setEditingCard] = useState(null); // Tracks { listIndex, cardId, title }
    const [editTitle, setEditTitle] = useState('');

    function onDragEnd(res) {
        if (!res.destination) {
            console.log("No Destination");
            return;
        }
        const newList = [...bdata.list];
        const s_id = parseInt(res.source.droppableId);
        const d_id = parseInt(res.destination.droppableId);
        const [removed] = newList[s_id - 1].items.splice(res.source.index, 1);
        newList[d_id - 1].items.splice(res.destination.index, 0, removed);

        let board_ = { ...allboard };
        board_.boards[board_.active].list = newList;
        setAllBoard(board_);
    }

    const cardData = (e, ind) => {
        let newList = [...bdata.list];
        newList[ind].items.push({ id: Utils.makeid(5), title: e });

        let board_ = { ...allboard };
        board_.boards[board_.active].list = newList;
        setAllBoard(board_);
    };

    const listData = (e) => {
        let newList = [...bdata.list];
        newList.push({
            id: newList.length + 1 + '',
            title: e,
            items: []
        });

        let board_ = { ...allboard };
        board_.boards[board_.active].list = newList;
        setAllBoard(board_);
    };

    const startEditing = (listIndex, cardId, currentTitle) => {
        setEditingCard({ listIndex, cardId });
        setEditTitle(currentTitle);
    };

    const saveEdit = (listIndex, cardId) => {
        if (!editTitle.trim()) return; // Prevent empty titles
        let newList = [...bdata.list];
        const cardIndex = newList[listIndex].items.findIndex((item) => item.id === cardId);
        if (cardIndex !== -1) {
            newList[listIndex].items[cardIndex].title = editTitle;
            let board_ = { ...allboard };
            board_.boards[board_.active].list = newList;
            setAllBoard(board_);
        }
        setEditingCard(null);
        setEditTitle('');
    };

    const cancelEdit = () => {
        setEditingCard(null);
        setEditTitle('');
    };

    const deleteCard = (listIndex, cardId) => {
        let newList = [...bdata.list];
        newList[listIndex].items = newList[listIndex].items.filter((item) => item.id !== cardId);
        let board_ = { ...allboard };
        board_.boards[board_.active].list = newList;
        setAllBoard(board_);
    };

    // Generate a gradient based on the background color
    const generateBgGradient = (color) => {
        return `linear-gradient(to bottom, ${color}, ${adjustColor(color, -20)})`;
    };

    // Function to darken/lighten color
    const adjustColor = (color, amount) => {
        return color; // Just return original for now, could implement color calculation
    };

    return (
        <div
            className="flex flex-col flex-1 overflow-hidden"
            style={{
                background: generateBgGradient(bdata.bgcolor),
                backgroundSize: "cover",
                backgroundAttachment: "fixed"
            }}
        >
            <div className="px-6 py-4 bg-gray-900 bg-opacity-85 backdrop-blur-sm flex justify-between items-center shadow-md z-10">
                <h2 className="text-xl font-bold text-white">{bdata.name}</h2>
                <div className="flex items-center space-x-3">
                    <button className="px-4 py-1.5 bg-gray-800 text-gray-200 rounded-md hover:bg-gray-700 focus:ring-2 focus:ring-sky-500 flex items-center transition-all shadow-sm">
                        <UserPlus size={16} className="mr-2 text-sky-400" />
                        Share
                    </button>
                    <button className="p-2 rounded-md hover:bg-gray-800 focus:ring-2 focus:ring-sky-500 text-gray-300 hover:text-white transition-all">
                        <MoreHorizontal size={18} />
                    </button>
                </div>
            </div>
            <div className="flex-1 p-6 overflow-x-auto custom-scrollbar">
                <div className="flex space-x-4">
                    <DragDropContext onDragEnd={onDragEnd}>
                        {bdata.list &&
                            bdata.list.map((x, ind) => (
                                <div
                                    key={ind}
                                    className="flex-shrink-0 w-72 rounded-lg bg-gray-800 bg-opacity-90 shadow-lg overflow-hidden border border-gray-700"
                                >
                                    <div className="px-3 py-3 flex justify-between items-center border-b border-gray-700">
                                        <span className="text-gray-100 font-semibold">{x.title}</span>
                                        <button className="p-1.5 rounded-md hover:bg-gray-700 focus:ring-2 focus:ring-sky-500 text-gray-400 hover:text-gray-200 transition-all">
                                            <MoreHorizontal size={16} />
                                        </button>
                                    </div>
                                    <Droppable droppableId={x.id}>
                                        {(provided, snapshot) => (
                                            <div
                                                className="min-h-[100px] p-2"
                                                ref={provided.innerRef}
                                                style={{
                                                    backgroundColor: snapshot.isDraggingOver
                                                        ? 'rgba(15, 23, 42, 0.7)'
                                                        : 'transparent',
                                                    transition: 'background-color 0.2s ease'
                                                }}
                                                {...provided.droppableProps}
                                            >
                                                {x.items &&
                                                    x.items.map((item, index) => (
                                                        <Draggable
                                                            key={item.id}
                                                            draggableId={item.id}
                                                            index={index}
                                                        >
                                                            {(provided, snapshot) => (
                                                                <div
                                                                    ref={provided.innerRef}
                                                                    {...provided.draggableProps}
                                                                    {...provided.dragHandleProps}
                                                                    className={`mb-2 p-3 rounded-md bg-gray-700 border ${snapshot.isDragging
                                                                        ? 'border-sky-500 shadow-lg ring-2 ring-sky-500 ring-opacity-50'
                                                                        : 'border-gray-600 shadow-sm hover:border-gray-500'
                                                                        } transition-all duration-200`}
                                                                >
                                                                    {editingCard &&
                                                                        editingCard.listIndex === ind &&
                                                                        editingCard.cardId === item.id ? (
                                                                        <div>
                                                                            <textarea
                                                                                value={editTitle}
                                                                                onChange={(e) => setEditTitle(e.target.value)}
                                                                                className="w-full p-2 rounded-md bg-gray-600 border border-gray-500 text-gray-200 placeholder-gray-400 focus:border-sky-500"
                                                                                placeholder="Enter card title..."
                                                                                rows="2"
                                                                                autoFocus
                                                                            />
                                                                            <div className="flex items-center mt-2">
                                                                                <button
                                                                                    onClick={() => saveEdit(ind, item.id)}
                                                                                    className="px-3 py-1 bg-sky-600 text-white rounded-md hover:bg-sky-700 focus:ring-2 focus:ring-sky-500 mr-2 transition-all"
                                                                                >
                                                                                    Save
                                                                                </button>
                                                                                <button
                                                                                    onClick={cancelEdit}
                                                                                    className="p-2 rounded-md hover:bg-gray-600 focus:ring-2 focus:ring-sky-500 transition-all"
                                                                                >
                                                                                    <X size={16} className="text-gray-300" />
                                                                                </button>
                                                                            </div>
                                                                        </div>
                                                                    ) : (
                                                                        <div className="group">
                                                                            <div className="flex justify-between items-start">
                                                                                <span className="text-gray-200 leading-snug">{item.title}</span>
                                                                                <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                                                    <button
                                                                                        onClick={() => startEditing(ind, item.id, item.title)}
                                                                                        className="p-1 rounded-md hover:bg-gray-600 focus:ring-2 focus:ring-sky-500 transition-all"
                                                                                    >
                                                                                        <Edit2 size={14} className="text-gray-400 hover:text-white" />
                                                                                    </button>
                                                                                    <button
                                                                                        onClick={() => deleteCard(ind, item.id)}
                                                                                        className="p-1 rounded-md hover:bg-red-900 focus:ring-2 focus:ring-red-500 transition-all"
                                                                                    >
                                                                                        <Trash2 size={14} className="text-red-400 hover:text-red-300" />
                                                                                    </button>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            )}
                                                        </Draggable>
                                                    ))}
                                                {provided.placeholder}
                                            </div>
                                        )}
                                    </Droppable>
                                    <CardAdd getcard={(e) => cardData(e, ind)} />
                                </div>
                            ))}
                    </DragDropContext>
                    <AddList getlist={(e) => listData(e)} />
                </div>
            </div>
        </div>
    );
};

export default Main;
