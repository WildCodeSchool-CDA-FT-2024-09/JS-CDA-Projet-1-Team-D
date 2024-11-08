import { ChangeEventHandler, useState } from "react";
import { setHours, setMinutes } from "date-fns";

interface InputTimeProps {
  available: string;
  setAvailable: (time: string) => void;
}

export function InputTime({ available, setAvailable }: InputTimeProps) {
  const [selected, setSelected] = useState<Date>();

  const handleTimeChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const time = e.target.value;
    const [hours, minutes] = time.split(":").map((str) => parseInt(str, 10));

    let adjustedHours = hours;
    let period = "AM";

    if (hours >= 12) {
      period = "PM";
      adjustedHours = hours > 12 ? hours - 12 : 12;
    } else {
      adjustedHours = hours === 0 ? 12 : hours;
    }

    const timeWithPeriod = `${String(adjustedHours).padStart(2, "0")}:${String(minutes).padStart(2, "0")} ${period}`;

    if (!selected) {
      setAvailable(timeWithPeriod);
      return;
    }

    const newSelectedDate = setHours(setMinutes(selected, minutes), hours);
    setSelected(newSelectedDate);
    setAvailable(timeWithPeriod);
  };

  const formattedTime = (() => {
    if (!available) return "";
    const [hoursMinutes, period] = available.split(" ");
    const [hours, minutes] = hoursMinutes.split(":").map(Number);
    const adjustedHours =
      period === "PM" && hours < 12
        ? hours + 12
        : period === "AM" && hours === 12
          ? 0
          : hours;
    return `${String(adjustedHours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
  })();

  return (
    <div className="time-picker-ctn">
      <div className="input-time-picker-ctn">
        <label className="time-picker-label">Disponibilité : </label>
        <input type="time" value={formattedTime} onChange={handleTimeChange} />
      </div>
    </div>
  );
}
