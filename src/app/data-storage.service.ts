import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DataStorageService {
  timePlaying: number = 0;
  play: boolean = false;
  currentSongIndex: number = 0; // Chỉ số bài hát hiện tại
  songs: string[] = []; // Danh sách bài hát

  // BehaviorSubject cho bài hát được chọn
  private selectedSongSource = new BehaviorSubject<string>('');
  selectedSong$ = this.selectedSongSource.asObservable();

  // BehaviorSubject cho danh sách phát
  private playlistSource = new BehaviorSubject<string[]>([]);
  playlist$ = this.playlistSource.asObservable(); // Observable cho danh sách phát

  constructor() {}

  setSelectedSong(songUrl: string) {
    this.selectedSongSource.next(songUrl);
  }

  setPlaylist(songs: string[]) {
    this.playlistSource.next(songs); // Cập nhật danh sách phát
  }

}
