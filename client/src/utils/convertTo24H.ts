export const convertTo24HourFormat = (time: string) => {
  const [timePart, modifier] = time.split(" ");
  const [hours, minutes] = timePart.split(":").map(Number);
  let adjustedHours = hours;
  if (modifier === "PM" && adjustedHours !== 12) {
    adjustedHours += 12; // Convertir PM en format 24h
  } else if (modifier === "AM" && adjustedHours === 12) {
    adjustedHours = 0; // Convertir 12 AM en 0 heures
  }
  return `${adjustedHours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
};
