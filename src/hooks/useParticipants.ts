import {useEffect, useState} from "react";
import type {ParticipantPostType, ParticipantType} from "../types/participantType.ts";
import Api from "../utils/Api.tsx";

export default function useParticipants () {
  const[participants, setParticipants] = useState<ParticipantType[]>([]);
  const[isLoading, setIsLoading] = useState<boolean>(false);

  const getParticipants = async () => {
    setIsLoading(true);
    try {
      const data: ParticipantType[] = await Api.get("participants");
      setParticipants(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

    const createParticipant = async (newParticipant: ParticipantPostType) => {
        setIsLoading(true);
        try {
        const data: ParticipantType = await Api.post("participants", newParticipant);
        setParticipants(prevParticipants => [...prevParticipants, data]);
        } catch (error) {
        console.error(error);
        } finally {
        setIsLoading(false);
        }
    }

    const putParticipant = async (body: ParticipantType) => {
        setIsLoading(true);
        try {
        const data: ParticipantType = await Api.put("participants", body.id, body);
        setParticipants(prevEntity1 => prevEntity1.map(entity1 => entity1.id === data.id ? data : entity1));
        } catch (error) {
        console.error(error);
        } finally {
        setIsLoading(false);
        }
    }

    const deleteParticipant = async (id: number) => {
        setIsLoading(true);
        try {
        await Api.delete("participants", id);
        setParticipants(participants.filter(entity1 => entity1.id !== id));
        } catch (error) {
        console.error(error);
        } finally {
        setIsLoading(false);
        }
    }

    useEffect(() => {
        getParticipants();
    }, []);

    return ({participants, createParticipant, putParticipant, deleteParticipant, isLoading});
}