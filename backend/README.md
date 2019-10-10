# Backend

## DB Migrations

To run all the migrations:

`yarn dbm up`

To create a new migration:

`yarn dbm create migration-name`

## Example curls

Note, the username and password will be different

```bash

# Get a single communication
curl --user 'admin:kh$E6YhGp*ujg@W$suVaPT">b)5C~"Bx' -H "Content-Type: application/json" -X GET http://localhost:3000/api/v1/communications/5 | jq .

# Get all communications
curl --user 'admin:kh$E6YhGp*ujg@W$suVaPT">b)5C~"Bx' -H "Content-Type: application/json" -X GET http://localhost:3000/api/v1/communications | jq .

# Post normal communication
curl --user 'admin:kh$E6YhGp*ujg@W$suVaPT">b)5C~"Bx' -H "Content-Type: application/json" -X POST --data '{"body": "This is the message body", "subject": "Subject 1", "expirationDate": 1570871735, "urgency": 1}' http://localhost:3000/api/v1/communications | jq .

# Post communication with event
curl --user 'admin:kh$E6YhGp*ujg@W$suVaPT">b)5C~"Bx' -H "Content-Type: application/json" -X POST --data '{"body": "Come to the snazzy event", "subject": "Subject 2", "expirationDate": 1570871735, "urgency": 1, "event": {"startDate": 1570867200, "endDate": 1570881600}}' http://localhost:3000/api/v1/communications | jq .

# Delete a communication
curl --user 'admin:kh$E6YhGp*ujg@W$suVaPT">b)5C~"Bx' -H "Content-Type: application/json" -X DELETE http://localhost:3000/api/v1/communications/4 | jq .

```
