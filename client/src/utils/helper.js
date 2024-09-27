export const validEmail = (email) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  };
  
  export const gitInitials = (name) => {
    if (!name) return ''; 
  
    const initials = name
      .split(' ') 
      .map(part => part[0].toUpperCase()) 
      .slice(0, 2) 
      .join(''); 
  
    return initials;
  };
  