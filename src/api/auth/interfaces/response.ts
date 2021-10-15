export interface IResLogin {
    message: string,
    accessToken: string,
    statusCode:number|null
}

export interface IResProfile {
    id: number
    name: string
    birthDay: null | string
    avatarUrl: null | string
    gender: null | 'MALE' | 'FEMALE'
    user: {
        id: number,
        email: string,
        phoneNumber: string,
        role: string,
        state: string,
        isSeller: boolean
    }
    enablePassport: boolean
    shopId: null | number
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
