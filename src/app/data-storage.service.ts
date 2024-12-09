import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DataStorageService {
  timePlaying: number = 0;
  play: boolean = false;
  private selectedSongSource = new BehaviorSubject<string>('');
  selectedSong$ = this.selectedSongSource.asObservable();
  private playlist: string[] = [];

  setSelectedSong(songUrl: string) {
    this.selectedSongSource.next(songUrl);
  }

  setPlaylist(songs: string[]) {
    this.playlist = songs;
  }

  getPlaylist(): string[] {
    return this.playlist;
  }
}
