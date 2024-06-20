import {useEffect, useState} from "react";
import Api from "../utils/Api.tsx";
import type {ResultPostType, ResultType} from "../types/resultType.ts";

function UseResults() {
    const [results, setResults] = useState<ResultType[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const getResults = async () => {
        setIsLoading(true);
        try {
            const data: ResultType[] = await Api.get("results");
            setResults(data);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }

    const createResult = async (newResult: ResultPostType) => {
        setIsLoading(true);
        try {
            const data = await Api.post("results", newResult);
            setResults(prevResults => [...prevResults, data]);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }

    const updateResult = async (body: ResultType) => {
        setIsLoading(true);
        try {
            const data: ResultType = await Api.put("results", body.id, body);
            setResults(prevResults => prevResults.map(result => result.id === data.id ? data : result));
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }

    const deleteResult = async (id: number) => {
        setIsLoading(true);
        try {
            await Api.delete("results", id);
            setResults(results.filter(result => result.id !== id));
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        getResults();
    }, []);


    return ({results, createResult, updateResult, deleteResult, isLoading});
}

export default UseResults;