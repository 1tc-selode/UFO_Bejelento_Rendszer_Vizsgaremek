import { Component, ViewChild, ElementRef, AfterViewInit, signal } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-report-form',
  imports: [],
  templateUrl: './report-form.html',
  styleUrl: './report-form.css',
})
export class ReportForm implements AfterViewInit {
  @ViewChild('map', { static: false }) mapContainer?: ElementRef;

  lat = signal<number|null>(null);
  lng = signal<number|null>(null);
  private map?: L.Map;
  private marker?: L.Marker;

  ngAfterViewInit() {
    if (!this.mapContainer) return;
    this.map = L.map(this.mapContainer.nativeElement).setView([47.4979, 19.0402], 7);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);

    this.map.on('click', (e: L.LeafletMouseEvent) => {
      this.setMarker(e.latlng.lat, e.latlng.lng);
    });
  }

  setMarker(lat: number, lng: number) {
    this.lat.set(lat);
    this.lng.set(lng);
    if (this.marker) {
      this.marker.setLatLng([lat, lng]);
    } else if (this.map) {
      this.marker = L.marker([lat, lng], { draggable: true }).addTo(this.map);
      this.marker.on('dragend', (e: L.DragEndEvent) => {
        const pos = this.marker!.getLatLng();
        this.lat.set(pos.lat);
        this.lng.set(pos.lng);
      });
    }
  }
}
