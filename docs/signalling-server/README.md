---
sidebarDepth: 3
---

# Signalling Server

A Node JS server used for coordinating WebRTC connections between peers.

## Object Types

Custom objects used in the signalling server.

### RTCDataContainer <!-- rtc-data-container -->
``` ts
interface RTCDataContainer {
    description?: RTCSessionDescriptionInit;
    candidate?: RTCIceCandidate;
}
```

Note: here are the links to the [RTCSessionDescriptionInit](http://html5index.org/WebRTC%20-%20RTCSessionDescriptionInit.html) and [RTCIceCandidate](https://developer.mozilla.org/en-US/docs/Web/API/RTCIceCandidate) objects

## Emission Events

Events that clients can emit.

### room-create(room: string) <!-- room-create -->
* **Description:** create a room, making the caller the room owner
* **Parameters:**
    * `room`: the name of the room to create
* **Response events:**
    * [room-exists](#room-exists): `room` already exists
    * [room-created](#room-created): `room` successfully created
    * [error](#error): server error occurred

### room-join(room: string) <!-- room-join -->
* **Description:** join an already existing room
* **Parameters:**
    * `room`: the name of the room to join
* **Response events:**
    * [room-not-exists](#room-not-exists): `room` does not exist
    * [room-joined](#room-joined): `room` successfully joined
    * [client-joined](#client-join): emitted to all other clients when a client joins `room`
    * [error](#error): server error occurred

### room-leave(room: string) <!-- room-leave -->
* **Description:** leave a room
* **Parameters:**
    * `room`: the name of the room to leave
* **Response events:**
    * [not-in-room](#not-in-room): client was not in `room`
    * [room-left](#room-left): `room` successfully left
    * [client-left](#client-left): emitted to all other clients when a client leaves `room`
    * [error](#error): server error occurred

::: warning
If the room owner leaves, the entire room will be closed, disconnecting all other clients
:::

### signal-send(room: string, targetId: string, data: [RTCDataContainer](#rtc-data-container)) <!-- signalling-send -->
* **Description:** send a signal to a target client. Used for RTC connection setup
* **Parameters:**
    * `room`: the name of the room to send the signal in
    * `targetId`: the id of the target client to send the signal to
    * `data`: the signal data
* **Response events:**
    * [not-in-room](#not-in-room): client was not in `room`
    * [target-not-fond](#target-not-found): emitted if `targetId` is not found in the current room
* **Target Events**
    * [signal-receive](#signal-receive): the event targetId receives



## Self Listener Events

Events sent back in response to events emitted by clients.

### room-exists(room: string) <!-- room-exists -->
* **Description:** emitted when a room is attempted to be created but it already exists
* **Parameters:**
    * `room`: the room that already exists

### room-not-exists(room: string) <!-- room-not-exists -->
* **Description:** emitted when a room is attempted to be join but it does not exist
* **Parameters:**
    * `room`: the room that does not exist

### not-in-room(room: string) <!-- room-not-exists -->
* **Description:** emitted when a room is attempted to be left but the client is not in the room currently
* **Parameters:**
    * `room`: the room that the client is not in

### room-created(room: string) <!-- room-created -->
* **Description:** emitted when a room is successfully created.
* **Parameters:**
    * `room`: the room that was created

### room-joined(room: string, ownerId: string, clients: string[]) <!-- room-joined -->
* **Description:** emitted when a room is successfully joined.
* **Parameters:**
    * `room`: the room that was joined
    * `ownerId`: the client id of the room owner
    * `clients`: the already connected clients (does not include self)

### room-left(room: string, kicked: boolean) <!-- room-left -->
* **Description:** emitted when a room is successfully left.
* **Parameters:**
    * `room`: the room that was left
    * `kicked`: indicates if the client was kicked from the room or not

### target-not-found(room: string, targetId: string) <!-- target-not-found -->
* **Description:** emitted when a target client for a message not found in the given room
* **Parameters:**
    * `room`: the room that the event occurred in
    * `targetId`: the client id of the attempted target

### error(message: any) <!-- error -->
* **Description:** emitted when an unexpected socket error occurs on the server
* **Parameters:**
    * `message`: the error message
* **Parameters:**
    * `room`: the room that the event occurred in
    * `senderId`: the client id of the sender

## Targeted Listener Events

Events for client-specific target messages

### signal-receive(room: string, senderId: string, data: [RTCDataContainer](#rtc-data-container)) <!-- signal-receive -->
* **Description:** emitted when the client receives a connection signal from another client. Used for RTC connection setup.
* **Parameters:**
    * `room`: the room that the event occurred in
    * `senderId`: the client id of the sender
    * `data`: the signal data


## Room Listener Events

Events that all clients in a room can listen to.

### client-joined(room: string, id: string) <!-- client-joined -->
* **Description:** emitted when a client joins a room
* **Parameters:**
    * `room`: the room that the event occurred in
    * `id`: the id of the client that joined the room

### client-left(room: string, id: string) <!-- client-left -->
* **Description:** emitted when a client leaves a room
* **Parameters:**
    * `room`: the room that the event occurred in
    * `id`: the id of the client that left the room