import { ObjectID } from 'mongodb';
import { Injectable, HttpException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Genre } from './interfaces/genre.interface';
import { CreateGenreDto } from './dto/genre.dto';
import { BulkCreateGenreDto } from './dto/genre.dto';
import { Messages } from '../common/messages'

@Injectable()
export class GenresService {
    constructor(@InjectModel('Genre') private readonly genreModel: Model<Genre>) { }

    async createGenre(creategenreDto: CreateGenreDto): Promise<Genre> {

        const isAvailable = this.genreModel.findOne({ title: creategenreDto.title });
        if (!isAvailable) {
            const genreCreated = new this.genreModel(creategenreDto);
            genreCreated.save();
        } 

        return;
    }

    async createGenres(bulkCreateGenreDto: BulkCreateGenreDto): Promise<BulkCreateGenreDto> {

        if (bulkCreateGenreDto.genres) {
            bulkCreateGenreDto.genres.forEach(element => {
                const isAvailable = this.genreModel.findOne({ title: element.title });
                if (!isAvailable) {
                    const genreCreated = new this.genreModel(element);
                    genreCreated.save();
                }
            });
        }

        return;
    }

    async getGenres(): Promise<Genre[]> {
        return await this.genreModel.find().exec();
    }

    async getGenre(genreId: ObjectID): Promise<Genre> {
        var genre = await this.genreModel.findById(genreId).exec();
        if (!genre) {
            throw new HttpException(Messages.itemDoesNotExists, 404);
        }
        return genre;
    }

    async deleteGenre(genreId: ObjectID): Promise<Genre> {
        return await this.genreModel.findByIdAndDelete(genreId).exec();
    }
}
