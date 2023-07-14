import { ApiProperty } from "@nestjs/swagger";

export class FormDTO {
    @ApiProperty()
    searchWord: string;

    @ApiProperty()
    archives?: string[] | string;

    @ApiProperty()
    initialDate?: string;

    @ApiProperty()
    finalDate?: string;
}


