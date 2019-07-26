import { Injectable } from '@nestjs/common';

@Injectable()
export class Messages {
    public static readonly itemNotAvailable = "Item is not available.";
    public static readonly itemNotFound = "Item is not found.";
    public static readonly itemDoesNotExists = "Item doesn´t exist.";
    public static readonly UserNotFound = "User is not found.";

}