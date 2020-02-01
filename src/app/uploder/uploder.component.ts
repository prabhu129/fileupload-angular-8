import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpEventType, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-uploder',
  templateUrl: './uploder.component.html',
  styleUrls: ['./uploder.component.css']
})
export class UploderComponent implements OnInit {

  ngOnInit() {
  }
  isHovering: boolean;
  constructor(
    private http: HttpClient,
    ) { }
  array=[];
  public percentDone: number;
  uploadSuccess: boolean;


  fileInfo=[];
  filess=[];
  formatBytes(bytes: number): string {
    const UNITS = ['Bytes', 'kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const factor = 1024;
    let index = 0;

    while (bytes >= factor) {
      bytes /= factor;
      index++;
    }

    return `${parseFloat(bytes.toFixed(2))} ${UNITS[index]}`;
  }
  onFileSelect(input: any): void { 
    console.log(input);
    let arrays = input;
            if(arrays.length==1){
                  this.fileInfo.push( `${arrays[0].name} (${this.formatBytes(arrays[0].size)}), `);
                  this.filess.push(arrays[0]); 
            }
       else{
        for (let i = 0; i < arrays.length; i++) {
                this.filess.push(arrays[i]); 
                this.fileInfo.push(`${arrays[i].name}-(${this.formatBytes(arrays[i].size)}), `);
                console.log(this.filess);
              }
            }
    }

  onFiledrop(input:any):void{
    this.array=[];
    this.array = input;
     if(this.array.length==1){

    this.fileInfo.push(`${this.array[0].name} (${this.formatBytes(this.array[0].size)}), `);
    this.filess.push(this.array[0]); 

     }
     else{
      for (let i of this.array) {
      const file =i;
         this.filess.push(file); 

         this.fileInfo.push(`${file.name}-(${this.formatBytes(file.size)}), `);
     console.log(this.filess);
  }
     }
  }

  


  toggleHover(event: boolean) {
       this.isHovering = event;
     }

     Submit(){
       if(this.filess.length != 0){       
            console.log(this.filess);
            this.uploadAndProgress(this.filess);
        }else{
          alert('Upload File is Empty!!!')
          return false;
        }
    }
 uploadAndProgress(files: File[]){
    console.log(files);
    var formData = new FormData();
    Array.from(files).forEach(f => formData.append('file',f))
    
    this.http.post('https://file.io', formData, {reportProgress: true, observe: 'events'})
      .subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.percentDone = Math.round(100 * event.loaded / event.total);
        } else if (event instanceof HttpResponse) {
          this.uploadSuccess = true;
        }
    });
  }
    
}
