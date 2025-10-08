"use client"

import { useMaintenance } from "@/lib/hooks/use-maintenance"
import MaintenanceMode from "./maintenance-mode"

export default function MaintenanceModeWrapper() {
  const { isMaintenanceMode } = useMaintenance()
  
  return <MaintenanceMode isEnabled={isMaintenanceMode} />
}
