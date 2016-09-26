export default {
    operation: {
        upsert: foreignKey => {

            return item => {

                return {
                    updateOne: {
                        filter: {
                            id: item.id,
                            ...foreignKey
                        },
                        update: {
                            $currentDate: {
                                lastModified: true
                            },
                            $setOnInsert: {
                                ...item,
                                ...foreignKey
                            }
                        },
                        upsert: true
                    }
                }
            }
        },
        delete: foreignKey => {

            return item => {

                return {
                    deleteOne: {
                        filter: {
                            id: item.id,
                            ...foreignKey
                        }
                    }
                }
            }
        }
    }
}
