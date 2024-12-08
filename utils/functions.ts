export const timeSinceCreatedDisplay = (createdAt: string): string => {
  const creation = new Date(createdAt);
  const now = new Date();
  const differenceInTime = now.getTime() - creation.getTime();

  const minutesSinceCreated = differenceInTime / (1000 * 60);
  if (minutesSinceCreated < 0) {
    return "0 mins";
  }

  if (minutesSinceCreated < 60) {
    return `${Math.floor(minutesSinceCreated)} mins`;
  }

  const hoursSinceCreated = minutesSinceCreated / 60;

  if (hoursSinceCreated < 24) {
    return `${Math.floor(hoursSinceCreated)} hours`;
  }

  const daysSinceCreated = hoursSinceCreated / 24;
  return `${Math.floor(daysSinceCreated)} days`;
};

export const calculateProgressPercentage = (
  totalTasks: number,
  completedTasks: number,
): number => {
  return totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
};
