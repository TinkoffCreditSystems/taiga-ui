export interface Schema {
    readonly project: string;
    readonly addons: ReadonlyArray<string>;
    readonly addNotificationsModule: boolean;
    readonly addDialogsModule: boolean;
    readonly addSanitizer: boolean;
}
