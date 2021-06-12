import AWS from 'aws-sdk';
import createError from 'http-errors';
import commonMiddleware from "../lib/commonMiddleware";


const dynamodb = new AWS.DynamoDB.DocumentClient();

async function placeBid(event, context) {
    console.log(event);
    const { id } = event.pathParameters;
    const { amount } = event.body;
    let updatedAuction;

    try {
        const params = {
            TableName: process.env.AUCTIONS_TABLE_NAME,
            Key: {id},
            UpdateExpression: 'set highestBid.amount = :amount',
            ExpressionAttributeValues: {
                ':amount': amount,
            },
            ReturnValues: 'ALL_NEW', // return item just updated
        };

        const results = await dynamodb.update(params).promise();
        updatedAuction = results.Attributes;


    } catch(error) {
        console.error(error)
        throw new createError.InternalServerError(error);
    }

    return {
        statusCode: 200,
        body: JSON.stringify(updatedAuction)
    }
}

export const handler = commonMiddleware(placeBid);

