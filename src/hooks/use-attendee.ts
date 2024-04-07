import { useCallback, useState } from "react";
import { api } from "@/service/axios";

export function useAttendee() {
  const [attendeeBadgeLoading, setAttendeeBadgeLoading] =
    useState<boolean>(false);

  const getAttendeeBadge = useCallback(async (attendeeId: string) => {
    try {
      setAttendeeBadgeLoading(true);

      const response = await api.get(`/attendees/${attendeeId}/badge`);
      return response;
    } catch (error) {
      throw error;
    } finally {
      setAttendeeBadgeLoading(false);
    }
  }, []);

  return {
    attendeeBadgeLoading,
    getAttendeeBadge,
  };
}
