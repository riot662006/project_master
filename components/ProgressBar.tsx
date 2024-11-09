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
    <div className={`h-2 w-full rounded-lg bg-slate-100 ${containerClassName}`}>
      <div
        className={`h-full rounded-lg bg-sky-500 ${progressClassName}`}
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
};

export default ProgressBar;
