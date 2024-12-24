import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DataStorageService {
  timePlaying: number = 0;
  play: boolean = false;

  // BehaviorSubject cho bài hát được chọn
  private selectedSongSource = new BehaviorSubject<any>(null); 
  selectedSong$ = this.selectedSongSource.asObservable();

  // BehaviorSubject cho danh sách phát
  private playlistSource = new BehaviorSubject<string[]>([]);
  playlist$ = this.playlistSource.asObservable();

  constructor() {}

  setSelectedSong(song: any) {
    this.selectedSongSource.next(song);
  }

  setPlaylist(songs: any[]) {
    this.playlistSource.next(songs);
  }

}
