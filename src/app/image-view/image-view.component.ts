import { Component } from '@angular/core';
import { ImageService } from '../services/image.service';
import { ActivatedRoute } from '@angular/router';
import { ImageRouterService } from '../services/image-router.service';


@Component({
  selector: 'app-image-view',
  templateUrl: './image-view.component.html',
  styleUrls: ['./image-view.component.css']
})
export class ImageViewComponent {

  image: any;
  constructor(private activatedRoute: ActivatedRoute, private imageService: ImageService, private imageRouter: ImageRouterService) { 
  }

  ngOnInit(): void {
    // code to read value of route parameter `id` and use it to fetch the corresponding image
    this.activatedRoute.paramMap.subscribe(data=>{
      let id = data.get('id')??0;
      this.imageService.getImage(+id).subscribe(data=>{
        this.image = data;
      });
    });
  }

  delete() {
    this.imageService.deleteImage(this.image.id).subscribe(data=>{
      // code to navigate to home
      this.imageRouter.navigateToHome();
    });
  }
}
