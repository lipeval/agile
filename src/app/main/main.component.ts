import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/shared/data.service';
import { Pictures, ResponseData, ImageData } from '../shared/response-data'

import {MatDialog, MatDialogConfig} from "@angular/material";
import { DialogComponent } from '../shared/dialog/dialog/dialog.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  pictures: Pictures[];
  imageData;
  config;

  constructor(private dataService: DataService, private dialog: MatDialog) { }

  ngOnInit() {
    this.getImages();
  }

  // Return all images
  getImages() {
    this.dataService.fetchData()
      .subscribe((data: ResponseData) => {
        console.log(data)
        this.pictures = data.pictures;
    
      })
  }

  // Get the images by ID
  getImageInfo(id) {
    this.dataService.getImageId(id)
      .subscribe((data: ImageData) => {
        this.imageData = data;
        this.openDialog(data);
      });
      

  }


  // Handle the MAT Dialog and send data to the dialog
  openDialog(data: ImageData) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      author: data.author,
      camera: data.camera,
      photo: data.full_picture,
      tags: data.tags
    }

    this.dialog.open(DialogComponent, dialogConfig);
}

 // Handle the pagination with NGX pagination module
  pageChanged(event){
    this.config.currentPage = event;
  }
}
