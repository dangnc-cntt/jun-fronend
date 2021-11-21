export interface IReqUpdateProfile {
    birthDay: string,
    gender: "FEMALE" | "MALE",
    avatarUrl: string,
    name: string,
    enablePassport: boolean
}

export interface IReqChangePass {
    oldPassword: string,
    username: any,
    newPassword: string,
    confirmedPassword: string
}
