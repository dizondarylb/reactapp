import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState, useRef } from 'react'
import axios from 'axios'

const UpdateForm = ({ handleUpdate, showModal, setShowModal, dataValue, setDataValue, updateType }) => {

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDataValue((prevData) => ({ ...prevData, [name]: value }));
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        handleUpdate(dataValue, updateType.toLowerCase());
        setShowModal(false);
    }

  return (
    <div className='my-4'>
        <Transition appear show={showModal} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={() => setShowModal(false)}>
            <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
            >
                <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <div className="fixed inset-0 overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-4 text-center">
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                >
                    <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                        <form onSubmit={handleSubmit}>
                            <Dialog.Title
                                as="h3"
                                className="text-lg font-medium leading-6 text-gray-900"
                            >
                                {updateType} Name
                            </Dialog.Title>
                            <div className="mt-2">
                                <input type="text" name="name" value={dataValue.name} onChange={handleChange} className="px-2 mx-2 my-4 w-full max-w-md rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 sm:text-sm sm:leading-6" />
                            </div>

                            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                <button type="submit" className="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 sm:ml-3 sm:w-auto">Update {updateType}</button>
                                <button type="button" className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto" onClick={() => setShowModal(false)}>Cancel</button>
                            </div>
                        </form>
                    </Dialog.Panel>
                </Transition.Child>
                </div>
            </div>
            </Dialog>
        </Transition>
    </div>
  )
}

export default UpdateForm;