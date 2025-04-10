import * as dotenv from 'dotenv';
import messages from "./messages.json";
dotenv.config();


export default {
    // Sensitive
    BotToken: process.env.BOT_TOKEN ?? '',
    DB_URI: process.env.DB_URI ?? '',
    ClientID: process.env.CLIENT_ID ?? '',
    ServerKey: process.env.SERVER_KEY ?? 'no-key',
    // Discord stuff
    GuildID: '1203198852195418172',
    Parl: '484100069688344606',
    LogChannel: '1359213210447908874',
    MasterGuild: '1204816540231401472',
    MatchCategory: '1203198854334382080',
    ModRole: '1203198852241297453',
    AdminRole: '1203198852241297455',
    OwnerRole: '1203372772181549086',
    GeneralChannel: '1203198854804283443',
    SNDChannel: '1203198854334382088',
    PingToPlayRole: '1203198852195418180',
    SNDScoreChannel: '1203198854334382085',
    SNDReadyChannel: '1203198854334382087',
    Player: '1203198852195418181',
    WinEmoji: '<:Win:1174459375943946261>',
    LossEmoji: '<:Loss:1174459377709764800>',
    DrawEmoji: '<:Draw:1174459379114848336>',
    ActiveGamesChannel: "1359197136775807166",
    LeaderboardMessage: "1359213685121220739",
    LeaderboardChannel: "1294347495983415327",
    GameLogChannel: "1359197477844029731",
    QueueLogChannel: "1359197564259401819",
    ModeratorLogChannel: "1359197640990134543",
    RefereeLogChannel: "1359197708300193862",
    LeadModRole: "1203198852241297455",
    RegionRoles: {
        NAE: "1203198852195418179",
        NAW: "1203198852195418178",
        EUE: "1203198852195418177",
        EUW: "1203198852195418176",
        APAC: "1203198852195418175",
    },
    RegionRoleArray: ["1203198852195418179", "1203198852195418178", "1203198852195418177", "1203198852195418176", "1203198852195418175"],
    RegionSelect: "1203198853881532514",
    DoNotPing: "1203198852224655380",
    ScoreboardChannel: "1203198854334382086",
    MutedRole: "1203198852224655382",
    Mods: ['1203372772181549086', '1203198852241297455', '1203198852241297453'],
    MapTesterRole: "1359198474322837706",
    MapMakerRole: "1359198506275045396",
    MapTestAnnouncementChannel: "1359198609211658340",
    PlaytestLogChannel: "1359198677209583879",
    ManualRoleLogChannel: "1359198748961538229",
    // constants
    ApplyLates: true,
    ApplyNewLates: true,
    StartingMMR: 1300,
    PlayerCount: 10,
    ScoreLimitSND: 10,
    VoteTime: 30,
    VoteSize: 7,
    AbandonTime: 30,
    ReductionGames: 10,
    PingToPlayTime: 90 * 60,
    Ranks: [
        {name: 'Grandmaster', threshold: 2300, roleId: '1203198852241297450'},
        {name: 'Master', threshold: 1950, roleId: '1294132172533403690'},
        {name: 'Diamond', threshold: 1821, roleId: '1203198852241297449'},
        {name: 'Platinum', threshold: 1701, roleId: '1203198852241297448'},
        {name: 'Gold', threshold: 1611, roleId: '1203198852224655389'},
        {name: 'Silver', threshold: 1551, roleId: '1203198852224655388'},
        {name: 'Bronze', threshold: 1470, roleId: '1203198852224655387'},
        {name: 'Iron', threshold: 1375, roleId: '1203198852224655386'},
        {name: 'Copper', threshold: 1300, roleId: '1203198852224655385'},
        {name: 'Wood', threshold: -99999, roleId: '1203198852224655384'}],
    RankRoles: ['1203198852241297450', '1294132172533403690', '1203198852241297449', '1203198852241297448', '1203198852224655389',
    '1203198852224655388', '1203198852224655387', '1203198852224655386', '1203198852224655385', '1203198852224655384'],
    RankedRole: '1229821264823189588',
    // messages
    AcceptMessage: messages.acceptMessage,
    SignUpMessage: messages.signUp,
    InfoMessage: messages.info,
    RegionSelectMessage: messages.region,
    NoMessage: messages.no,
    // servers
    Servers: [],
}
