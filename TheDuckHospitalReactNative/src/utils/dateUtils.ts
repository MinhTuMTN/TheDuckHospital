export const getDateObject = (date: string) => {
  const dateObject = new Date(date);
  return dateObject;
};

export const getDayOfWeek = (date: string) => {
  const days = [
    'Chủ nhật',
    'Thứ hai',
    'Thứ ba',
    'Thứ tư',
    'Thứ năm',
    'Thứ sáu',
    'Thứ bảy',
  ];
  const dateObject = getDateObject(date);
  return days[dateObject.getDay()];
};

export const formatDate = (date: string, sperator?: string) => {
  sperator = sperator || '/';

  const dateObject = getDateObject(date);
  const day = dateObject.getDate().toString().padStart(2, '0');
  const month = (dateObject.getMonth() + 1).toString().padStart(2, '0');
  const year = dateObject.getFullYear();
  return `${day}${sperator}${month}${sperator}${year}`;
};
