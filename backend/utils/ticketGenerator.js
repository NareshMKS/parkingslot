const generateTicketId = (lastTicketId) => {
  if (!lastTicketId) return 'TKT-1001';
  
  const prefix = 'TKT-';
  const number = parseInt(lastTicketId.replace(prefix, ''), 10);
  const nextNumber = number + 1;
  return `${prefix}${nextNumber}`;
};

module.exports = { generateTicketId };
