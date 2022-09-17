export function truncateAddress(address) {
  if (!address) {
    return "0x000...000";
  }

  return address.slice(0, 5) + "..." + address.slice(-3);
}
