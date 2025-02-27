export function MonitoringLog() {
    return (
        <>
            <h1>Logs</h1>
            <div className="flex justify-end mt-4 mr-56">
                <button>New Log</button>
            </div>

            {/*Logs Table */}
            <div
                className="relative overflow-x-auto w-5/6 shadow-md sm:rounded-lg mt-6 ml-28"
            >
                <table className="w-full text-sm text-left rtl:text-right text-black">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Log Id
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Log Date
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Log Details
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Observed Image
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Actions
                        </th>
                    </tr>
                    </thead>
                    <tbody className="bg-slate-100 cursor-pointer">
                    <tr className="hover:bg-slate-200 border-b border-gray-950 font-bold">
                        <td className="px-6 py-4">3</td>
                        <td className="px-6 py-4">2024.11.21</td>
                        <td className="px-6 py-4">observation 03</td>
                        <td className="px-6 py-4"></td>
                        <td className="px-6 py-4">
                            <a
                                href="#"
                                className="font-medium text-blue-600 hover:underline"
                            >
                                Edit
                            </a>
                            <a
                                href="#"
                                className="font-medium text-red-600 hover:underline ml-2"
                            >
                                Delete
                            </a>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </>
    )
}