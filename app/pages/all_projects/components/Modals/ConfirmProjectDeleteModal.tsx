"use client";

import { useAppContext } from "@/app/utils/AppContext";
import { CircularProgress } from "@mui/material";
import { useState } from "react";
import toast from "react-hot-toast";

const ConfirmDeleteProjectModal = () => {
  const { confirmProjectDeleteModalObj, projectActions } = useAppContext();
  const { isOpen, setIsOpen, projectId } = confirmProjectDeleteModalObj;
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  const closeModal = () => setIsOpen(false);
  const deleteProject = () => {
    setIsDeleting(true);

    const tryDelete = async () => {
      await setTimeout(() => {
        if (Math.floor(Math.random() * 2) == 0)
          toast.error("Something went wrong");
        else {
          projectActions.delete(projectId);
          toast.success("Project deleted successfully");
        }
        setIsDeleting(false);
        closeModal();
      }, 1000);
    };

    tryDelete();
  };

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
            className="flex items-center justify-center rounded-lg border border-slate-200 p-4 py-2 text-sm hover:bg-slate-100"
            onClick={closeModal}
          >
            Cancel
          </button>
          <button
            className="flex items-center justify-center gap-2 rounded-lg bg-red-500 p-4 py-2 text-sm font-medium text-white hover:bg-red-600 disabled:bg-red-600"
            onClick={deleteProject}
            disabled={isDeleting}
          >
            {isDeleting ? (
              <>
                <span>Deleting...</span>
                <CircularProgress size="1rem" sx={{ color: "white" }} />
              </>
            ) : (
              <span>Delete</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteProjectModal;
