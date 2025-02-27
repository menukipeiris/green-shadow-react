export class CropModel {
    commonName: string;
    scientificName: string;
    cropImage: File| null;
    category: string;
    season: string;
    fieldName: string;

    constructor(commonName: string, scientificName: string, cropImage: File| null, category: string, season: string, fieldName: string ) {
        this.commonName = commonName;
        this.scientificName = scientificName;
        this.cropImage = cropImage;
        this.category = category;
        this.season = season;
        this.fieldName = fieldName;
    }

}