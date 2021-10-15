import {IResContact, IResProfile} from "../../auth/interfaces/response";
import {IMetadata} from "../../index";

export interface IResAccount {
    profile: IResProfile,
    contacts: IResContact[]
}

export interface IBenefit {
    id: number
    name: string
    type: 'STANDARD' | 'SILVER' | 'GOLD' | 'PLATINUM' | 'DIAMOND'
    benefits: {
        image: string
        title: string
    }[]
}

export interface IResCheckIn {
    benefits: IBenefit[]
    continuousCheckIn: {
        day: number
        exp: number
        point: number
        status: boolean
    }[]
    currentCheckIn: {
        exp: number
        nextTime: number
        point: number
        status: boolean
    }
    ranking: {
        currentRankingExp: number
        currentRankingPoint: number
        nextRankingExp: number
        rankingName: string
        type: 'STANDARD' | 'SILVER' | 'GOLD' | 'PLATINUM' | 'DIAMOND'
    }
}

export interface IResLoyalty {
    logs: {
        content: string
        createdAt: string
        exp: number
        point: number
    }[],
    metadata: IMetadata
}

