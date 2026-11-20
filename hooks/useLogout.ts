"use client"

import { useMutation } from "@tanstack/react-query"
import { api } from "@/lib/api/client"
import { toast } from "sonner"

export function useLogout() {
  return useMutation({
    mutationFn: api.logout,
    onSuccess: () => {
      toast.success("Logged out successfully")
      // Redirect to home page after logout
      window.location.assign("/")
    },
    onError: () => {
      toast.error("Failed to logout. Please try again.")
    },
  })
}
