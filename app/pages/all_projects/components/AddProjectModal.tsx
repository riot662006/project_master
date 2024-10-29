import { useAppContext } from "@/app/utils/AppContext";
import { Apps, BorderAll, Close, LibraryBooks } from "@mui/icons-material";
import { useLayoutEffect } from "react";
import { FieldErrors, SubmitHandler, useForm, UseFormRegister } from "react-hook-form";
import SelectProjectIconSection from "./SelectProjectIconSection";

interface IFormInput {
    name: string
}

const AddProjectModal = () => {
    const { addProjectModalObj } = useAppContext();
    const { isOpen, setIsOpen, mode, setMode } = addProjectModalObj;

    const closeModal = () => setIsOpen(false);

    const {
        register,
        formState: { errors },
        handleSubmit,
        reset
    } = useForm<IFormInput>()

    const onSubmit: SubmitHandler<IFormInput> = (data) => {
        console.log(data);
        reset();
        closeModal();
    }

    useLayoutEffect(() => {
        // will reset all inputs on open
        if (isOpen) {
            reset();
        }
    }, [isOpen, reset]);

    return (
        <div className={`${!isOpen && "hidden"} fixed flex items-center justify-center top-0 left-0 w-screen h-screen z-40 bg-slate-800/50`}>
            <div className={`${mode != "default" && "hidden"} flex flex-col items-center w-[50%] max-w-2xl p-8 gap-10 bg-white rounded-md max-sm:w-80`}>
                <Header />
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-col gap-10 w-full"
                >
                    <ProjectInput register={register} errors={errors} />
                    <Footer />
                </form>
            </div>
            <div className={`${mode != "select-icon" && "hidden"}  flex flex-col items-center w-[50%] max-w-2xl p-8 gap-10 bg-white rounded-md max-sm:w-80`}>
                <SelectProjectIconSection />
            </div>
        </div>
    )
};

const Header = () => {
    const { addProjectModalObj } = useAppContext();
    const { setIsOpen } = addProjectModalObj;

    const closeModal = () => setIsOpen(false);

    return (
        <div className="flex w-full items-center justify-between">
            <div className="flex items-center gap-2">
                <div className="flex items-center justify-center p-2 rounded-md bg-orange-100">
                    <BorderAll sx={{ fontSize: "18px" }} className="text-orange-500" />
                </div>
                <span className="font-bold text-md">Add Project</span>
            </div>
            <Close className="text-slate-400 cursor-pointer" onClick={closeModal} />
        </div>
    )
}

interface ProjectInputProps {
    register: UseFormRegister<IFormInput>,
    errors: FieldErrors<IFormInput>
}

const ProjectInput = ({ register, errors }: ProjectInputProps) => {
    const { addProjectModalObj } = useAppContext();
    const { setMode } = addProjectModalObj;
    const openIconSelect = () => setMode('select-icon');

    const preventSubmitOnEnter = (e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => { e.key === 'Enter' && e.preventDefault() };

    return (
        <div className="flex flex-col w-full gap-2">
            <p className="text-sm font-semibold">Project Name</p>
            <div className="flex flex-col gap-2 ml-2">
                <div className="flex items-center w-full gap-4">
                    <div className="flex-grow p-2 border border-slate-200 rounded-md">
                        <input
                            {...register(("name"),
                                {
                                    required: "Project name is required",
                                    maxLength: { value: 30, message: "Project name must be 30 characters or less" }
                                })}
                            placeholder="Enter Project Name..."
                            className="w-full bg-transparent text-sm outline-none"
                            onKeyDown={preventSubmitOnEnter}
                        />
                    </div>
                    <button
                        type="button"
                        className="bg-orange-500 p-2 rounded-md hover:bg-orange-600 transition-colors"
                        onClick={openIconSelect}
                    >
                        <LibraryBooks className="text-white" />
                    </button>
                </div>
                <p className="text-sm text-red-500 font-medium">{errors.name?.message}</p>
            </div>
        </div>
    )
}

const Footer = () => {
    const { addProjectModalObj } = useAppContext();
    const { setIsOpen } = addProjectModalObj;

    const closeModal = () => setIsOpen(false);

    return (
        <div className="flex w-full gap-4 justify-end transition-colors">
            <button
                onClick={closeModal}
                className="h-8 border rounded-md  text-slate-400 p-4 text-xs flex items-center cursor-pointer max-sm:px-2 hover:bg-slate-50"
            >
                <span className="font-medium">Cancel</span>
            </button>
            <button
                type="submit"
                className="h-8 rounded-md bg-orange-500 text-white p-4 pr-4 text-xs flex items-center cursor-pointer max-sm:px-2 hover:bg-orange-600"
            >
                <span className="font-medium">Add Project</span>
            </button>
        </div>
    )
}

export default AddProjectModal;
