



export interface ISignupForm {
    "name": string
    "email": string,
    "password":string,
    "rePassword":string,
    "dateOfBirth":string,
    "gender":string
}

export interface ISigninForm{
    "email": string,
    "password":string
}

export interface IChangePasswordForm {
    "password":string,
    "newPassword":string
}

export interface IUploadPhotoForm{
    "photo": object
}

export interface ICreateUpdatePostForm{
    "body": string,
    "image": object
}

export interface ICreateCommentForm{
    "content":string,
    "post": string,
}

export interface IUpdateCommentForm{
    "content":string,
}

export interface IFilter{
    "limit": number,
    "page": number
}

interface IPaginationInfo{
    "currentPage": number,
    "numberOfPages": number,
    "limit": number,
    "nextPage"?: number,
    "total": number
}

interface IUserPost{
    "_id": string,
    "name": string,
    "photo": string
}

export interface IPost{
    "_id": string,
    "body": string,
    "image": string,
    "user": IUserPost,
    "createdAt": string,
    "comments": string[],
    "id": string
}

export interface IComment {
    "_id": string,
    "content": string,
    "commentCreator": IUserPost,
    "post": string,
    "createdAt": string,
    "id"?:string
}

export interface IUserDataResponse{
    "message": string,
    "user": {
        "_id": string,
        "name": string,
        "email": string,
        "dateOfBirth": string,
        "gender": string,
        "photo": string,
        "createdAt": string,
        "passwordChangedAt": string
    }
}

export interface ISignupResponse{
    "message":string
}

export interface ISigninResponse{
    "message":string,
    "token":string
}

export interface IChangePasswordResponse extends ISigninResponse{}

export interface IPostResponse{
    "message":string
}

export interface ICreateCommentResponse{
    "message":string,
    "comments":IComment[]
}

export interface IGetPostCommentsResponse extends ICreateCommentResponse{
    "total":number
}

export interface IUpdateCommentResponse{
    "message":string,
    "comment":IComment
}

export interface IUserPostsResponse{
    "message": string,
    "paginationInfo": IPaginationInfo,
    "posts": IPost[]
}

export interface ISpecificUserPostResponse{
    "_id": string,
    "body": string,
    "image": string,
    "createdAt":string,
    "id":string,
    "user":IUserPost,
    "comments":IComment[]
}

export interface IAllUsersPostsResponse{
    "message": string,
    "paginationInfo": IPaginationInfo,
    "posts": IPost[]
}

export interface ISinglePostResponse{
    "message":string,
    "post"?: IPost
}

export interface IUpdateDeletePostResponse{
    "message": string,
    "post": {
        "_id": string,
        "body": string,
        "user": string,
        "createdAt": string,
        "image": string,
        "id": string
    }
}