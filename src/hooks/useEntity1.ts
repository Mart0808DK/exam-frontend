import {useEffect, useState} from "react";
import type {Entity1PostType, Entity1Type} from "../types/entity1Type.ts";
import Api from "../utils/Api.tsx";

export default function useEntity1 () {
  const[entity1, setEntity1] = useState<Entity1Type[]>([]);
  const[isLoading, setIsLoading] = useState<boolean>(false);

  const getEntity1 = async () => {
    setIsLoading(true);
    try {
      const data: Entity1Type[] = await Api.get("entity1");
      setEntity1(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

    const createEntity1 = async (newEntity1: Entity1PostType) => {
        setIsLoading(true);
        try {
        const data: Entity1Type = await Api.post("entity1", newEntity1);
        setEntity1(prevEntity1 => [...prevEntity1, data]);
        } catch (error) {
        console.error(error);
        } finally {
        setIsLoading(false);
        }
    }

    const putEntity1 = async (body: Entity1Type) => {
        setIsLoading(true);
        try {
        const data: Entity1Type = await Api.put("entity1", body.id, body);
        setEntity1(prevEntity1 => prevEntity1.map(entity1 => entity1.id === data.id ? data : entity1));
        } catch (error) {
        console.error(error);
        } finally {
        setIsLoading(false);
        }
    }

    const deleteEntity1 = async (id: number) => {
        setIsLoading(true);
        try {
        await Api.delete("entity1", id);
        setEntity1(entity1.filter(entity1 => entity1.id !== id));
        } catch (error) {
        console.error(error);
        } finally {
        setIsLoading(false);
        }
    }

    useEffect(() => {
        getEntity1();
    }, []);

    return ({entity1, isLoading, getEntity1, createEntity1, putEntity1, deleteEntity1});
}