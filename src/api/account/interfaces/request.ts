export interface IReqUpdateProfile {
    birthDay: string,
    gender: "FEMALE" | "MALE",
    avatarUrl: string,
    name: string,
    enablePassport: boolean
}

export interface IReqChangePass {
    oldPassword: string,
    username: string,
    newPassword: string,
    confirmPassword: string,
    code: string
}
