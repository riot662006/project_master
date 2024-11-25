import LoadingOverlay from "../Overlays/LoadingOverlay";

export interface LoadingContainerProps {
  children: React.ReactNode;
  className?: string;
}

const LoadingContainer = ({ children, className }: LoadingContainerProps) => {
  return (
    <div className={`relative ${className}`}>
      {children}

      {<LoadingOverlay />}
    </div>
  );
};

export default LoadingContainer;
