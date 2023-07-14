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
}


