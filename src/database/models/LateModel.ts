import {model, Schema, Document} from "mongoose";


export interface LateInt extends Document {
    user: string;
    steamId: string;
    joinTime: number;
    channelGenTime: number;
    matchId: number;
}

export const LateSchema = new Schema({
    user: String,
    steamId: String,
    joinTime: Number,
    channelGenTime: Number,
    matchId: Number,
});

export default model<LateInt>('lates', LateSchema);
