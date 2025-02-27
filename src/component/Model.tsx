export function Modal({
                          isOpen,
                          onClose,
                          children,
                      }: {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}) {
    if (!isOpen) return null;

    return (
        <>
            <div className=" fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                <div className="bg-white rounded-lg p-6 w-[600px]">
                    <button
                        onClick={onClose}
                        className="font-bold absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                    >
                        &times;
                    </button>
                    <div>{children}</div>
                </div>
            </div>
        </>
    );
}