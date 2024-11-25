"use client";

import { Apps, BorderAll, Close } from "@mui/icons-material";
import { useAppDispatch, useAppSelector } from "@/hooks/storeHooks";
import { closeModal } from "@/store/slices/addProjectModalSlice";
import AddProjectForm from "../Forms/AddProjectForm";
import { useState } from "react";

const AddProjectModal = () => {
  const { isOpen, mode } = useAppSelector((state) => state.addProjectModal);
  const dispatch = useAppDispatch();

  const [isSelectingIcon, setIsSelectingIcon] = useState(false);

  return (
    <div
      className={`${isOpen ? "" : "hidden"} fixed left-0 top-0 z-50 flex h-screen w-screen items-center justify-center bg-slate-800/50`}
    >
      <div className="flex w-[50%] max-w-2xl flex-col items-center gap-10 rounded-md bg-white p-8 max-sm:w-80">
        {/* Header */}
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center rounded-md bg-sky-100 p-2">
              {!isSelectingIcon ? (
                <BorderAll sx={{ fontSize: "18px" }} className="text-sky-500" />
              ) : (
                <Apps sx={{ fontSize: "18px" }} className="text-sky-500" />
              )}
            </div>
            <span className="text-md font-bold">
              {!isSelectingIcon
                ? `${mode == "edit" ? "Edit" : "Add"} Project`
                : "All Icons"}
            </span>
          </div>
          {!isSelectingIcon ? (
            <button
              className="cursor-pointer text-slate-400 disabled:cursor-default disabled:text-slate-200"
              onClick={() => dispatch(closeModal())}
            >
              <Close />
            </button>
          ) : null}
        </div>
        {/* Form */}
        <AddProjectForm
          isSelectingIcon={isSelectingIcon}
          setIsSelectingIcon={setIsSelectingIcon}
        />
      </div>
    </div>
  );
};

export default AddProjectModal;
