import { useAppContext } from "@/app/utils/AppContext";

const ConfirmDeleteProjectModal = () => {
  const { confirmProjectDeleteModalObj } = useAppContext();
  const { isOpen, setIsOpen } = confirmProjectDeleteModalObj;

  const closeModal = () => setIsOpen(false);

  return (
    <div
      className={`${isOpen ? "" : "hidden"} fixed left-0 top-0 z-40 flex h-screen w-screen items-center justify-center bg-slate-800/50`}
    >
      <div className="flex w-[50%] max-w-2xl flex-col gap-8 rounded-md bg-white p-12 max-sm:w-80">
        <h1 className="text-lg font-semibold">Delete Project</h1>
        <p>
          Are you sure you want to remove this project? This action cannot be
          undone and will remove all projects associated with it.
        </p>
        <div className="flex items-center justify-end gap-4">
          <button
            className="flex w-20 items-center justify-center rounded-lg border border-slate-200 py-2 text-sm hover:bg-slate-100"
            onClick={closeModal}
          >
            Cancel
          </button>
          <button 
            className="flex w-20 items-center justify-center rounded-lg bg-red-500 py-2 text-sm font-medium text-white hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteProjectModal;
