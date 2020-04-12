---
sidebarDepth: 3
sidebar: auto
---

# Room Server

The server responsible for tracking the currently opened rooms and providing the peer ids of the room owners to connecting clients.

::: warning
Rooms left open for more than a day will be closed automatically.
:::

## API

### Create Room
* description: creates a room, gives back a secret cookie key used to close the room.
* permissions: `none`
* request: `POST /rooms/create`
    * content-type: `application/json`
    * body: object
        * roomName: string
        * selfId: string
* response: `200`
    * body: OK
* response: `400`
    * body: Malformed roomName | Malformed selfId
* response: `409`
    * body: Room `roomName` already exists 
* response: `500`
    * body: Error with redis

```
$ curl -X POST \
       -H "Content-Type: application/json" \
       -d '{ "roomName": "myRoom" }' \
       http://localhost:8080/rooms/create
```

### Get Owner ID
* description: gets the peer id of the owner of a room
* permissions: `none`
* request: `GET /rooms/:roomName`
* response: `200`
    * body: object
        * ownerId: string
* response: `400`
    * body: Malformed roomName
* response: `404`
    * body: No room with name `roomName`
* response: `500`
    * body: Error with redis

```
$ curl -X GET http://localhost:8080/rooms/myRoom
```

### Close Room
* description: close a room
* permissions: `secret` cookie must be valid
* request: `DELETE /rooms/:roomName`
* response: `200`
    * body: OK
* response: `400`
    * body: Malformed roomName
* response: `401`
    * body: You can't delete this room since you don't own it
* response: `404`
    * body: No room with name `roomName`
* response: `500`
    * body: Error with redis

```
$ curl -X DELETE \
       -cookie "secret=mySecret"
       http://localhost:8080/rooms/myRoom
```