# http http://localhost:9984 

should show you,

```
HTTP/1.1 200 OK
Access-Control-Allow-Origin: *
Connection: close
Content-Length: 574
Content-Type: application/json
Date: Thu, 04 Jan 2018 18:12:49 GMT
Server: gunicorn/19.7.1

{
    "api": {
        "v1": {
            "assets": "/api/v1/assets/",
            "docs": "https://docs.bigchaindb.com/projects/server/en/v1.3.0/http-client-server-api.html",
            "outputs": "/api/v1/outputs/",
            "statuses": "/api/v1/statuses/",
            "streams": "ws://0.0.0.0:9985/api/v1/streams/valid_transactions",
            "transactions": "/api/v1/transactions/"
        }
    },
    "docs": "https://docs.bigchaindb.com/projects/server/en/v1.3.0/",
    "keyring": [],
    "public_key": "GW1nrdZm4mbVC8ePeiGWz6DqHexqewqy5teURVHi3RG4",
    "software": "BigchainDB",
    "version": "1.3.0"
}
```

# $ http 'http://localhost:9984/api/v1/outputs?public_key=5dCvF12yKkLk8FMQGUjUVHbG3ZfyH6mfRwaDBpipJRKv'
```
[
    {
        "output_index": 0,
        "transaction_id": "d410282e61a8a42f2a50ec79004afa922c9d92bc61232fbe4e41a2c0210a0948"
    },
    {
        "output_index": 0,
        "transaction_id": "52d39de307b3e093ab483d2be28b64385a1bc4c23482b4c0339dbfb9ac7069d2"
    }
]
```


### http 'http://localhost:9984/api/v1/transactions?asset_id=52d39de307b3e093ab483d2be28b64385a1bc4c23482b4c0339dbfb9ac7069d2'

[
    {
        "asset": {
            "data": {
                "datastream": {
                    "schema": {
                        "value": "object"
                    },
                    "type": "app:datastream"
                },
                "type": "app:datastream"
            }
        },
        "id": "52d39de307b3e093ab483d2be28b64385a1bc4c23482b4c0339dbfb9ac7069d2",
        "inputs": [
            {
                "fulfillment": "pGSAIES1Iev22xbgxUZS-s5GVShNto4onAAmCUF76nWFwaWhgUBxS4yMGIizLkyIdjgq5kshbjD_5WOcGr9sNyvzXJ-sMPTS5OHqM2_LIQySIyOIh8QY44dPD0iqld35bbeuasAC",
                "fulfills": null,
                "owners_before": [
                    "5dCvF12yKkLk8FMQGUjUVHbG3ZfyH6mfRwaDBpipJRKv"
                ]
            }
        ],
        "metadata": {
            "payload": {
                "bio": "**Bold**\n\n_Italics_\n\n### yes, its markdown!\n\n<blockquote>\nsome blockquotes\n</blockquote>\n\n```\nsome code perhaps?\n```\n\n[link_text](link)\n\n![alt_text](img_link)\n\n[![](https://img.youtube.com/vi/v/dasdas/0.jpg)](https://www.youtube.com/watch?v=v/dasdas)\n\n",
                "title": "Hello world"
            },
            "time": 1515090007104
        },
        "operation": "CREATE",
        "outputs": [
            {
                "amount": "1",
                "condition": {
                    "details": {
                        "public_key": "5dCvF12yKkLk8FMQGUjUVHbG3ZfyH6mfRwaDBpipJRKv",
                        "type": "ed25519-sha-256"
                    },
                    "uri": "ni:///sha-256;Wp48tuGRKnmFK1wDq-jmf1R8fcTGXvhKTaORZHIRW6w?fpt=ed25519-sha-256&cost=131072"
                },
                "public_keys": [
                    "5dCvF12yKkLk8FMQGUjUVHbG3ZfyH6mfRwaDBpipJRKv"
                ]
            }
        ],
        "version": "1.0"
    }
]
```