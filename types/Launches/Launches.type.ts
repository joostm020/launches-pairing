export interface Fairings {
    reused: boolean;
    recovery_attempt: boolean;
    recovered: boolean;
    ships: string[];
}

export interface Patch {
    small: string | null;
    large: string | null;
}

export interface Reddit {
    campaign: string | null;
    launch: string | null;
    media: string | null;
    recovery: string | null;
}

export interface Flickr {
    small: string[];
    original: string[];
}

export interface Links {
    patch: Patch;
    reddit: Reddit;
    flickr: Flickr;
    presskit: string | null;
    webcast: string | null;
    youtube_id: string | null;
    article: string | null;
    wikipedia: string | null;
}

export interface Failure {
    time: number;
    altitude: number | null;
    reason: string;
}

export interface Crew {
    crew: string;
    role: string;
}

export interface Core {
    core: string | null;
    flight?: number | null;
    gridfins?: boolean | null;
    legs?: boolean | null;
    reused?: boolean | null;
    landing_attempt?: boolean | null;
    landing_success?: boolean | null;
    landing_type: string | null;
    landpad: string | null;
}

enum DatePrecision {
    Hour = "hour",
    Day = "day",
    Month = "month"
}

export interface Launch {
    fairings: Fairings | null;
    links: Links;
    static_fire_date_utc: Date | null;
    static_fire_date_unix: number | null;
    net: boolean;
    window: number | null;
    rocket: string;
    success: boolean | null;
    failures: Failure[] | null;
    details: string | null;
    crew: Crew[];
    ships: string[];
    capsules: string[];
    payloads: string[];
    launchpad: string;
    flight_number: number;
    name: string;
    date_utc: string;
    date_unix: number;
    date_local: string;
    date_precision: DatePrecision;
    upcoming: boolean;
    cores: Core[];
    auto_update: boolean;
    tbd: boolean;
    launch_library_id: string | null;
    id: string;
}

export type LaunchType = Launch;
export type LaunchesType = Launch[];
