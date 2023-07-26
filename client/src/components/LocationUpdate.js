import { Fragment } from 'react'
import { Popover, Transition  } from '@headlessui/react'
import { FolderArrowDownIcon } from '@heroicons/react/24/outline'

export default function LocationUpdate({ handleUpdate, currentLocation, directories, data, type }) {
  return (
    <Popover className="relative mr-2">
        <Popover.Button><FolderArrowDownIcon className="inline-flex h-6 w-6 text-blue-500" /></Popover.Button>
        <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
            >
            <Popover.Panel className="absolute left-1/2 z-10 mt-3 w-screen max-w-sm -translate-x-1/2 transform px-4 sm:px-0">
                <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                    <div className="relative bg-white p-7">
                        {currentLocation && currentLocation.parent_location_id !== null && (
                            <button
                                className="-m-4 mb-2 flex w-full max-w-sm items-center rounded-lg p-2 transition duration-150 ease-in-out hover:bg-gray-200 focus:outline-none"
                                onClick={() => handleUpdate({ id: data.id, name: data.name, location_id: currentLocation.parent_location_id }, type)}
                            >
                                Move out to {currentLocation.name}
                            </button>
                        )}
                        {directories.map((directory) => {
                            return (
                                <button
                                    key={directory.id}
                                    className="-m-4 flex w-full max-w-sm items-center rounded-lg p-2 transition duration-150 ease-in-out hover:bg-gray-200 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                                    onClick={() => handleUpdate({ id: data.id, name: data.name, location_id: directory.id }, type)}
                                >
                                    Move to {directory.name}
                                </button>
                            )
                        })}
                    </div>
                </div>
            </Popover.Panel>
            </Transition>
    </Popover>
  )
}