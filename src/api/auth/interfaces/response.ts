export interface IResLogin {
    message: string,
    accessToken: string,
    refreshToken: string,
    statusCode:number|null
}

export interface IResProfile {
    id: number
    fullName: string
    birthDay: null | string
    avatarUrl: null | string
    email: string,
    referralId: any,
    phoneNumber: any,
    gender: null | 'MALE' | 'FEMALE'
    username: string,
    address: string
}

export interface IResContact {
    id: number,
    name: string,
    phoneNumber: string,
    isDefault: boolean,
    address: {
        detailAddress: string,
        ward: {
            id: number,
            wardName: string
        },
        district: {
            id: number,
            districtName: string
        },
        province: {
            id: number,
            provinceName: string
        }
    }
}
