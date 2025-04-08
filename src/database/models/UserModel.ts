import {Document, model, ObjectId, Schema} from "mongoose";


export enum Regions {
    NAE = "NAE",
    NAW = "NAW",
    EUE = "EUE",
    EUW = "EUW",
    APAC = "APAC",
}

export interface UserInt extends Document {
    id: string
    name: string;
    stats: ObjectId[];
    banUntil: number;
    lastBan: number;
    banCounterAbandon: number;
    banCounterFail: number;
    steamId: string;
    dmMatch: boolean;
    dmQueue: boolean;
    dmAuto: boolean;
    lastReductionAbandon: number;
    gamesPlayedSinceReductionAbandon: number;
    lastReductionFail: number;
    gamesPlayedSinceReductionFail: number;
    requeue: boolean;
    frozen: boolean;
    region: Regions;
    muteUntil: number;
    lates: number;
    lateTimes: number[];
    referee: boolean;
    gamesPlayedSinceLates: number;
}

export const UserSchema = new Schema({
    id: String,
    name: String,
    stats: [Schema.Types.ObjectId],
    banUntil: Number,
    lastBan: Number,
    banCounterAbandon: Number,
    banCounterFail: Number,
    steamId: String,
    dmMatch: Boolean,
    dmQueue: Boolean,
    dmAuto: Boolean,
    gamesPlayedSinceReduction: Number,
    lastReductionAbandon: Number,
    gamesPlayedSinceReductionAbandon: Number,
    lastReductionFail: Number,
    gamesPlayedSinceReductionFail: Number,
    requeue: Boolean,
    frozen: Boolean,
    region: {
        type: String,
        enum: ["NAE", "NAW", "EUE", "EUW", "APAC"]
    },
    muteUntil: Number,
    lates: Number,
    lateTimes: [Number],
    referee: Boolean,
    gamesPlayedSinceLates: Number,
})

export default model<UserInt>('users', UserSchema)
