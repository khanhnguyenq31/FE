import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class PlaySongService {
  play: boolean = false; 
  currentTime: string = "0:00";
  totalTime: string = "0:00"; 

  // BehaviorSubject cho bài hát được chọn
  private selectedSongSource = new BehaviorSubject<any>(null); 
  selectedSong$ = this.selectedSongSource.asObservable();

  // BehaviorSubject cho danh sách phát
  private playlistSource = new BehaviorSubject<string[]>([]);
  playlist$ = this.playlistSource.asObservable();

  constructor() {}
 
  setSelectedSong(song: any, songs: any[]) {
    this.selectedSongSource.next(song);
    this.playlistSource.next(songs);
  } 
}
