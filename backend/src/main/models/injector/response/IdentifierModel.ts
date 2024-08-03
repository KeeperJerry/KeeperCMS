export default interface IdentifierModel {
    id : string;
    name : string;
    properties : ValueModel[];
}

export interface ValueModel {
    name : string;
    value : string;
    signature? : string;
}