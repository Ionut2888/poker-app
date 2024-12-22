import { Component, OnInit, OnDestroy } from '@angular/core';
import { WebsocketService } from './websocket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Poker App';

  constructor(private websocketService: WebsocketService) {}

  ngOnInit(): void {
    // Listen for a connection event
    this.websocketService.listenForEvent('connect', () => {
      console.log('Connected to WebSocket server');
    });

    // Listen for a game update event from the backend
    this.websocketService.listenForEvent('game-update', (data) => {
      console.log('Received game update:', data);
    });

    // Example of emitting a player action
    this.websocketService.emitEvent('player-action', {
      action: 'fold',
      playerId: '123',
    });
  }

  ngOnDestroy(): void {
    // Disconnect WebSocket when the component is destroyed
    this.websocketService.disconnect();
  }
}
