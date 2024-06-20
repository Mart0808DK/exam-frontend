import {useEffect, useState} from "react";
import type {DisciplinePostType, DisciplineType} from "../types/disciplineType.ts";
import Api from "../utils/Api.tsx";

function UseDisciplines() {
    const [disciplines, setDisciplines] = useState<DisciplineType[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const getDisciplines = async () => {
        setIsLoading(true);
        try {
            const data: DisciplineType[] = await Api.get("discipline");
            setDisciplines(data);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }

    const createDiscipline = async (newDiscipline: DisciplinePostType) => {
        setIsLoading(true);
        try {
            const data = await Api.post("discipline", newDiscipline);
            setDisciplines(prevDisciplines => [...prevDisciplines, data]);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }

    const updateDiscipline = async (body: DisciplineType) => {
        setIsLoading(true);
        try {
            const data: DisciplineType = await Api.put("discipline", body.id, body);
            setDisciplines(prevDisciplines => prevDisciplines.map(discipline => discipline.id === data.id ? data : discipline));
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        getDisciplines();
    }, []);


    return ({disciplines, isLoading, createDiscipline, updateDiscipline});
}

export default UseDisciplines;