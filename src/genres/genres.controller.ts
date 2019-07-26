import { Controller, Get, Param, Post, Body, Query, Delete } from '@nestjs/common';
import { GenresService } from './genres.service';
import { CreateGenreDto, BulkCreateGenreDto } from './dto/genre.dto';

@Controller('genres')
export class GenresController {
    constructor(private genresService:GenresService) { }

    @Get()
    async getGenres() {
        const genres = await this.genresService.getGenres();
        return genres;
    }

    @Get(':genreID')
    async getGenre(@Param('genreID') genreID) {
        const genre = await this.genresService.getGenre(genreID);
        return genre;
    }

    @Post()
    async createGenre(@Body() createGenreDto: CreateGenreDto) {
        const genres = await this.genresService.createGenre(createGenreDto);
        return genres;
    }

    @Post('/bulk')
    async createGenreBulk(@Body() bulkCreateGenreDto: BulkCreateGenreDto) {
        const genres = await this.genresService.createGenres(bulkCreateGenreDto);
        return genres;
    }

    @Delete(':genreID')
    async deleteGenre(@Param('genreID') genreID) {
        const genres = await this.genresService.deleteGenre(genreID);
        return genres;
    }
}
