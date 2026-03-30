import { useState } from "react";

export default function ToggleButtons() {
  const [open, setOpen] = useState(null);

  return (
    <div>
      <button onClick={()=>setOpen(open === "personal"? null : "personal")}>personal</button>
    </div>
  );
}
