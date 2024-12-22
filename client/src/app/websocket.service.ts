import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root',
})
export class WebsocketService {
  private socket: Socket;
  private readonly serverUrl: string = 'http://localhost:5000'; // Replace with your backend URL

  constructor() {
    // Initialize the WebSocket connection
    this.socket = io(this.serverUrl, {
      transports: ['websocket'], // Use WebSocket transport
    });
  }

  // Emit an event to the server
  emitEvent(event: string, data: any): void {
    this.socket.emit(event, data);
  }

  // Listen for an event from the server
  listenForEvent(event: string, callback: (data: any) => void): void {
    this.socket.on(event, callback);
  }

  // Disconnect the WebSocket connection
  disconnect(): void {
    this.socket.disconnect();
  }
}
