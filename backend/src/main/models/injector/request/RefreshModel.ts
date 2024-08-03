export default interface RefreshModel {
    accessToken: string;
    clientToken: string;
    selectedProfile: SelectedProfile;
    requestUser: boolean;
}

interface SelectedProfile {
    id: string;
    name: number;
}