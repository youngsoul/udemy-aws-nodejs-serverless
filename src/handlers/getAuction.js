import AWS from 'aws-sdk';
import createError from 'http-errors';
import commonMiddleware from "../lib/commonMiddleware";


const dynamodb = new AWS.DynamoDB.DocumentClient();

async function getAuction(event, context) {
    let auction;
    console.log(event);
    const { id } = event.pathParameters;

    try {
        const results = await dynamodb.get({
            TableName: process.env.AUCTIONS_TABLE_NAME,
            Key: { id: id }  // could use IE6 { id }
        }).promise();

        auction = results.Item;

    } catch(error) {
        console.error(error)
        throw new createError.InternalServerError(error);
    }

    if (!auction) {
        throw new createError.NotFound(`Auction with ID "${id}" not found!`)
    }

    return {
        statusCode: 200,
        body: JSON.stringify(auction)
    }
}

export const handler = commonMiddleware(getAuction);

