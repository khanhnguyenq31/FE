import { Component } from '@angular/core';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-manage-song',
  standalone: true,
  imports: [NgIf , FormsModule],
  templateUrl: './manage-song.component.html',
  styleUrl: './manage-song.component.css'
})
export class ManageSongComponent {
  hiddenFlag = true;
  iddenFlag = true;
  
  // open the notification
  open() {
    this.hiddenFlag = false;
  }
  
  // close the notification
  close() {
    this.hiddenFlag = true;
  }

  hiddenSongDetail = true; // Hide song detail modal by default
  hiddenRejectModal = true; // Hide reject modal by default

  // Rejection reason
  rejectReason: string = '';

  // Open reject modal
  openRejectModal() {
    this.hiddenRejectModal = false;
    this.hiddenSongDetail = true; // Hide song detail modal
  }

  // Close reject modal
  closeRejectModal() {
    this.hiddenRejectModal = true;
  }

  // Submit rejection reason
  submitRejection() {
    console.log('Rejection Reason:', this.rejectReason);
    this.hiddenRejectModal = true;
    this.rejectReason = ''; // Clear input after submission
  }
}
