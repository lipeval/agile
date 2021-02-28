export interface ResponseData {
    hasMore: boolean,
    page: number,
    pageCount: number,
    pictures: Pictures[]
}

export interface Pictures {
    cropped_picture: string,
    id: string
}


export interface ImageData {
    author: string,
    camera: string,
    cropped_picture: string,
    full_picture: string,
    id: string,
    tags: string
}