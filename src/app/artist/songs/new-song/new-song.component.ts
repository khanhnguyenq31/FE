import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SidebarsectionComponent } from '../../../components/sidebarsection/sidebarsection.component';

@Component({
  selector: 'app-new-song',
  standalone: true,
  imports: [RouterLink, SidebarsectionComponent],
  templateUrl: './new-song.component.html',
  styleUrl: './new-song.component.css'
})
export class NewSongComponent {
  // document
  //     .getElementById("newSongForm")
  //     .addEventListener("submit", function (event) {
  //       event.preventDefault();

  //       const songTitle = document.getElementById("songTitle").value;
  //       const songDuration = document.getElementById("songDuration").value;
  //       const songCover = document.getElementById("songCover").files[0];
  //       const songFile = document.getElementById("songFile").files[0];

  //       const reader = new FileReader();
  //       reader.onload = function (e) {
  //         const newSong = {
  //           title: songTitle,
  //           plays: 0,
  //           duration: songDuration,
  //           status: "Pending",
  //           cover: e.target.result,
  //           file: songFile.name,
  //         };

  //         const songs = JSON.parse(localStorage.getItem("songs")) || [];
  //         songs.push(newSong);
  //         localStorage.setItem("songs", JSON.stringify(songs));

  //         window.location.href = "/artist/songs";
  //       };
  //       reader.readAsDataURL(songCover);
  //     });
}
