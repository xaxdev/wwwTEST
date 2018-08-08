import Boom from 'boom'

module.exports = async (request, records, cb) => {
    try {
        const db = request.mongo.db
        const ObjectID = request.mongo.ObjectID
        const user = await request.user.getUserById(request, request.auth.credentials.id)

        if (!!!request.auth.credentials.id) {
            const existingSetReference = await db.collection('SetReferenceSearch').find({'userId': request.auth.credentials.id }).toArray()

            if(existingSetReference.length > 0) return reply(Boom.badRequest('Your required name is existing.'))
        }

        await db.collection('SetReferenceSearch').deleteMany({ 'userId' : request.auth.credentials.id })

        records.forEach(async (record) => {
            await db.collection('SetReferenceSearch').findOneAndUpdate(
                {
                    _id: new ObjectID(request.auth.credentials.id),
                    'userId': request.auth.credentials.id
                },
                {
                    $set: {
                        'reference': record.reference,
                        'description': record.description,
                        'items': record.items,
                        'totalActualCost': record.totalActualCost,
                        'totalUpdatedCost': record.totalUpdatedCost,
                        'totalPrice': record.totalPrice,
                        'totalNetAmount': record.totalNetAmount.USD,
                        'totalMargin': record.totalMargin,
                        'totalMarginPercent': record.totalMarginPercent,
                        'totalDiscountAmount': record.totalDiscountAmount,
                        'totalDiscountPercent': record.totalDiscountPercent,
                        'markup': record.markup,
                        'company': record.company,
                        'companyName': record.companyName,
                        'warehouse': record.warehouse,
                        'warehouseName': record.warehouseName,
                        'type': record.type,
                        'postedDate': record.postedDate,
                        'image': record.image,
                        'lastModified': new Date()
                    }
                },
                {
                    upsert: true,
                    returnOriginal: false
                }
            )
        })

    } catch (err) {
        throw err
    }
}
