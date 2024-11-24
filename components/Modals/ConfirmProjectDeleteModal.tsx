"use client";

import { useAppDispatch, useAppSelector } from "@/hooks/storeHooks";
import { selectProject } from "@/store/Selectors";
import { setConfirmDeleteModal } from "@/store/slices/confirmDeleteModalSlice";
import { deleteProject, deleteTask } from "@/store/slices/projectsSlice";
import { CircularProgress } from "@mui/material";

const ConfirmDeleteModal = () => {
  const { isOpen, objectId, isDisabled, objectIdType } = useAppSelector(
    (state) => state.confirmDeleteModal,
  );
  const project = useAppSelector(selectProject(objectId));
  const dispatch = useAppDispatch();

  return (
    <div
      className={`${isOpen ? "" : "hidden"} fixed left-0 top-0 z-40 flex h-screen w-screen items-center justify-center bg-slate-800/50`}
    >
      <div className="flex w-[50%] max-w-2xl flex-col gap-8 rounded-md bg-white p-12 max-sm:w-80">
        <h1 className="text-lg font-semibold">
          Delete {objectIdType === "project" ? "Project" : "Task"}
        </h1>
        {objectIdType === "project" ? (
          <p>
            Are you sure you want to remove this project? This action cannot be
            undone and will remove all{" "}
            {project?.tasks.length ? (
              <span className="font-bold">{project.tasks.length}</span>
            ) : null}{" "}
            tasks associated with it.
          </p>
        ) : (
          <p>
            Are you sure you want to delete this task? This action cannot be
            undone.
          </p>
        )}
        <div className="flex items-center justify-end gap-4">
          <button
            className="flex items-center justify-center rounded-lg border border-slate-200 p-4 py-2 text-sm hover:bg-slate-100"
            onClick={() => dispatch(setConfirmDeleteModal({ isOpen: false }))}
          >
            Cancel
          </button>
          <button
            className="flex items-center justify-center gap-2 rounded-lg bg-red-500 p-4 py-2 text-sm font-medium text-white hover:bg-red-600 disabled:bg-red-600"
            onClick={() =>
              objectIdType == "project"
                ? dispatch(deleteProject(objectId))
                : dispatch(deleteTask(objectId))
            }
            disabled={isDisabled}
          >
            {isDisabled ? (
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

export default ConfirmDeleteModal;
