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

export const stringHashedColor = (string: string): string => {
  let hash = 0;
  let i;

  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }

  return color;
};
