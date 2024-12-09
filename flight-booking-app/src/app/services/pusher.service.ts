import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Pusher from 'pusher-js';

@Injectable({
  providedIn: 'root'
})
export class PusherService {

  url: string = 'http://127.0.0.1:8000/api';
  private pusherClient: Pusher;
  private channels: { [key: string]: any } = {};
  constructor(private http: HttpClient) {
    this.pusherClient = new Pusher('d6dc6b15abc4f424c31a', {
      cluster: 'eu',
      authEndpoint: 'http://127.0.0.1:8000/broadcasting/auth',  // Ispravna Laravel ruta
      auth: {
        headers: {
          Authorization: ''
        }
      }
    });

    //this.channel = this.pusherClient.subscribe('private-channel');
  }


  triggerFlightSelected(flightId: number) {
    this.http.post(`${this.url}/flight-selected`, { flightId }).subscribe();
  }
  leaveFlight(flightId: number) {
    this.http.post(`${this.url}/flight-left`, { flightId }).subscribe();
  }

  // // Funkcija za slušanje događaja na kanalu
  // listen(flightId: number, callback: (data: any) => void) {
  //   const channelName = 'private-flight.' + flightId;
  //   if (!this.channels[channelName]) {
  //     this.channels[channelName] = this.pusherClient.subscribe(channelName);
  //   }
  //   this.channels[channelName].bind('flight.' + flightId, callback);
  // }
  // Funkcija za slušanje događaja na kanalu
  listen(flightId: number, callback: (data: any) => void) {
    const channelName = 'private-flight.' + flightId;

    // Proveri da li već postoji pretplata na kanal
    if (!this.channels[channelName]) {
      console.log(`Subscribing to channel: ${channelName}`);
      this.channels[channelName] = this.pusherClient.subscribe(channelName);
    }

    // Poveži event sa callback funkcijom
    console.log(`Binding event: flight.selected on channel: ${channelName}`);
    this.channels[channelName].bind('flight.selected', (data: any) => {
      console.log('Received data:', data); // Ispiši primljene podatke
      // Proveri i prikaži status
      if (data.status) {
        console.log('Status received:', data.status);
      }
      callback(data); // Pozovi callback funkciju
    });

    // Opcionalno: Ispis informacija o trenutnim kanalima
    console.log('Currently subscribed channels:', Object.keys(this.channels));
  }


  // Funkcija za prestanak slušanja određenog kanala
  unlisten(flightId: number) {
    const channelName = 'private-flight.' + flightId;
    if (this.channels[channelName]) {
      this.channels[channelName].unbind('flight.' + flightId);
    }
  }

  // Funkcija za prestanak slušanja svih kanala
  unlistenAll() {
    Object.keys(this.channels).forEach(channelName => {
      this.channels[channelName].unbind_all();
      this.pusherClient.unsubscribe(channelName);
    });
    this.channels = {};
  }
}
