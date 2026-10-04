"use client";

import { useEffect, useState } from "react";
import { ISOtoHuman } from "utils/formatTime";

export default function DateTime({ dt, showWeekDay = false }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;
  return ISOtoHuman(dt, showWeekDay);
}
