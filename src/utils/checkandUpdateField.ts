function checkAndUpdateField(newData: string | number | Date | undefined, existingData: string | number | Date) {
    if (newData === undefined || newData === null || newData === "") {
        return existingData;
    } else {
        if (typeof newData === "string") {
            if(newData === ""){
                return existingData;
            }
            if (newData !== existingData) {
                return newData;
            } else if(newData === existingData) {
                return existingData;
            }
        } else if (newData instanceof Date) {
            if (newData.getDate() !== (existingData as Date).getDate()) {
                return newData;
            } else {
                return existingData;
            }
        } else if (typeof newData === "number"){
            if(newData === 0){
                return existingData;
            } else if(newData !== existingData){
                return newData;
            }
        }
    }
}

export default checkAndUpdateField;