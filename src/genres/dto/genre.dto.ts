import { ApiModelProperty } from '@nestjs/swagger';
import { ObjectID } from "mongodb";

export class CreateGenreDto {

    @ApiModelProperty()
    readonly title: string;
}

export class  BulkCreateGenreDto{

    @ApiModelProperty()
    readonly genres: CreateGenreDto[];
}

export class ListeGenreDto {

    @ApiModelProperty()
    readonly id: string;
    
    @ApiModelProperty()
    readonly title: string;
}


