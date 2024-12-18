/**
 * A functional component that renders a horizontal separator with the word "or" in the center.
 * This is typically used to visually separate two sections or options in a user interface.
 */

const OrSeperatorDiv = () => {
    return (
        <div className="flex items-center gap-2">
            <hr className="w-full border-slate-300" />
            <span className="text-sm text-slate-300">or</span>
            <hr className="w-full border-slate-300" />
        </div>
    )
};

export default OrSeperatorDiv;