import { Component, ElementRef, ViewChild, AfterViewInit, Renderer2} from '@angular/core';

@Component({
  selector: 'app-songsection',
  standalone: true,
  imports: [],
  templateUrl: './songsection.component.html',
  styleUrl: './songsection.component.css'
})
export class SongsectionComponent implements AfterViewInit {
  @ViewChild('masterCover') masterCover!: ElementRef<HTMLImageElement>;
  @ViewChild('songTitle') songTitle!: ElementRef<HTMLHeadingElement>;
  @ViewChild('songPerfomer') songPerfomer!: ElementRef<HTMLParagraphElement>;
  @ViewChild('shuffleMusic') shuffleMusic!: ElementRef<HTMLElement>;
  @ViewChild('heartIcon') heartIcon!: ElementRef<HTMLElement>;
  @ViewChild('customProgress') customProgress!: ElementRef<HTMLElement>;
  @ViewChild('customProgressThumb') customProgressThumb!: ElementRef<HTMLElement>;
  @ViewChild('volumeRange') volumeRange!: ElementRef<HTMLInputElement>;
  @ViewChild('volIcon') volIcon!: ElementRef<HTMLElement>;
  @ViewChild('currentTimeSpan', { static: true }) currentTimeSpan!: ElementRef;
  @ViewChild('durationSpan', { static: true }) durationSpan!: ElementRef;

  private isRepeatEnable = false;
  private isSuffleEnable = false;
  public songIndex = 0;
  public songs = [
    {
      title: 'One Last Time',
      artist: 'Ariana Grande',
      coverImageUrl: 'https://res.cloudinary.com/dlt4ash36/image/upload/v1700793770/play-song_qvjwqd.jpg',
      audioUrl: 'https://res.cloudinary.com/dq76uikpj/video/upload/v1726319474/16373004720917512211.mp3'
    },
    {
      title: 'One Time',
      artist: 'Ariana Grande',
      coverImageUrl: 'https://res.cloudinary.com/dlt4ash36/image/upload/v1700793770/play-song_qvjwqd.jpg',
      audioUrl: 'https://res.cloudinary.com/dlt4ash36/video/upload/v1700895570/Raatan-Lambiyan_xd4cld.mp3'
    }
  ];
  private audioElement: HTMLAudioElement;
  private isPlaying: boolean = false;


  constructor(private renderer: Renderer2) {
    // Initialize the audio element with a specific song URL for testing
    this.audioElement = new Audio(this.songs[this.songIndex].audioUrl);
  }

  ngAfterViewInit() {
    this.setupEventListeners();
    this.displaySongDetails(this.songIndex); // Display details for the initial song
    this.playPauseSong(); // Start playing the initial song
  }

  private setupEventListeners() {
    // Next song event listener
    this.renderer.listen(this.renderer.selectRootElement('#next'), 'click', () => {
      this.customProgress.nativeElement.setAttribute('value', '0');
      this.songIndex = (this.songIndex >= this.songs.length - 1) ? 0 : this.songIndex + 1;
      this.audioElement.currentTime = 0;
      this.displaySongDetails(this.songIndex);
      this.audioElement.src = this.songs[this.songIndex].audioUrl;
      this.audioElement.play();
      this.isPlaying = true;
    });

    // Master play/pause button event listener
    this.renderer.listen(this.renderer.selectRootElement('#masterPlayBtn'), 'click', () => {
      this.playPauseSong(); // Toggle play/pause
    });

    // Previous song event listener
    this.renderer.listen(this.renderer.selectRootElement('#previous'), 'click', () => {
      this.songIndex = (this.songIndex <= 0) ? this.songs.length - 1 : this.songIndex - 1;
      this.audioElement.currentTime = 0;
      this.displaySongDetails(this.songIndex);
      this.audioElement.src = this.songs[this.songIndex].audioUrl;
      this.audioElement.play();
      this.isPlaying = true;
    });

    // Repeat mode enable
    this.renderer.listen(this.renderer.selectRootElement('#repeatMode'), 'click', () => {
      if (!this.isRepeatEnable) {
        this.renderer.setStyle(this.renderer.selectRootElement('#repeatMode'), 'color', '#26cc5a');
        this.audioElement.loop = true;
        this.isRepeatEnable = true;
      } else {
        this.renderer.setStyle(this.renderer.selectRootElement('#repeatMode'), 'color', '#9f9b9b');
        this.audioElement.loop = false;
        this.isRepeatEnable = false;
      }
    });

    // Shuffle mode enable
    this.renderer.listen(this.renderer.selectRootElement('#shuffleMusic'), 'click', () => {
      if (!this.isSuffleEnable) {
        this.renderer.setStyle(this.renderer.selectRootElement('#shuffleMusic'), 'color', '#26cc5a');
        this.isSuffleEnable = true;
      } else {
        this.renderer.setStyle(this.renderer.selectRootElement('#shuffleMusic'), 'color', '#9f9b9b');
        this.isSuffleEnable = false;
      }
    });

    // Handle end of audio for shuffle mode
    this.audioElement.addEventListener('ended', () => {
      if (this.isSuffleEnable) {
        this.songIndex = Math.floor(Math.random() * this.songs.length);
        this.displaySongDetails(this.songIndex);
        this.audioElement.src = this.songs[this.songIndex].audioUrl;
        this.playPauseSong(); // Toggle play/pause
      }
    });

    // Volume control
    this.renderer.listen(this.volumeRange.nativeElement, 'input', () => {
      this.audioElement.volume = parseFloat(this.volumeRange.nativeElement.value) / 100;
    });

    // Volume icon click
    this.renderer.listen(this.volIcon.nativeElement, 'click', () => {
      if (this.volIcon.nativeElement.classList.contains('fa-volume-high')) {
        this.volIcon.nativeElement.classList.replace('fa-volume-high', 'fa-volume-xmark');
        this.audioElement.muted = true;
      } else {
        this.volIcon.nativeElement.classList.replace('fa-volume-xmark', 'fa-volume-high');
        this.audioElement.muted = false;
      }
    });
  }


  private displaySongDetails(index: number) {
    // Update the song details
    const song = this.songs[index];
    this.songTitle.nativeElement.textContent = song.title;
    this.songPerfomer.nativeElement.textContent = song.artist;
    this.masterCover.nativeElement.src = song.coverImageUrl;
  }

  private playPauseSong() {
    if (this.isPlaying) {
      this.audioElement.pause();
      this.renderer.removeClass(this.renderer.selectRootElement('#masterPlayBtn'), 'fa-circle-pause');
      this.renderer.addClass(this.renderer.selectRootElement('#masterPlayBtn'), 'fa-circle-play');
    } else {
      this.audioElement.play();
      this.renderer.removeClass(this.renderer.selectRootElement('#masterPlayBtn'), 'fa-circle-play');
      this.renderer.addClass(this.renderer.selectRootElement('#masterPlayBtn'), 'fa-circle-pause');
    }
    this.isPlaying = !this.isPlaying; // Cập nhật trạng thái phát/dừng
  }
   
}
