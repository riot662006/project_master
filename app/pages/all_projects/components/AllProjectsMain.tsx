import AllProjectHeader from "./AllProjectHeader"
import AllProjectSubHeader from "./AllProjectsSubHeader";

const AllProjectsMain = () => {
    return (
        <div className="flex flex-col h-full w-full px-8 py-10">
            <AllProjectHeader />
            <AllProjectSubHeader />
        </div>
    )
}
export default AllProjectsMain;