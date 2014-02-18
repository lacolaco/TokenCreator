module Model {

    export class OAuthSession {
        SessionToken: number;
        AuthorizeUri: string;
    }

    export class Token {
        AccessToken: string;
        AccessSecret: string;
    }
} 