import { useState } from 'react';
import axios from 'axios';
import { FolderIcon, TrashIcon, ArrowUturnLeftIcon, NewspaperIcon, PencilSquareIcon, InboxArrowDownIcon } from '@heroicons/react/24/outline';
import LocationUpdate from './LocationUpdate';
import UpdateForm from './UpdateForm';


const DataList = ({ currentLocation, directories, books, fetchData, setModal }) => {
    const [showModal, setShowModal] = useState(false);
    const [dataValue, setDataValue] = useState('');
    const [updateType, setUpdateType] = useState(null);

    const handleDelete = async (id, type) => {
        if (type === 'directory') {
            const response = await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/api/locations/${id}`);
            fetchData(currentLocation.id);
            setModal({ isOpen: true, message: response.data.message });
        } else if (type === 'book') {
            const response = await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/api/books/${id}`);
            fetchData(currentLocation.id);
            setModal({ isOpen: true, message: response.data.message });
        }
    }

    const handleUpdate = async (data, type) => {
        if (type === 'directory') {
            const parentLocationId = data.location_id ? data.location_id : data.parent_location_id;
            const response = await axios.put(`${process.env.REACT_APP_API_BASE_URL}/api/locations/${data.id}`, { name: data.name, parent_location_id: parentLocationId});
            fetchData(currentLocation.id);
            setModal({ isOpen: true, message: response.data.message });
        } else if (type === 'book') {
            const response = await axios.put(`${process.env.REACT_APP_API_BASE_URL}/api/books/${data.id}`, { name: data.name, location_id: data.location_id});
            fetchData(currentLocation.id);
            setModal({ isOpen: true, message: response.data.message });
        }
    }

    const handleEdit = async (data, type) => {
        setDataValue(data);
        setUpdateType(type);
        setShowModal(true);
    }


    return (
        <div className="justify-between bg-white px-4 sm:px-6">
            <UpdateForm handleUpdate={handleUpdate} showModal={showModal} setShowModal={setShowModal} dataValue={dataValue} setDataValue={setDataValue} updateType={updateType} />
            <ul role="list" className="my-4 px-4 divide-y divide-gray-100 rounded-md border border-gray-200">
                {currentLocation && currentLocation.parent_location_id !== null && (
                    <li className="flex justify-between gap-x-6 py-5">
                        <ArrowUturnLeftIcon className="h-6 w-6 text-blue-500 cursor-pointer" onClick={() => fetchData(currentLocation.parent_location_id) } />
                    </li>
                )}
                {directories && directories.map((directory) => (
                    <li key={directory.id} className="flex justify-between gap-x-6 py-5">
                        <div className="flex gap-x-4 cursor-pointer" onClick={() => fetchData(directory.id) }>
                            <FolderIcon className="h-6 w-6 text-blue-500" />
                            <div className="min-w-0 flex-auto">
                                <p className="text-sm font-semibold leading-6 text-gray-900">{directory.name}</p>
                            </div>
                        </div>
                        <div className="flex flex-row sm:items-end">
                            <PencilSquareIcon className="inline-flex mr-2 h-6 w-6 text-green-500 cursor-pointer" onClick={() => handleEdit(directory, 'Directory')} />
                            {(directories.filter(x => x.id !== directory.id).length > 0 || currentLocation.parent_location_id !== null) && (
                                <LocationUpdate handleUpdate={handleUpdate} currentLocation={currentLocation} directories={directories.filter(x => x.id !== directory.id)} data={directory} type={'directory'} />
                            )}
                            <TrashIcon className="inline-flex h-6 w-6 text-red-500 cursor-pointer" onClick={() => handleDelete(directory.id, 'directory') } />
                        </div>
                    </li>
                ))}
                {books && books.map((book) => (
                    <li key={book.id} className="flex justify-between gap-x-6 py-5">
                        <div className="flex gap-x-4">
                            <NewspaperIcon className="h-6 w-6 text-blue-500" />
                            {book.editing ? (
                                <>
                                    <div className="min-w-0 flex">
                                        <input type="text" value={book.name} className="inline-flex px-2 mx-2 w-full max-w-md rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 sm:text-sm sm:leading-6"></input>
                                        <InboxArrowDownIcon className="inline-flex h-6 w-6 text-green-500 cursor-pointer" />
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="min-w-0 flex-auto">
                                        <p className="text-sm font-semibold leading-6 text-gray-900">{book.name}</p>
                                    </div>
                                </>
                            )}
                        </div>
                        <div className="flex flex-row sm:items-end">
                            <PencilSquareIcon className="inline-flex mr-2 h-6 w-6 text-green-500 cursor-pointer" onClick={() => handleEdit(book, 'Book')} />
                            <LocationUpdate handleUpdate={handleUpdate} currentLocation={currentLocation} directories={directories} data={book} type={'book'} />
                            <TrashIcon className="inline-flex h-6 w-6 text-red-500 cursor-pointer" onClick={() => handleDelete(book.id, 'book') } />
                        </div>
                    </li>
                ))}
                {books.length === 0 && directories.length === 0 && (
                    <li className="flex justify-between gap-x-6 py-5">
                        <p className="text-sm font-semibold leading-6 text-gray-900">Location is empty</p>
                    </li>
                )}
            </ul>
        </div>
    );
}

export default DataList;