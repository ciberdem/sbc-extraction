import { ApiProperty } from "@nestjs/swagger";

export class LinksDTO {
    @ApiProperty()
    links: string[];
}