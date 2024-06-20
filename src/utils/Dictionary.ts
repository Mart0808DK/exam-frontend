function translateResultType(resultType: string) {
    switch (resultType) {
        case "Time":
            return "Tid";
        case "Distance":
            return "Distance";
        case "Points":
            return "Points";
        default:
            return "";
    }
}

export { translateResultType };