export interface EwmsUser {    
    
    USER_ID:string,
    STATUS:string,
    FIRSTNAME:string,
    LASTNAME:string,
    COD_USER:string,


    UserNoPhotos:string,
    UserNoAlbums:string,
    UserName:string,
    UserUsername:string,
    UserEmail:string,


    UserAlbums:  Array<albumsJSONVM>,
    UserPhotos:  Array<photosJSONVM>,


}

export interface  photosJSONVM{

    albumId:string,
    id:string, 
    title:string, 
    thumbnailUrl:string,
 }

 export interface fotosJSONVM{

    albumId:string,
    id:string,
    title:string,
    thumbnailUrl:string,
 }

export interface  albumsJSONVM{

   userId:string,
   id:string, 
   title:string, 
}






