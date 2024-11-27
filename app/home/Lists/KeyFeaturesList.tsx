import {
  AddTask,
  BarChart,
  DesignServices,
  LockPerson,
} from "@mui/icons-material";

type Feature = {
  id: string;
  icon: React.ReactNode;
  heading: string;
  description: string;
};

const features: Feature[] = [
  {
    id: "1",
    icon: <AddTask fontSize="small" className="text-sky-500" />,
    heading: "Efficient Task Management",
    description:
      "Stay organized by sorting tasks by priority, due date, or custom criteria. Our platform makes it easy to manage your daily tasks and projects in one place.",
  },
  {
    id: "2",
    icon: <BarChart fontSize="small" className="text-sky-500" />,
    heading: "Real-Time Progress Tracking",
    description:
      "Visualize your progress with real-time updates and intuitive progress bars. Track your tasks from start to finish, ensuring you're always on schedule.",
  },
  {
    id: "3",
    icon: <DesignServices fontSize="small" className="text-sky-500" />,
    heading: "Intuitive, User-Friendly Design",
    description:
      "Enjoy a clean and modern interface designed to enhance productivity. With simple navigation and streamlined tools, managing projects has never been easier.",
  },
  {
    id: "4",
    icon: <LockPerson fontSize="small" className="text-sky-500" />,
    heading: "Secure and Simple Login",
    description:
      "Safely access your projects anytime, anywhere with a secure login system. Our platform ensures your data is protected, giving you peace of mind.",
  },
];

const KeyFeaturesList = () => {
  const KeyFeature = ({ feature }: { feature: Feature }) => {
    return (
      <div className="flex w-72 flex-col items-center gap-4 rounded-lg bg-white p-4 shadow-md">
        <div className="flex aspect-square w-16 items-center justify-center rounded-full bg-sky-100">
          {feature.icon}
        </div>
        <h3 className="text-center font-semibold text-sky-500">
          {feature.heading}
        </h3>
        <p className="mb-12 text-center text-xs font-medium text-slate-500">
          {feature.description}
        </p>
      </div>
    );
  };
  return (
    <div className="flex w-full flex-wrap justify-center gap-8">
      {features.map((feature) => (
        <KeyFeature key={feature.id} feature={feature} />
      ))}
    </div>
  );
};

export default KeyFeaturesList;
