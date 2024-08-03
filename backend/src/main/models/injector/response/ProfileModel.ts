export default interface ProfileModel {
    accessToken: String;
    clientToken: String;
    selectedProfile: ProfilePlayer;
    availableProfiles: ProfilePlayer[];
    user? : UserInfo;
}

export interface ProfilePlayer {
    id: string;
    name: string;
}

export interface UserInfo {
    id: string;
    name: string;
    properties: PropertiesModel[];
}

export interface PropertiesModel {
    name: string;
    value: string;
}