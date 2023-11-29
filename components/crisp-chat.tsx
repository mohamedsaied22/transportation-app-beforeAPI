"use client";

import { useEffect } from "react";
import { Crisp } from "crisp-sdk-web";

export const CrispChat = () => {
  useEffect(() => {
    Crisp.configure("d93038a9-e94d-4a87-a424-3e2027900d12");
  }, []);

  return null;
};