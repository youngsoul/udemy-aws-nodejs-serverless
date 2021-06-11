import AWS from 'aws-sdk';
import middy from '@middy/core';
import httpJsonBodyParser from '@middy/http-json-body-parser';
import httpErrorHandler from "@middy/http-error-handler";
import httpEventNormalizer from "@middy/http-event-normalizer";
import createError from 'http-errors';


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

export const handler = middy(getAuction)
    .use(httpJsonBodyParser())
    .use(httpEventNormalizer())
    .use(httpErrorHandler());


