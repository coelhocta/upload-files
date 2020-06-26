import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

import { UploadService } from '../upload.service';
import { FileUploader, FileLikeObject } from 'ng2-file-upload';
import { concat } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  DJANGO_SERVER = 'http://127.0.0.1:8000';
  form: FormGroup;
  response;
  imageURL;
  public uploader: FileUploader = new FileUploader({});
  public hasBaseDropZoneOver = false;

  constructor(private formBuilder: FormBuilder, private uploadService: UploadService) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      profile: ['']
    });
  }

  onChange(event) {
      if (event.target.files.length > 0) {
        const file = event.target.files[0];
        this.form.get('profile').setValue(file);
      }
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('file', this.form.get('profile').value);

    this.uploadService.upload(formData).subscribe(
      (res) => {
        this.response = res;
        this.imageURL = `${this.DJANGO_SERVER}${res.file}`;
        console.log(res);
        console.log(this.imageURL);
      },
      (err) => {
        console.log(err);
      }
    );

  }

  fileOverBase(event): void {
      this.hasBaseDropZoneOver  =  event;
  }

  getFiles(): FileLikeObject[] {
    return this.uploader.queue.map((fileItem) => {
      return fileItem.file;
    });
  }

  upload() {
      const files = this.getFiles();
      console.log(files);
      const requests = [];
      files.forEach((file) => {
        const formData = new FormData();
        formData.append('file' , file.rawFile, file.name);
        requests.push(this.uploadService.upload(formData));
      });

      concat(...requests).subscribe(
        (res) => {
          console.log(res);
        },
        (err) => {
          console.log(err);
        }
      );
    }

}
