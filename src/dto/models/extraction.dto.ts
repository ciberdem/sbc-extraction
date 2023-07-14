import { ApiProperty } from "@nestjs/swagger";

export class ExtractionDTO {
    @ApiProperty()
    title: string;

    @ApiProperty()
    year: string;

    @ApiProperty()
    authors: string;

    @ApiProperty()
    abstract: string;

    @ApiProperty()
    url: string;

    @ApiProperty()
    DOI: string;

    @ApiProperty()
    PDF: string;

    @ApiProperty()
    type: string;
    
    @ApiProperty()
    publicated: string;

    constructor(
        title: string,
        year: string,
        authors: string,
        abstract: string,
        url: string,
        DOI: string,
        PDF: string,
        type: string,
        publicated: string,
    ) {
        this.title = title
        this.year = year
        this.authors = authors
        this.abstract = abstract
        this.url = url
        this.DOI = DOI
        this.PDF = PDF
        this.type = type
        this.publicated = publicated

    }
}


