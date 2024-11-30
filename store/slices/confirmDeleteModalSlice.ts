import { createSlice, isPending, PayloadAction } from "@reduxjs/toolkit";
import { ConfirmDeleteModalObjectType } from "@/utils/types";

interface ConfirmDeleteModalState {
  isOpen: boolean;
  objectId: string;
  objectIdType: ConfirmDeleteModalObjectType;
}

const confirmDeleteModalSlice = createSlice({
  name: "confirmDeleteModal",
  initialState: {
    isOpen: false,
    objectId: "",
    objectIdType: "project",
  } as ConfirmDeleteModalState,
  reducers: {
    setConfirmDeleteModal: (
      state,
      action: PayloadAction<{
        isOpen: boolean;
        projectOrTaskId?: string;
        idType?: ConfirmDeleteModalObjectType;
      }>,
    ) => {
      state.isOpen = action.payload.isOpen;

      state.objectId = action.payload.projectOrTaskId || "";
      state.objectIdType = action.payload.idType || "project";
    },
  },
});

export const { setConfirmDeleteModal } = confirmDeleteModalSlice.actions;
export default confirmDeleteModalSlice.reducer;
