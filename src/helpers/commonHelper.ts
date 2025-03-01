export const formatDateAndTime = (isoString : string) =>{
  const dateObj = new Date(isoString);
    
  const date = dateObj.toISOString().split('T')[0];

  const time = dateObj.toISOString().split('T')[1].split('.')[0];

  return { date, time };
}

export default{
  formatDateAndTime
}