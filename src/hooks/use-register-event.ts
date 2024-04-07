import { useCallback, useState } from "react";
import { api } from "@/service/axios";

type RegisterForEventRequest = {
  eventId: string;
  name: string;
  email: string;
};

export function useRegisterEvent() {
  const [registerForEventLoading, setRegisterForEventLoading] =
    useState<boolean>(false);

  const registerForEvent = useCallback(
    async ({ eventId, name, email }: RegisterForEventRequest) => {
      try {
        setRegisterForEventLoading(true);

        const response = await api.post(`/events/${eventId}/attendees`, {
          name,
          email,
        });
        return response;
      } catch (error) {
        throw error;
      } finally {
        setRegisterForEventLoading(false);
      }
    },
    []
  );

  return {
    registerForEventLoading,
    registerForEvent,
  };
}
