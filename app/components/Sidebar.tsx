import { BorderAll, Logout, Splitscreen } from '@mui/icons-material';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import { orange } from '@mui/material/colors';

const Sidebar = () => {
    return (
        <div className="flex flex-col py-8 w-20 items-center justify-between border-r max-sm:hidden">
            <Logo />
            <Menu />
            <Profile />
        </div>
    )
};

const Logo = () => {
    return <TaskAltIcon fontSize='large' className='text-orange-500' />
};

const Menu = () => {
    return (
        <div className="grid gap-y-8">
            <BorderAll className="text-orange-500 cursor-pointer"/>
            <Splitscreen className="text-slate-300 cursor-pointer"/>
            <Logout className="text-slate-300 cursor-pointer"/>
        </div>
    )
};

const Profile = () => {
    return <div className="w-8 h-8 bg-orange-500 rounded-md" ></div>
};

export default Sidebar;