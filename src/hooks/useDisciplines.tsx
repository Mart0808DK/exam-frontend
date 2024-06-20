import {useEffect, useState} from "react";
import type {DisciplineType} from "../types/disciplineType.ts";
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

    useEffect(() => {
        getDisciplines();
    }, []);


    return ({disciplines, isLoading});
}

export default UseDisciplines;