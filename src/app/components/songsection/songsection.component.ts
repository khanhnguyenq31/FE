import { CommonModule } from '@angular/common';
import { Component, ViewChild, ElementRef , Input, OnInit, AfterViewInit } from '@angular/core';
import { PlaySongService } from '../../services/play-song.service';
import { Router} from '@angular/router';
@Component({
  selector: 'app-songsection',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './songsection.component.html',
  styleUrl: './songsection.component.css'
})

export class SongsectionComponent implements OnInit, AfterViewInit  {
  @ViewChild('audioPlayer') audioPlayerRef!: ElementRef<HTMLAudioElement>;
  @ViewChild('progressBar') progressBarRef!: ElementRef;

  currentSongIndex: number = 0; 
  songs: any[] = [];

  isMuted: boolean = false; 
  shuffle: boolean = false; 
  repeat1song: boolean = false; 
  repeatPlaylist: boolean = false; 

  currentSongName: string = ''; // Tên bài hát
  currentSongImage: string = ''; // Hình ảnh bài hát

  constructor(public playService: PlaySongService, private router: Router) {}

  ngOnInit() { 
    this.playService.playlist$.subscribe(songs => {
      this.songs = songs; 
    });

    this.playService.selectedSong$.subscribe(song => { 
      if (song) {
        this.playSongByUrl(song.secure_url); 
        this.updateCurrentSongInfo(song);
      }
    });
  }

  ngAfterViewInit() {
    const audioPlayer = this.audioPlayerRef.nativeElement;

    audioPlayer.addEventListener('ended', () => {
      if (this.currentSongIndex === this.songs.length - 1) {
        if (this.repeatPlaylist) {
          this.currentSongIndex = 0;
          this.playNextSong();
        } else {
          this.playService.play = false;
        }
      } else {
        this.currentSongIndex++;
        this.playNextSong();
      }
    });

    audioPlayer.addEventListener('timeupdate', () => {
      const progressBar = this.progressBarRef.nativeElement;
      const currentTime = audioPlayer.currentTime;
      const duration = audioPlayer.duration;

      progressBar.value = (currentTime / duration) * 100;
      this.playService.currentTime = Math.floor(currentTime / 60).toString() + ":" + Math.floor(currentTime % 60).toString().padStart(2, '0');
      const minute = Math.floor(duration / 60).toString();
      const second = Math.floor(duration % 60).toString().padStart(2, '0');
      this.playService.totalTime = (minute === 'NaN' ? "0" : minute) + ":" + (second === 'NaN' ? "00" : second);
    });
  }
  
  playSongByUrl(songUrl: string) {
    const audioPlayer = this.audioPlayerRef.nativeElement;
    audioPlayer.src = songUrl;
    audioPlayer.load();
    audioPlayer.play();
    this.playService.play = true;
  }

  playOrPause() {
    const audioPlayer = this.audioPlayerRef.nativeElement;
    if (!this.playService.play) {
      audioPlayer.play();
    } else {
      audioPlayer.pause();
    }
    this.playService.play = !this.playService.play;
  }

  playNextSong() {
    const audioPlayer = this.audioPlayerRef.nativeElement;
    audioPlayer.src = this.songs[this.currentSongIndex].secure_url;
    audioPlayer.load();
    audioPlayer.play();
    this.updateCurrentSongInfo(this.songs[this.currentSongIndex]);
  }

  updateCurrentSongInfo(song: any) {
    this.currentSongName = song.name;
    this.currentSongImage = song.public_image_id || 'default_image_url';
  }

  shuffleSong() {
    if (!this.shuffle) {
      for (let i = this.songs.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [this.songs[i], this.songs[j]] = [this.songs[j], this.songs[i]];
      }
    }
    this.shuffle = !this.shuffle;
  }

  mute() {
    const audioPlayer = this.audioPlayerRef.nativeElement;
    this.isMuted = !this.isMuted;
    audioPlayer.muted = this.isMuted;
  }

  repeat1Song(option: number) {
    const audioPlayer = this.audioPlayerRef.nativeElement;
    if (option === 0) {
      this.repeatPlaylist = true;
    } else if (option === 1) {
      this.repeatPlaylist = false;
      this.repeat1song = true;
      audioPlayer.loop = !audioPlayer.loop;
    } else {
      this.repeat1song = false;
      audioPlayer.loop = !audioPlayer.loop;
    }
  }

  changeVolume(event: Event) {
    const volumeValue = (event.target as HTMLInputElement).value;
    const normalizedVolume = +volumeValue / 100;
    this.audioPlayerRef.nativeElement.volume = normalizedVolume;
    console.log('Current volume (0-100):', volumeValue);
    console.log('Normalized volume (0-1):', normalizedVolume);
  }
  
  changeSong(direction: string) {
    if (direction === 'next') {
      this.currentSongIndex = (this.currentSongIndex + 1) % this.songs.length;
    } else if (direction === 'prev') {
      this.currentSongIndex = (this.currentSongIndex - 1 + this.songs.length) % this.songs.length;
    }

    this.playNextSong();
  }
  
  onSeek(event: any) {
    const audioPlayer = this.audioPlayerRef.nativeElement;
    const progressBar = event.target;

    const newTime = (progressBar.value / 100) * audioPlayer.duration;
    audioPlayer.currentTime = newTime;
  }

}
