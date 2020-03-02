# Signalling Server

A Node JS server used for coordinating WebRTC connections between peers.

## Emission Events

Events that clients can emit.

### room-create(room: string) <!-- room-create -->
* Description: create a room, making the caller the room owner
* Response events:
    * [room-exists](#room-exists): `room` already exists
    * [room-created](#room-created): `room` successfully created
    * [error](#error): server error occurred

### room-join(room: string) <!-- room-join -->
* Description: join an already existing room
* Response events:
    * [room-not-exists](#room-not-exists): `room` does not exist
    * [room-joined](#room-joined): `room` successfully joined
    * [client-joined](#client-join): emitted to all other clients when a client joins `room`
    * [error](#error): server error occurred

### room-leave(room: string) <!-- room-leave -->
* Description: leave a room
* Response events:
    * [not-in-room](#not-in-room): client was not in `room`
    * [room-left](#room-left): `room` successfully left
    * [client-left](#client-left): emitted to all other clients when a client leaves `room`
    * [error](#error): server error occurred

::: warning
If the room owner leaves, the entire room will be closed, disconnecting all other clients
:::



## Self Listener Events

Events sent back in response to events emitted by clients.

### room-exists(room: string) <!-- room-exists -->
* Description: emitted when a room is attempted to be created but it already exists

### room-not-exists(room: string) <!-- room-not-exists -->
* Description: emitted when a room is attempted to be join but it does not exist

### not-in-room(room: string) <!-- room-not-exists -->
* Description: emitted when a room is attempted to be left but the client is not in the room currently

### room-created(room: string) <!-- room-created -->
* Description: emitted when a room is successfully created.

### room-joined(room: string) <!-- room-joined -->
* Description: emitted when a room is successfully joined.

### room-left(room: string) <!-- room-left -->
* Description: emitted when a room is successfully left.

### error(message: any) <!-- error -->
* Description: emitted when an unexpected socket error occurs on the server




## Room Listener Events

Events that all clients in a room can listen to.

### client-joined(room: string) <!-- client-joined -->
* Description: emitted when a client joins a room

### client-left(room: string) <!-- client-left -->
* Description: emitted when a client leaves a room