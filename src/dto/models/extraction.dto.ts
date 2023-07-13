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

    constructor(
        title: string,
        year: string,
        authors: string,
        abstract: string
    ) {
        this.title = title
        this.year = year
        this.authors = authors
        this.abstract = abstract
    }
}


