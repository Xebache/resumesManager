import { Transform, Type } from "class-transformer";
import * as moment from "moment";
import { Moment } from "moment";
import 'reflect-metadata';


export enum Role {
    User = 0,
    Manager = 1,
    Admin = 2
  }


export class User {

    pseudo?: string;
    email?: string;
    firstname?: string;
    lastname?: string;
    @Type(() => Date)
    @Transform(({ value }) => value ? moment(value) : value, { toClassOnly: true })
    birthdate?: Moment;
    featuredImage?: string
    role: Role = Role.User;
    token?:string;

    public get roleToString(): string {
        return Role[this.role];
    }

    public get birthdateFormated(): string | undefined {
        return this.birthdate?.format('MMM 7 YYYY')
    }

}