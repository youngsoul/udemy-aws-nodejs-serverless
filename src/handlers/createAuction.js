import { v4 as uuid } from 'uuid';
import AWS from 'aws-sdk';
import commonMiddleware from "../lib/commonMiddleware";
import createError from 'http-errors';


const dynamodb = new AWS.DynamoDB.DocumentClient();

async function createAuction(event, context) {

    console.log("***CREATEAUCTION");
    console.log(event)
    const {title} = event.body;
    const now = new Date();

    const auction = {
        id: uuid(),
        title,
        status: 'OPEN',
        createdAt: now.toISOString(),
        highestBid: {
            amount: 0,
        }
    };

    try {
        await dynamodb.put({
            TableName: process.env.AUCTIONS_TABLE_NAME,
            Item: auction,
        }).promise();
    } catch (e) {
        console.error(e)
        throw new createError.InternalServerError(e);
    }

    return {
        statusCode: 201,
        body: JSON.stringify({ auction }),
    };
}

export const handler = commonMiddleware(createAuction);

