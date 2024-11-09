interface ProgressBarProps {
  containerClassName?: string;
  progressClassName?: string;
  percentage: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  containerClassName,
  progressClassName,
  percentage,
}) => {
  return (
    <div className={containerClassName || "h-2 w-full rounded-lg bg-slate-100"}>
      <div
        className={progressClassName || "h-full rounded-lg bg-sky-500"}
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
};

export default ProgressBar;
