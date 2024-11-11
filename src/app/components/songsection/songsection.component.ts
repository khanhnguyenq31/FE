import { CommonModule } from '@angular/common';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { DataStorageService } from '../../data-storage.service';
import { Router, NavigationEnd } from '@angular/router';
@Component({
  selector: 'app-songsection',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './songsection.component.html',
  styleUrl: './songsection.component.css'
})

export class SongsectionComponent  {
  constructor (private dataService : DataStorageService , private router: Router) {
    console.log(router.url)
  }

  songs: string[] = [
    'https://anotherbucket229.s3.ap-southeast-2.amazonaws.com/emotional-piano-music-256262.mp3',
    'https://anotherbucket229.s3.ap-southeast-2.amazonaws.com/inspirational-uplifting-calm-piano-254764.mp3',
    'https://anotherbucket229.s3.ap-southeast-2.amazonaws.com/testnhac.mp3'
  ];

  shuffleSong() {
    for (let i = this.songs.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [this.songs[i], this.songs[j]] = [this.songs[j], this.songs[i]]; // Hoán đổi vị trí
    }
    console.log(this.songs);
  }

  currentSongIndex: number = 0;
  currentTime : string ="0:00";
  totalTime : string="0:00";

  // play/pause
  play = false;

  repeat1song = false;
  repeatPlaylist = false;
  // mute/sound
  isMuted = false;

  @ViewChild('audioPlayer') audioPlayerRef!: ElementRef<HTMLAudioElement>;
  @ViewChild('progressBar') progressBarRef!: ElementRef;

  ngAfterViewInit() {
    const audioPlayer = this.audioPlayerRef.nativeElement;
    audioPlayer.currentTime = this.dataService.timePlaying;
    this.play = this.dataService.play;
    if (this.play === true) audioPlayer.play()


    audioPlayer.addEventListener('ended', () => {
      if (this.currentSongIndex === this.songs.length - 1) {
        if(this.repeatPlaylist) {
          this.currentSongIndex = 0;
          audioPlayer.src = this.songs[this.currentSongIndex];
          audioPlayer.play();
        } else
          this.dataService.play = this.play = false;
      } else {
        this.currentSongIndex = this.currentSongIndex + 1;
        audioPlayer.src = this.songs[this.currentSongIndex];
        audioPlayer.play();
      }
    });

    audioPlayer.addEventListener('timeupdate', () => {
      const progressBar = this.progressBarRef.nativeElement;
      const currentTime = audioPlayer.currentTime; // Thời gian hiện tại của bài hát
      const duration = audioPlayer.duration; // Thời gian tổng của bài hát
    
      // Cập nhật giá trị cho thanh tiến độ
      this.dataService.timePlaying = currentTime
    
      progressBar.value = (currentTime / duration) * 100;
      this.currentTime = Math.floor(currentTime / 60).toString() + ":" + Math.floor(currentTime % 60).toString().padStart(2, '0');
      const minute = Math.floor(duration / 60).toString();
      const second = Math.floor(duration % 60).toString().padStart(2, '0');
      this.totalTime = (minute === 'NaN' ? "0" : minute) + ":" + (second === 'NaN' ? "00" : second);
    });

    
  }

  playMusic() {
    const audioPlayer = this.audioPlayerRef.nativeElement;
    if (this.play === false) {
      audioPlayer.play();
    }
    else {
     audioPlayer.pause();
    }
    this.dataService.play = this.play = !this.play;
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
      this.currentSongIndex =
        (this.currentSongIndex - 1 + this.songs.length) % this.songs.length;
    }

    const audioPlayer = this.audioPlayerRef.nativeElement;
    audioPlayer.src = this.songs[this.currentSongIndex];
    audioPlayer.play();
  }
  
  onSeek(event: any) {
    const audioPlayer = this.audioPlayerRef.nativeElement;
    const progressBar = event.target;

    const newTime = (progressBar.value / 100) * audioPlayer.duration;
    
    audioPlayer.currentTime = newTime;
  }

}
